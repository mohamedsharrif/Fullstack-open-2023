const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://khadarmohamed2710:${password}@cluster0.ymbzrz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)


const personsSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Persons = mongoose.model('Persons', personsSchema)



if (name && number){
  const persons = new Persons({
    name,
    number,
  })

  persons.save()
    .then(() => {
      console.log(`adedd ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    }).catch((err) => {
      console.error(err)
      mongoose.connection.close()
    })
}else{
  Persons.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((persons) => {
      console.log(`${persons.name} ${persons.number}`)
    })
    mongoose.connection.close()
  })
    .catch((err) => {
      console.error(err)
      mongoose.connection.close()
    })

}
