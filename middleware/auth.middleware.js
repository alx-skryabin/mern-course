const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    // next() - request continuation function
    return next()
  }

  try {
    // get token from header
    const token = req.headers.authorization.split(' ')[1] // 'Bearer TOKEN'

    if (!token) {
      return res.status(401).json({message: 'The user is not logged in'})
    }

    req.user = jwt.verify(token, config.get('jwtSecret'))
    next()

  } catch (e) {
    res.status(401).json({message: 'The user is not logged in'})
  }
}
