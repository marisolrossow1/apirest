import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://melinaailenortiz:AppHibMel@dwt4ap.amqtl.mongodb.net/");
const db = client.db("DWT4AP-entrepisos");

/**
 * Recorre cada valor de las claves del
 * Objeto Vivienda y si tiene string vacío
 * lo pasa a 'Sin especificar'
 * @param {Object} vivienda 
 */
function validarCamposVacios(vivienda){
    for (let i in vivienda) {
        if (typeof vivienda[i] === 'string' && vivienda[i].trim() === '' && i !== '_id' && i !== 'flat_img') {
            vivienda[i] = 'Sin especificar';
        }
    }
}

/**
 * Valida Sections (checkboxs, Array)
 * en caso de string a una array de ese valor.
 * Y si no llega ningún valor de 
 * undefined a array vacío.
 * @param {Object} vivienda 
 */
function validarSections(vivienda){
    // Verifica si "section" es un string y lo convierte en array si es necesario (Sucede cuando es un valor).
    if (typeof vivienda.section === 'string') {
        vivienda.section = [vivienda.section];
    } else if(!vivienda.section){
        // En el caso de que no se mande nada en "section":
        vivienda.section = [];
    }
}

/**
 * Valida si llega un string vacío a 'Sin especificar),
 * y si es otro caso (número en string) lo parsea a int.
 * 
 * @param {Object} vivienda 
 */
function validarFlatRooms(vivienda){
    // Pasamos la respuesta de cantidad de ambientes de string a int.
    if(typeof vivienda.flat_rooms === 'string' && vivienda.flat_rooms.trim() === ''){
        vivienda.flat_rooms = 0;
    } else{
        vivienda.flat_rooms = parseInt(vivienda.flat_rooms);
    }
}


/**
 * Para obtener las viviendas del DB de MongoDB.
 * @param {*} filtros - Filtros para obtener las Viviendas filtradas.
 */
async function getViviendas(filtros = {}){
    const filterMongo = { 
        filtroEliminado: { $ne: true } 
    }

    // Filtro para cantidad de ambientes:
    if(filtros.cantidadAmbientesMayorQue !== undefined && filtros.cantidadAmbientesMenorQue !== undefined){
        filterMongo.$and = [
            { flat_rooms: { $gte: parseInt(filtros.cantidadAmbientesMayorQue) } },
            { flat_rooms: { $lte: parseInt(filtros.cantidadAmbientesMenorQue) } }
        ]
    } else if(filtros.cantidadAmbientesMayorQue !== undefined){
        filterMongo.flat_rooms = { $gte: parseInt(filtros.cantidadAmbientesMayorQue) }
    } else if(filtros.cantidadAmbientesMenorQue !== undefined){
        filterMongo.flat_rooms = { $lte: parseInt(filtros.cantidadAmbientesMenorQue) }
    }

    // Filtro por tipo de vivienda (PH o Departamento).
    if(filtros.type !== undefined){
        filterMongo.$text = { $search: filtros.type }
    }

    // Filtro por sección (terraza, garage, pileta, sum, ascensor, gimnasio):    
    if( filtros.section !== undefined ){
        filterMongo.section = { $eq: filtros.section }
    }


    // console.log(filtros)

    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    }

    return db.collection("viviendas").find(filterMongo).toArray();
}

/**
 * Obtiene la vivienda por id en la DB.
 * @param {string} id_ingresado 
 * @returns {object} - Vivienda obtenida por id.
 */
async function getViviendaId(id_ingresado){
    console.log("Id en getVivienda:", id_ingresado);
    
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    }

    return db.collection("viviendas").findOne({ _id: new ObjectId(id_ingresado)})
}

/**
 * Agrega una vivienda a la DB.
 * @param {*} vivienda 
 * @returns {object} - Vivienda agregada
 * @throws {error} - Tira error cuando trata de agregar la nueva vivienda a la db.
 */
async function addVivienda(vivienda){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    };
    
    validarSections(vivienda);

    validarFlatRooms(vivienda);

    validarCamposVacios(vivienda);

    try {
        await db.collection("viviendas").insertOne(vivienda);
    } catch (error) {
        console.log("Error al insertar la nueva vivienda: ", error);
        throw new error;
    }

    console.log(vivienda)

    return vivienda;
}

/**
 * Borra arbitrariamente la vivienda 
 * ingresada por ID en la DB.
 * @param {string} id_ingresado 
 * @returns {Object} Vivienda eliminada de DB.
 */
async function borrarVivienda(id_ingresado){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    };

    return await db.collection("viviendas").deleteOne({ _id: new ObjectId(id_ingresado)});
}

/**
 * Borra la vivienda obtenida por ID
 * lógicamente actualizando en la DB
 * con la propiedad {filtroEliminado: true},
 * con el operador $set.
 * @param {string} id 
 * @returns {object} Vivienda actualizada que está lógicamente eliminada.
 */
async function borrarViviendaLogica(id){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    };

    return db.collection("viviendas").updateOne(
        { _id: new ObjectId(id)}, 
        { $set: {filtroEliminado: true} }
    )
}

/**
 * Modifica la vivienda en DB reemplazando
 * el dato anterior ("método: PUT"). 
 * @param {string} id 
 * @param {Object} viviendaActualizada -  Reemplaza la vivienda, tal cual se envió el objeto, a la DB.
 * @returns 
 */
async function modificarVivienda(id, viviendaActualizada){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    };

    validarSections(viviendaActualizada);

    validarFlatRooms(viviendaActualizada);

    validarCamposVacios(viviendaActualizada);
    
    console.log(viviendaActualizada);
    
    return db.collection("viviendas").replaceOne({ _id: new ObjectId(id) }, viviendaActualizada);
}

/**
 * Actualiza la vivienda en DB ("método: PATCH").
 * @param {string} id 
 * @param {Object} viviendaActualizada - Actualiza datos anteriores, y también si hay datos nuevos.
 * @returns Vivienda actualizada.
 */
async function actualizarVivienda(id, viviendaActualizada){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    };

    console.log("Datos nuevos: ", viviendaActualizada);

    validarSections(viviendaActualizada);

    validarFlatRooms(viviendaActualizada);

    validarCamposVacios(viviendaActualizada);

    return db.collection("viviendas").updateOne({ _id: new ObjectId(id) }, { $set: viviendaActualizada })
}


export {
    getViviendas,
    getViviendaId,
    addVivienda,
    borrarVivienda,
    borrarViviendaLogica,
    modificarVivienda,
    actualizarVivienda,

}

export default{
    getViviendas,
    getViviendaId,
    addVivienda,
    borrarVivienda,
    borrarViviendaLogica,
    modificarVivienda,
    actualizarVivienda,
    
}