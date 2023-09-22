const {MongoClient} = require('mongodb')
const uri = "mongodb+srv://singhvaibhav:SinghVaibhav@expensetracker.ojnr6fs.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
let _db;
let mongodbConnect = async (callback) =>{
  try{
    await client.connect();
    console.log('Connected to MongoDB');
    callback()
     
    // // Specify the database 
    _db = client.db('expenses')

  }catch(err){
    console.error('Error connecting to MongoDB:', err);
  }
}

let getDb = () => {
   if(_db){
     return _db
   }else{
    throw 'No database found'
   }
}

exports.mongodbConnect = mongodbConnect
exports.getDb = getDb 