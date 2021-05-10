const redis = require('../redis')
const auctionItems = require('../starting-auction-items')

for (const auctionItem of auctionItems) {
  const {id, ...auctionItemData} = auctionItem
  await redis.call('JSON.SET', `item.${id}`, '.', JSON.stringify(auctionItemData))
}
