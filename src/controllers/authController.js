const Users = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv')

dotenv.config();
const secretOrKey = process.env.JWT_ACCESS_TOKEN_SECRET_PRIVATE;

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          // user matched
          // create JWT payload
          const payload = {
            _id: user._id,
            email: user.email,
          };
          // sign token
          jwt.sign(
            payload,
            secretOrKey,
            (err, token) => {
              if (err) {
                console.error('Error signing token:', err);
                return res.status(500).json({ msg: 'Error signing token' });
              }
              res.status(200).json({
                success: true,
                data: { user, token: "Bearer " + token },
              });
            }
          );
        } else {
          return res.status(400).json({ msg: "Incorrect password entered." });
        }
      } else {
        // if user doesn't exist, create new User
        const newUser = new Users({
          email: email,
          password: password,
        });
        const savedUser = await newUser.save();
        res.status(200).json({ success: true, data: { user: savedUser } });
      }
    } catch (error) {
      console.error('Server error(Login):', error);
      res.status(500).json({ msg: "Server error(Login)", error: error.message });
    }
  };

module.exports = { login };
