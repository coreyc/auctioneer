const { exampleService } = require('../services')

const { createExample } = exampleService

/*
 * call other imported services, or same service but different functions here if you need to
*/
const postExample = async (req, res, next) => {
  const {user, content} = req.body
  try {
    await createExample(user, content)
    res.sendStatus(201)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

module.exports = {
  postExample
}
