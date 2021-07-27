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



/* data person jsom {name:'yordanis',age:42,favoriteFoods:['cad1','cad2']} */

var arrayOfPeople = [
  {name: "Pablo", age: 15, favoriteFoods: ["firsh"]},
  {name: "Luis", age: 28, favoriteFoods: ["cheese"]},
  {name: "Albert", age: 34, favoriteFoods: ["Bear"]}
];

 const  createAndSavePerson = async (dataPerson,done) => 
 {
      const doc = new Person (dataPerson);
      await doc.save().then((saveDoc)=>
      {
       if  (saveDoc===doc)
        {
          done(null,doc)
        }
        else
        {
          done(doc,doc);
          console.log("El documento no pudo ser salvado: ",doc)
        }
     })
      
  
};

const createManyPeople = async (arrayOfPeople, done) => {
  console.log("Array de dato: ",arrayOfPeople);
  arrayOfPeople.forEach(element => {
     createAndSavePerson(element,done);
  });
 
};
/*
createManyPeople(arrayOfPeople,(obj,doc)=>{
  if (!obj)
    console.log("Un error al salvar los datos: ",doc); 
 
});*/

const findPeopleByName = async (personName, done) => {
  return await Person.find({name:personName},(error,resp)=>{
    if (error)
    {
      console.log(error);
    }
    done(error,resp);
  })
  
};

const findOneByFood = async (food, done) => {
  return await Person.findOne({favoriteFoods:[food]},(error,resp)=>{
    if (error)
    {
      console.log(error);
    }
    done(error,resp);
  })
  
};

const findPersonById = async (personId, done) => {
  return await Person.findById(personId,(error,resp)=>{
    if (error)
    {
      console.log(error);
    }
    done(error,resp);
  })
  
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  const modelPersonId= await findPersonById(personId,done);
  modelPersonId.favoriteFoods.push(foodToAdd);
  
  await modelPersonId.save().then((saveDoc)=>
  {
   if  (saveDoc===modelPersonId)
    {
      done(null,modelPersonId)
    }
    else
    {
      done(modelPersonId,modelPersonId);
      console.log("El documento no pudo ser salvado: ",modelPersonId)
    }
 })

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
