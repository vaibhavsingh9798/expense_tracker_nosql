


// const {getDb} = require('../util/database')

// class DownloadFile{
//     constructor(url,userId){
//       this.url = url
//       this.userId = userId
//     }

//     async save(){
//         let db = getDb.db()
//         try{
//        let result = await db.collection('downloadfile').insertOne(this)
//        if(result)
//        return result
//     }catch(error){
//         throw error
//     }   
// }

// static async find(userId){
//     let db = getDb.db()
//     try{
//    let cursor = await db.collection('downloadfile').find({"userId":userId})
//    let documents
//    if(cursor)
//    documents = await cursor.toArray()
//   return documents
// }catch(error){
//     throw error
// }   
// }

// }



