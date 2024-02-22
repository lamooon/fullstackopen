const mongoose = require('mongoose');

if (process.argv.length < 5) {
    process.exit(1);
}

const password = process.argv[2];

const url =
    `mongodb+srv://mooneverything26:${password}@fso-test-db.7o8ia3r.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
// })
//
// person.save().then(result => {
//     console.log(`added ${person.name} number ${person.number} to phonebook`);
//     mongoose.connection.close();
// })

Person.find({}).then(result => {
    result.forEach(p => {
        console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close();
})
