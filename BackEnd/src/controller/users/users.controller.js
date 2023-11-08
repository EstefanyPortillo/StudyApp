const {sequelize} = require("../../connection");
const {UserModel}= require("../../model/user.model")
const UserService= require("../../service/user.service")
const jwt = require('jsonwebtoken')
const listar = async function(req, res) {
    console.log("listar usuarios");
    try {
        const users = await UserService.listar(req.query.filtro || '');
        // EN USERS[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
        if(users && users[0]){
            res.json({
                success:true,
                usuarios: users[0]
            });
        }else{
            res.json({
                success:true,
                usuarios: []
            });
        }
    } catch (error) {
        res.json({
            success:false,
            error: error.message
        });
    }
    
      
    //res.json(users);
};
const consultarPorCodigo = async function(req, res) {
    console.log("consultar Usuarios por codigo");
    try {
        const users = await UserService.consultarPorCodigo(req.params.id);
        
        // EN USERS[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
        if(users){
            res.json({
                success:true,
                usuario: users
            });
        }else{
            res.json({
                success:true,
                usuario: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            error: error.message
        });
    }
    
      
    //res.json(users);
};
const actualizar = async function(req, res) {
    console.log("actualizar usuarios");
    let usuarioRetorno=null; //GUARDARA EL USARIO QUE SE VA A INCLUIR O EDITAR
    const data =req.body; // SE OBTIENE LOS DATOS DEL CUERPO DE LA PETICION


   try {
        usuarioRetorno= await UserService.actualizar(data);
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
        await UserService.eliminar(req.params.id);
       
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
const login = async function( req, res) {
    console.log ("login usuarios");
    try {
    // Buscar en la base de datos el usuario con el correo electrónico y contraseña
        const usersDB = await sequelize.query("SELECT * FROM users WHERE email ='"+ req.body.email + "' AND password = '" + req.body.password + "'");
        console.log ("users",usersDB);
        let user = null;
        // Verificar si se encontraron resultados en la consulta a la base de datos y asienar el primer resultado
        if (usersDB. length > 0 && usersDB[0].length > 0) {
            user = usersDB[0][0]; 
            // Asignar el primer registro encontrado a la variable "user*
            if(user.token){
                res.json({
                    success: false,
                    error: 'usuario ya autenticado'
                });
            }
            let token= jwt.sign({
                codigo: user.id,
                name: user.name,
                last_name: user.last_name,
                email:user.email,
                avatar: user.avatar
            },'passwd');
            const usersDBUpdate = await sequelize.query("UPDATE users set token= '"+ token + "' WHERE id = "+user.id)
            //sise encuentra eucuarto en la baco de datos ce mostrara true v eusuario.
            res.json({
                success: true,
                token:token,
                user_id: user.id
            });
        } else{
            res.json({
                success: false,
                error: 'usuario no encontrado'
            });
                
        }
        // Si no se encuentra el usuario en la base de datos,
       
    }catch (error) {
        // Si ocurre un error, devoLver
        console.log(error);
        res.json ({
            success: false,
            error: error .message
        });
    }
    
};
const logout = async function( req, res) {
   
   try {
    const userDb= await sequelize.query("UPDATE users set token=null where id= " +res.locals.userId+ "");
    res.json({
        success:true
    })
   } catch (error) {
    res.json({
        success:false,
        error: error.message
    })
   }
    
};
module.exports = {
    listar, actualizar, eliminar,consultarPorCodigo,login,logout
};