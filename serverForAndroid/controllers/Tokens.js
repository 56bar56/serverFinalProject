import loginModel from '../models/Tokens.js'
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://baraka5665:tJLuOxgP66gpNrrP@cluster0.mue6k.mongodb.net/travelApp?retryWrites=true&w=majority';

async function getToken(req,res) {
    if (req.headers.authorization) {
        const fireBaseToken = req.headers.authorization.split(" ")[1];
        const username=req.body.username;
        const client= new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            const db= client.db("whatsapp");
            const fireBaseCollection=db.collection("fireBase");
            let result = await fireBaseCollection.findOne({username: username});
            if(result===null) {
                await fireBaseCollection.insertOne({username : username,token: fireBaseToken});
            } else {
                await fireBaseCollection.updateOne({username : username},{$set:{token:fireBaseToken}})
            }
        } finally {
            await client.close();    
        }
    }
    const Token= await loginModel.getToken(req.body.username, req.body.password);
    if(Token==='Incorrect username and/or password') {
        res.status(404).send('Incorrect username and/or password');

    } else {
        res.status(200).send(Token);
    }    
}
export default getToken
