const {sequelize} = require("../../connection");
const {TopicsModel}= require("../../model/topic.model");
const TopicService= require("../../service/topic.service")
const listar = async function(req, res) {
    console.log("listar topicos");
    try {

        const topics = await TopicService.listar(req.query.filtro || '', res.locals.userId);
        // EN topics[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
        if(topics && topics[0]){
            res.json({
                success:true,
                topics: topics[0]
            });
        }else{
            res.json({
                success:true,
                topics: []
            });
        }
    } catch (error) {
        res.json({
            success:false,
            error: error.message
        });
    }  
};
const consultarPorCodigo = async function(req, res) {
    console.log("consultar Topics por codigo");
    try {
        const topics = await TopicService.consultarPorCodigo(req.params.id);
        
        // EN topics[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
        if(topics){
            res.json({
                success:true,
                topics: topics
            });
        }else{
            res.json({
                success:true,
                topics: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            error: error.message
        });
    }
    
      
};

const actualizar = async function(req, res) {
    let topicsRetorno=null; //GUARDARA EL TOPICO QUE SE VA A INCLUIR O EDITAR
    const data =req.body; // SE OBTIENE LOS DATOS DEL CUERPO DE LA PETICION

    try {
        
        topicsRetorno = await TopicService.actualizar(data);
       
        res.json({
            success: true,
            topics: topicsRetorno
        });
    } catch (error) {
        res.json({
            success:false,
            error: error.message
        });
    }
};

const eliminar = async function( req, res) {
    console. log( "eliminar topics") ;
    try {
        await TopicService.eliminar(req.params.id)
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
    listar, actualizar, eliminar, consultarPorCodigo
};