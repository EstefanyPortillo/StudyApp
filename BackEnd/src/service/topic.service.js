const { sequelize } = require("../connection");
const { TopicsModel } = require("../model/topic.model");

const listar = async function (textoBuscar,user_id) {
  console.log("listar topics ACA");
  try {
    const topics = await sequelize.query(`SELECT topics.*, users.name as Owner
        FROM topics 
        left join users on users.id=topics.owner_user_id
        left join shared_topics_users as stu on stu.user_recieved =  ${user_id}
        WHERE 
        (topics.owner_user_id = ${user_id} OR topics.id=stu.topic_id) AND
        UPPER(topics.name) LIKE UPPER('%${textoBuscar}%')
        ORDER BY topics.id`);
    // EN topics[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
    if (topics && topics[0]) {
      return topics;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (id) {
  console.log("consultar topics por codigo");
  try {
    const topics = await TopicsModel.findByPk(id);

    // EN topics SE ENCUENTRA NUESTRO topics BUSCADO
    if (topics) {
      return topics;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizar = async function (data) {
  console.log("actualizar topics");
  let topicsRetorno = null; //GUARDARA EL TEMA QUE SE VA A INCLUIR O EDITAR
  const id = data.id; // ID PASADO

  let topicExiste = null;

  try {
    if (id) {
      topicExiste = await TopicsModel.findByPk(id);
    }
    if (topicExiste) {
      topicsRetorno = await TopicsModel.update(data,{where: {id : id}});
    } else {
      topicsRetorno = await TopicsModel.create(data);
    }
    return topicsRetorno;
  } catch (error) {
    throw error;
  }
};

const eliminar = async function (id) {
  console.log("eliminar topics ");
  try {
    const topics = await TopicsModel.findByPk(id);
    if (topics) {
      await TopicsModel.destroy({
        where: { id: id },
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo,
};
