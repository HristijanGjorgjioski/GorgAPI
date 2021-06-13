const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      profilePhoto: {
        type: String
      },
      personalInfo: {
          info: [
              {
                  age: Number,
                  gander: String,
                  job: String,
                  adress: String,
                  phoneNumber: Number
              }
          ]
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      resetToken: String,
      resetTokenExpiration: Date
})

module.exports = mongoose.model('User', userSchema)
