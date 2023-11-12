const {sequelize} = require("../../connection");
const {UserModel}= require("../../model/user_shared_topics.model")
const UserSharedTopicService= require("../../service/users_shared_topics.service")
const jwt = require('jsonwebtoken')

const actualizar = async function(req, res) {
    console.log("actualizar shared topics a usuarios.");
    let usuarioRetorno=null; //GUARDARA EL USARIO QUE SE VA A INCLUIR O EDITAR
    const data = req.body; // SE OBTIENE LOS DATOS DEL CUERPO DE LA PETICION
   try {
        usuarioRetorno= await UserSharedTopicService.actualizar(data);
        res.json({
            success: true,
            user: usuarioRetorno
        });
    } catch (error) {
        res.json({
            success:false,
            usuarios: error.message
        });
    }

    
};

const eliminar = async function( req, res) {
    console. log( "eliminar usuarios ") ;
    try {

        let user_received = req.params.id_user_received
        let topic_id = req.params.id_topic
        await UserSharedTopicService.eliminar(user_received,topic_id);
       
        res.json({
            success: true
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
    
};

module.exports = {
     actualizar, eliminar
};