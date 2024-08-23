const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const passwordGenSalt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, passwordGenSalt);
    }
    next();
  });

module.exports = Users = mongoose.model("users", UserSchema)