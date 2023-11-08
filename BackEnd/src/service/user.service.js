const {sequelize} = require("../connection");
const {UserModel}= require("../model/user.model");
const listar = async function(textoBuscar) {
    console.log("listar usuarios ACA");
    try {
        const users = await sequelize.query(`SELECT * 
        FROM users 
        WHERE 
        UPPER(name) LIKE UPPER('%${textoBuscar}%')
        AND deleted IS false
        ORDER BY id`);
        // EN USERS[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
        if(users && users[0]){
            return users;
        }else{
            return [];
        }
    } catch (error) {
       console.log(error);
       throw error;
    }
    
      
    //res.json(users);
};
const consultarPorCodigo = async function(id) {
    console.log("consultar Usuarios por codigo");
    try {
        const users = await UserModel.findByPk(id);
        
        // EN USERS[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
        if(users){
           return users
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    
      
    //res.json(users);
};
const actualizar = async function(data) {
    console.log("actualizar usuarios");
    let usuarioRetorno=null; //GUARDARA EL USARIO QUE SE VA A INCLUIR O EDITAR
    const id=data.id; // ID PASADO

    let usrExiste=null;

   try {
        if(id){
            usrExiste=  await UserModel.findByPk(id);
        }
        if(usrExiste){
            usuarioRetorno = await UserModel.update(data, {where: {id : id}});
        }else{
            data.deleted=0;
            usuarioRetorno = await UserModel.create(data);
        }
       return usuarioRetorno;
    } catch (error) {
        throw error;
    }

    
};

const eliminar = async function(id) {
    console. log( "eliminar usuarios ") ;
    try {
        UserModel.update(
            { deleted: true },
            { where: { id: id } }
          );
       
        return true;
    } catch (error) {
        throw error;
    }
    
};



module.exports = {
    listar, actualizar, eliminar,consultarPorCodigo
};