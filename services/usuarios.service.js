import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://melinaailenortiz:AppHibMel@dwt4ap.amqtl.mongodb.net/");
const db = client.db("DWT4AP-entrepisos");

/**
 * Recorre cada valor de las claves del
 * Objeto Usuario y si tiene string vacío
 * lo pasa a 'Sin especificar'
 * @param {Object} usuario 
 */
function validarCamposVacios(usuario){
    for (let i in usuario) {
        if (typeof usuario[i] === 'string' && usuario[i].trim() === '' && i !== '_id' && i !== 'picture') {
            usuario[i] = 'Sin especificar';
        }
    }
}

/**
 * Valida si llega un string vacío a 'Sin especificar),
 * y si es otro caso (número en string) lo parsea a int.
 * 
 * @param {Object} usuario 
 */
function validarAge(usuario){
    // Pasamos la respuesta de cantidad de ambientes de string a int.
    if(typeof usuario.age === 'string' && usuario.age.trim() === '' || !usuario.age){
        usuario.age = 0;
    } else{
        usuario.age = parseInt(usuario.age);
    }
}

/**
 * Obtiene todos los usuarios y los transforma en array.
 *  @param {*} filtros - Filtros para obtener las Viviendas filtradas.
 * @returns {Array} - Array de usuarios.
 */
 async function getUsuarios(filtros = {}){
    const filterMongo = { 
        eliminado: { $ne: true } 
    }

    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    }
    return db.collection("usuarios").find(filterMongo).toArray()
}

/**
 * Obtiene el usuario por id ingresado de la db.
 * @param {string} id_ingresado 
 * @returns {object} - Usuario obtenido por id.
 */
async function getUsuarioId(id_ingresado){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    }
    
    return db.collection("usuarios").findOne({ _id: new ObjectId(id_ingresado)})
}

/**
 * Agrega usuario enviado por POST a la DB con insertOne.
 * @param {*} usuario 
 * @returns {usuario: object} - Retorna el usuario agregado.
 * @throws {error} - Tira error cuando trata de agregar el nuevo usuario a la db.
 */
   async function addUsuario(usuario){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    }

    validarAge(usuario);
    validarCamposVacios(usuario);

    try {
        await db.collection("usuarios").insertOne(usuario)
    } catch (error) {
        console.log("Error al agregar usuario a la db: ", error);
        throw new error;
    }

    console.log(usuario);
    
    return usuario;
}

/**
 * Borra el usuario de manera lógica en la db
 * agregando la propiedad eliminado: true con $set.
 * @param {string} id - id del usuario a borrar.
 * @throws {error} - Si hubo un problema al "eliminar" usuario en la db.
 */
    async function borrarUsuario(id){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    };

    // Borrado lógico que pone eliminado en true.
    try {
        await db.collection("usuarios").updateOne(     
            {_id: ObjectId.createFromHexString(id) }, 
            { $set: { eliminado: true } } 
        );
    } catch (error) {
        console.log("Error al 'eliminar' el usuario en db: ", error);
        throw new error;
    }

}

/**
 * Modifica el usuario en DB reemplazando
 * el dato anterior ("método: PUT"). 
 * @param {string} id 
 * @param {Object} usuarioActualizado -  Reemplaza el usuario, tal cual se envió el objeto, a la DB.
 * @returns 
 */
async function modificarUsuario(id, usuarioActualizado){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    };

    validarAge(usuarioActualizado);

    validarCamposVacios(usuarioActualizado);
    
    console.log(usuarioActualizado);
    
    return db.collection("usuarios").replaceOne({ _id: new ObjectId(id) }, usuarioActualizado);
}

/**
 * Actualiza el usuario en DB ("método: PATCH").
 * @param {string} id 
 * @param {Object} usuarioActualizado - Actualiza datos anteriores, y también si hay datos nuevos.
 * @returns 
 */
async function actualizarUsuario(id, usuarioActualizado){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    };

    validarAge(usuarioActualizado);

    validarCamposVacios(usuarioActualizado);

    console.log("Datos nuevos: ", usuarioActualizado);

    return await db.collection("usuarios").updateOne(
        { _id: new ObjectId(id) }, 
        { $set: usuarioActualizado }
    )
}

/**
 * Agregar / Actualizar propiedades a usuario.
 * @param {*} idUsuario - ID del usuario en el que crear/modificar sus propiedades.
 * @param {*} vivienda - ID del vivienda a agregar a propiedades.
 * @returns {string} resultado - Si el modifiedCount es mayor a 0, confirma que se agregó, sino, informa que no se agregó.
 */
async function agregarViviendaPropiedades(idUsuario, vivienda){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    };

    // Obtenemos todo el vivienda por ID.
    const viviendaCompleta = await db.collection("viviendas").findOne({ _id: ObjectId.createFromHexString(vivienda._id) })

    // updateOne: Para buscar y hacer un push.
    // Usar el "Push" de MongoDB. De arrays.
    // Le pasamos el campo, y lo que queremos agregar.
    const resultado = await db.collection("usuarios").updateOne(
        { _id: ObjectId.createFromHexString(idUsuario) },
        { $push: { propiedades: viviendaCompleta } }
    )

    return resultado.modifiedCount > 0 ? "Vivienda agregada" : "Vivienda no agregada." ;
}

/**
 * Obtiene todas las propiedades que obtiene
 * del usuario por id en la DB.
 * @param {string} idUsuario 
 * @returns {Array} de propiedades del usuario.
 */
export async function getUsuarioPropiedades(idUsuario){
    try {
        await client.connect();
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
    }

    try {
        const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(idUsuario)});

        console.log(`Propiedades de ${usuario.name}:`, usuario.propiedades ?? 'Ninguna');

        return usuario.propiedades ?? `El usuario ${usuario.name} no tiene propiedades.`;
    } catch (error) {
        console.log("Error al conectarse al db: ", error)
        throw new error;
    }
}

export{
    validarCamposVacios,
    validarAge,
    agregarViviendaPropiedades,
    getUsuarioId,
    addUsuario,
    modificarUsuario,
    actualizarUsuario,
    borrarUsuario,
    getUsuarios
}