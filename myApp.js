require('dotenv').config();
const mongoose = require('mongoose');
const {Schema,model}=require('mongoose');


async function connect(strHost){
  console.log(strHost);
  const dbmongo= await  mongoose.connect(strHost,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
  })
  .then(db=>console.log("Moongose se ha conectado :"))
  .catch(error=>console.log('Ha ocurrido un error en el momento de conectar a mongo db'));

  const db=mongoose.connection;

  db.once('open',_=>{
    console.log('conected: ',strHost);
  });

  db.on('error',(err)=>{
    throw(new error('Ha ocurrido un error'))
  })

}


async function close(){
return await   mongoose.connection.close()
.then("Moongoose se ha desconectado")
.catch((err)=>{
throw new error('Ha ocurrido un error mientras se cerraban las coneciones')
} );
}


connect(process.env.MONGO_URI);

const personSchema = new Schema({
  name : {
    type:String,
    required:true
  } ,
  age:Number,
  favoriteFoods:[String]

});

const Person =model('Person', personSchema);;




 const  createAndSavePerson = (done) => {
  const doc = new Person ({name:'yordanis',age:42,favoriteFoods:['cad1','cad2']});
     doc.save(()=>{
     done(null , doc);
      console.log(doc);
  });
  
};

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
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
