require('dotenv').config();
mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});


// Person Model
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let aPerson = new Person({
    name: "John",
    age: 25,
    favoriteFoods: ["pizza", "pasta", "sushi"]
  });
  aPerson.save(function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// Seeder
arrayOfPeople = new Person([{
  name: "William",
  age: 28,
  favoriteFoods: ["pizza", "pasta", "meet"],
},
{
  name: "James",
  age: 21,
  favoriteFoods: ["rize", "pasta", "sushi"],
}
]);

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  findPersonById(personId, (error, aPerson) => {
    if (error) return console.error(error);

    const foodToAdd = "hamburger";
    aPerson.favoriteFoods.push(foodToAdd);
    aPerson.save(function (err, data) {
      if (err) return done(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  findPeopleByName(personName, (err, data) => {
    if (err) return done(err);

    data[0].age = ageToSet;

    data[0].save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  });
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
