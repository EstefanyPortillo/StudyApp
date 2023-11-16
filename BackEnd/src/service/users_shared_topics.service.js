const {sequelize} = require("../connection");
const {SharedTopicsUsersModel}= require("../model/user_shared_topics.model");

const actualizar = async function(data) {
  console.log("Crear o evitar duplicados de user_shared_topics", data);
  try {
      const existingRecord = await SharedTopicsUsersModel.findOne({
          where: {
            user_shared: data.user_shared,
            topic_id: data.topic_id,
            user_received:data.user_received
          },
      });
      // Si existe un registro
      if (existingRecord) {
         return false;
      } else {
          // No existe un registro
          const usuarioRetorno = await SharedTopicsUsersModel.create(data);
          return usuarioRetorno;
      }
  } catch (error) {
      throw error;
  }
};

const eliminar = async function (id_user, id_topic) {
    console.log("Eliminar topics de usuario");
    try {
      // Buscar los registros en shared_topics_users que coinciden con el id de usuario y el id de tema
      const deletedRows = await SharedTopicsUsersModel.destroy({
        where: {
          user_shared: id_user,
          topic_id: id_topic,
        },
      });
      if (deletedRows > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
        throw error;
    }
};



module.exports = {
     actualizar, eliminar,
};