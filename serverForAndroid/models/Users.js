import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://baraka5665:tJLuOxgP66gpNrrP@cluster0.mue6k.mongodb.net/travelApp?retryWrites=true&w=majority';

 async function postUsers(username,password,displayName,profilePic) {
    let answer=true;
    const client= new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        const db= client.db("whatsapp");
        const users=db.collection("users");
        let result = await users.findOne({username: username});
        if(result===null) {
            await users.insertOne({username : username, password : password, displayName : displayName, profilePic : profilePic  });
        } else {
            answer=false;
        }

    }
    finally{
        await client.close();    
        return answer;
    }
} 

 async function getUsers(id) {
    const client= new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    let result;
    try {
        const db= client.db("whatsapp");
        const users=db.collection("users");
         result = await users.findOne({"username": id});
    }
    finally{
        await client.close();  
        if(result===null) {
            return false;
        } else {
            return {"username" : result.username, "displayName" : result.displayName, "profilePic" : result.profilePic}; 
        }
    }
}


export default {
    postUsers,
    getUsers
}