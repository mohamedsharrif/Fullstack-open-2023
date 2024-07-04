const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

if (!url) {
  console.error('MongoDB URI not set in environment variables.')
  process.exit(1)
}

console.log('connecting to', url);

(async () => {
  try {
    await mongoose.connect(url)
    console.log('connected to MongoDB')
  } catch (error) {
    console.error('error connecting to MongoDB:', error.message)
  }
})()

const phoneValidator = {
  validator: function (v) {
    return /\d{2,3}-\d{5,}/.test(v)
  },
  message: (props) => `${props.value} is not a valid phone number!`,
}

const personsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: phoneValidator,
  },
})

personsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Persons', personsSchema)
