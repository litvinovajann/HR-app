const express = require('express');
const router = express.Router();
const {login, current, register} = require(
  "../controllers/users"
)
router.post('/login', login)
router.post('/register', register)
router.get('/current', current)

module.exports = router;
