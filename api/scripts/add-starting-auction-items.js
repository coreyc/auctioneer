const { setItem } = require('../db')
const auctionItems = require('../starting-auction-items')

for (const auctionItem of auctionItems) {
  await setItem(auctionItem)
}
