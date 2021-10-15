const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    // middleware check
    check('email', 'Incorrect email').isEmail(),
    check('password', 'The minimum password length is 6 characters')
      .isLength({min: 6}),
  ],
  async (req, res) => {
    try {
      // Validation of fields
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data during registration'
        })
      }

      const {email, password} = req.body

      // Checking whether the user exists
      const condidate = await User.findOne({email: email})

      if (condidate) {
        return res.status(400).json({message: 'Such a user already exists'})
      }

      // Password encryption
      const hashedPassword = await bcrypt.hash(password, 12)

      // Creating a new user
      const user = new User({email, password: hashedPassword})

      // Saving the user
      await user.save()

      res.status(201).json({message: 'User created'})
    } catch (e) {
      res.status(500).json({message: 'Registration error!!!'})
    }
  })

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter the correct email').normalizeEmail().isEmail(),
    check('password', 'Enter the password').exists()
  ],
  async (req, res) => {
    try {
      // Validation of fields
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data during authorization'
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({email: email})

      if (!user) {
        return res.status(400).json({message: 'User not found'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: 'Invalid password or login'})
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      res.json({
        token,
        userId: user.id
      })
    } catch (e) {
      res.status(500).json({message: 'Registration error!!!'})
    }
  })

module.exports = router
