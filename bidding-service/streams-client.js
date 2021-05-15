const redis = require('./redis')

const REDIS_ARRAY_POSITIONS = {
  streamRoot: 0,
  root: {
    streamName: 0,
    streamEvents: 1,
  },
  streamEvent: {
    eventId: 0,
    eventData: 1,
  },
}
const READ_GROUP_EVENT_ID = {
  FIRST_RUN: '0',
  NEW_ITEMS: '>',
}

const mapObjToStringArray = (obj) => {
  const arr = []

  for (const key in obj) {
    arr.push(key, obj[key])
  }

  return arr
}

const mapArrayToObject = (array) => {
  const arrayCopy = array.slice()
  const object = {}

  while (arrayCopy && arrayCopy.length) {
    const key = arrayCopy.shift()
    const value = arrayCopy.shift()
    object[key] = value
  }

  return object
}

const copyArray = (array) => array.slice()
const getRootStreamData = (streamData) => streamData[REDIS_ARRAY_POSITIONS.streamRoot]
const getStreamEvents = (rootStreamData) => rootStreamData[REDIS_ARRAY_POSITIONS.root.streamEvents]
const getEventId = (streamEvent) => streamEvent[REDIS_ARRAY_POSITIONS.streamEvent.eventId]
const getEventData = (streamEvent) => streamEvent[REDIS_ARRAY_POSITIONS.streamEvent.eventData]
const deserialize = (streamData) => {
  const streamDataCopy = copyArray(streamData)
  const rootStreamData = getRootStreamData(streamDataCopy)
  const streamEvents = getStreamEvents(rootStreamData)

  return streamEvents.map((streamEvent) => {
    const eventId = getEventId(streamEvent)

    const eventData = getEventData(streamEvent)
    const deserializedFromRedis = mapArrayToObject(eventData)

    return {
      id: eventId,
      ...deserializedFromRedis,
    }
  })
}

const isStreamCreatedButWithoutItems = (streamData) => {
  return streamData[
    REDIS_ARRAY_POSITIONS.streamRoot
  ][
    REDIS_ARRAY_POSITIONS.root.streamEvents
  ].length === 0
}

const isStreamEmpty = (streamData) => {
  if (!streamData || streamData.length === 0 || isStreamCreatedButWithoutItems(streamData)) {
    return true
  }
  return false
}

const ack = ({ streamName, groupName, id }) => {
  return redis.xack(streamName, groupName, id)
}

const add = ({ streamName, maxStreamLength, formattedData }) => {
  return redis.xadd(streamName, 'MAXLEN', '~', maxStreamLength || 1000, '*', formattedData)
}

const readFromConsumerGroup = ({
  groupName, consumerName, streamName, shouldBlock, blockTime = 2000, count = 10, id,
}) => {
  return shouldBlock
    ? redis.xreadgroup('GROUP', groupName, consumerName, 'BLOCK', blockTime, 'STREAMS', streamName, id)
    : redis.xreadgroup('GROUP', groupName, consumerName, 'COUNT', count, 'STREAMS', streamName, id)
}

const createConsumerGroup = (streamName, groupName) => {
  return redis.xgroup('CREATE', streamName, groupName, '$', 'MKSTREAM')
}

const publish = ({ streamName, maxStreamLength, eventPayload }) => {

  return add({
    streamName,
    maxStreamLength,
    formattedData: mapObjToStringArray(eventPayload),
  })
}

const subscribe = async ({
  groupName, streamName, readTimeout, workerFunction,
}) => {
  // make sure consumer group exists
  try {
    await createConsumerGroup(streamName, groupName)
  } catch (err) {
    // ignore
  }

  const run = async ({ lastId, checkBacklog }) => {
    let readId = lastId
    let backlog = checkBacklog

    let streamData

    if (!backlog) {
      readId = READ_GROUP_EVENT_ID.NEW_ITEMS
    }

    try {
      streamData = await readFromConsumerGroup({
        groupName,
        consumerName: 'test',
        streamName,
        shouldBlock: false,
        blockTime: readTimeout,
        id: readId,
      })
    } catch (e) {
      console.error(`readFromConsumerGroup error: ${e}`)
    }

    if (isStreamEmpty(streamData)) {
      backlog = false
    } else {
      const deserializedEvents = deserialize(streamData)

      for (const event of deserializedEvents) {
        try {
          const { id, ...data } = event

          workerFunction({ ...data })
          await ack({ streamName, groupName, id })
          readId = id
        } catch (e) {
          console.error(e)
        }
      }
    }

    setTimeout(run.bind(null,
      { lastId: readId, checkBacklog: backlog }),
      readTimeout)
  }

  run({ lastId: READ_GROUP_EVENT_ID.FIRST_RUN, checkBacklog: true })
}

module.exports = {
  publish,
  subscribe
}
