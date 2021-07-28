require('dotenv').config();
const mongoose = require('mongoose');
const {Schema,model}=require('mongoose');


async function connect(strHost){
  console.log(strHost);
  const dbmongo= await  mongoose.connect(strHost,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false
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





var arrayOfPeople = [
  {name: "Pablo", age: 15, favoriteFoods: ["firsh"]},
  {name: "Luis", age: 28, favoriteFoods: ["cheese"]},
  {name: "Albert", age: 34, favoriteFoods: ["Bear"]}
];

 const  createAndSavePerson = async (dataPerson,done) => 
 {
      let doc = new Person (dataPerson);
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
      return doc;
  
};

const createManyPeople = async (arrayOfPeople, done) => {
  console.log("Array de dato: ",arrayOfPeople);
  arrayOfPeople.forEach(element => {
     createAndSavePerson(element,done);
  });
 
};

const findPeopleByName = async (personName, done) => {
  let modelPerson=[];
  await Person.find({name:personName},(error,resp)=>{
      if (error)
      {
        console.log(error);
      }
      done(error,resp);
      modelPerson=resp;
      
  })
  
  return modelPerson;
  
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
   let person;
   await Person.findById(personId,(error,resp)=>{
    if (error)
    {
      console.log(error);
    }
    done(error,resp);
    person=resp;
  })
  return person;
};




const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  let personEdit;
  await findPersonById(personId,myDone)
          .then((person)=>{
              if (person)
              {
                if (person.favoriteFoods.every(food=>food!==foodToAdd))
                    person.favoriteFoods.push(foodToAdd);
                person.save()
                .then((saveDoc)=>
                  {
                    if  (saveDoc===person)
                    {
                      done(null,person)
                    }
                    else
                    {
                      done(doc,person);
                      console.log("El documento no pudo ser salvado: ",doc)
                    }
                  })                 
              }
            personEdit=person;    
          });
 
  return personEdit;
 

};


 

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  let personEdit;
  await Person.findOneAndUpdate({name:personName},{age:ageToSet},{ new: true },myDone)
          .then((person)=>{
              if (person)
              {
                done(null,person);
              } 
              personEdit=person; 
            })
          .catch((error)=>{
              done(error,person);
          });
 
  return personEdit;
};

const dataPerson = {name:'Mary',age:42,favoriteFoods:['burrito','cad2']} 


//findAndUpdate('yordanis',myDone).then(result=>console.log(result));


const removeById = async (personId, done) => {
  let personDel;
  await Person.findByIdAndRemove(personId,(error,data)=>{
    done(error,data);
    personDel=data;
  })
 
return personDel;
};




const removeManyPeople = async (done) => {
  const nameToRemove = "Mary";
  let dataRem;
  await Person.deleteMany({name:nameToRemove},(error,data)=>{
    done(error,data)
    dataRem=data;
  })

  return dataRem;
};



const queryChain = async (done) => {
  const foodToSearch = "burrito";

  await Person.find({favoriteFoods:'burrito'}).sort({"name":1}).limit(2).select('-age')
    .exec((error,data)=>{
          dataQuery=data;
          done(error,data);  
                
  

  })

};



const myDone=(obj,doc)=>{
  if (obj)
    console.log("Un error al salvar los datos: ",doc); 
 
}
createAndSavePerson(dataPerson,myDone)
        .then(result=>{
            console.log("Creado y salvado: ",result);
            queryChain((error,dataQuery)=>{
                console.log("Datos de la consulta: ",dataQuery);
                }).then(()=>{
                    removeManyPeople(myDone).then((result3)=>{
                    console.log("Deleted: ",result3);
            })
          })
 
        });


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
