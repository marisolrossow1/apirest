import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017"); 

client.connect()
    .then( () => console.log("Me conecté!") )
    .catch( () => console.log("No me pude conectar :(") );

const db = client.db("DWT4AP-entrepisos");

async function consulta(){
    console.log("Consultando datos")

    const datos = await db.collection("viviendas").find().toArray()
    console.log(datos)
}

consulta()