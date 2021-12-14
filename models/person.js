const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')    
})
.catch(error => {
    console.log('Error connecting to MongoDB', error.message)
})

const phonebookSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, unique: true},
    number: {type: String, required: true, minlength: 8, unique: true},
}, {"collection": "persons"})

phonebookSchema.plugin(uniqueValidator)

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', phonebookSchema)