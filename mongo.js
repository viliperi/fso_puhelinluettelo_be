const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as an argument')
    process.exit(1)
} else if (process.argv.length > 5) {
    console.log('too many arguments were given')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.vxwco.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    phone_number: String,
}, {"collection": "persons"})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 3) {
    console.log(process.argv[2])
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person_info => {
            console.log(`${person_info.name} ${person_info.phone_number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
    const name = process.argv[3] 
    const number = process.argv[4]
    const person = new Person({
        name: name,
        phone_number: number.toString()
    })

    person.save().then(response => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
