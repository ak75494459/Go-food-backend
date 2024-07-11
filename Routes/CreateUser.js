const express = require('express');
const { body, validationResult } = require('express-validator');
const bcypt = require('bcryptjs');
const router = express.Router();
const User = require('../dbs/User');



router.post("/signup",
body('email').isEmail().withMessage('Please enter a valid email address'),
body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
body('confirmPassword').custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Passwords do not match');
  }
  return true;
}),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcypt.genSalt(10);
    const safePass1 = await bcypt.hash(req.body.password, salt)
    const safePass2 = await bcypt.hash(req.body.confirmPassword,salt)
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: safePass1,
      confirmPassword: safePass2
    }).then(res.json({ success: true , safePass1 , safePass2  }))
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
},


)

module.exports = router;