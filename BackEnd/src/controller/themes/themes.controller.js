const {sequelize} = require("../../connection");
const {ThemesModel}= require("../../model/theme.model")
const ThemeService= require("../../service/theme.service")

const listar = async function(req, res) {
console.log("listar temas");
    try {
        const themes = await ThemeService.listar(req.query.filtro || '',req.query.topic_id || '');
        // EN themes[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
        if(themes && themes[0]){
            res.json({
                success:true,
                themes: themes[0]
            });
        }else{
            res.json({
                success:true,
                themes: []
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
    console.log("consultar Themes por codigo");
    try {
        const themes = await ThemeService.consultarPorCodigo(req.params.id);
        
        // EN Themes[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
        if(themes){
            res.json({
                success:true,
                themes: themes
            });
        }else{
            res.json({
                success:true,
                themes: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            error: error.message
        });
    }    //res.json(themes);
};

const actualizar = async function(req, res) {
    let themesRetorno=null; //GUARDARA EL TEMA QUE SE VA A INCLUIR O EDITAR
    const data =req.body; // SE OBTIENE LOS DATOS DEL CUERPO DE LA PETICION
    try {
        themesRetorno = await ThemeService.actualizar(data);
        res.json({
            success: true,
            theme: themesRetorno
        });
    } catch (error) {
        res.json({
            success:false,
            error: error.message
        });
    }
};

const eliminar = async function( req, res) {
    console. log( "eliminar themes ") ;
    try {
        await ThemeService.eliminar(req.params.id)
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