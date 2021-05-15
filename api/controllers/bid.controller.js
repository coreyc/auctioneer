const { bidService } = require('../services')

const { postBidToStream } = bidService

const postBid = async (req, res, next) => {
  const {bid} = req.body
  
  try {
    const posted = await postBidToStream(Number(bid))

    if (posted) res.sendStatus('201')
    else res.status('400').send('Bid must be greater than current bid')
    
    return
  } catch(err) {
    console.error(err)
    res.sendStatus(500) && next(err)

    return
  }
}

module.exports = {
  postBid
}
