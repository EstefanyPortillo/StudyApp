const { sequelize } = require("../connection");
const { TopicsModel } = require("../model/topic.model");

const listar = async function (textoBuscar, user_id) {
  console.log("listar topics ACA");
  try {
    const topics = await sequelize.query(`SELECT Distinct topics.*, users.name as Owner
        FROM topics 
        left join users on users.id=topics.owner_user_id
        left join shared_topics_users as stu on stu.user_received =  ${user_id}
        WHERE 
        (topics.owner_user_id = ${user_id} OR topics.id=stu.topic_id) AND
        UPPER(topics.name) LIKE UPPER('%${textoBuscar}%')
        ORDER BY topics.order_index`);
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
      topicsRetorno = await TopicsModel.update(data, { where: { id: id } });
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

const actualizarOrden = async function (orderData) {
  console.log("Escribi algo mira", orderData);
  const transaction = await sequelize.transaction();
  try {
    for (const item of orderData) {
      await TopicsModel.update({ order_index: item.order_index }, {
        where: { id: item.id },
        transaction
      });
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


const soloListarTopicos = async function () {
  console.log("listar topicos");
  try {
    const topics = await sequelize.query(`
      SELECT topics.*, users.name as nombre, users.last_name as apellido
      FROM topics
      JOIN users ON topics.owner_user_id = users.id
      ORDER BY order_index ASC`,
      { type: sequelize.QueryTypes.SELECT });

    return topics;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const listarSharedMeService = async function (userId) {
  console.log("listar topicos");
  try {
    const topics = await sequelize.query(`
      SELECT Distinct t.*, stu.id as id_shared_topics_users, u.name as shared_by_user_name, u.last_name as shared_by_user_last_name
      FROM shared_topics_users stu
      INNER JOIN topics t ON stu.topic_id = t.id
      INNER JOIN users u ON u.id = stu.user_shared
      WHERE stu.user_received = :userId
      ORDER BY t.id`, {
      replacements: { userId: userId },
      type: sequelize.QueryTypes.SELECT
    });

    return topics;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const deleteTopicService = async function (id) {
  console.log("eliminar topics");
  try {
    await sequelize.query(`
      DELETE FROM shared_topics_users WHERE id = :id;`, {
      replacements: { id: id },
      type: sequelize.QueryTypes.RAW
    });
    // Si no hay errores, la eliminación fue exitosa
    return true;
  } catch (error) {
    console.error(error);
    // Si hay un error, la eliminación falló
    return false;
  }
};


module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo,
  actualizarOrden,
  soloListarTopicos,
  listarSharedMeService,
  deleteTopicService,
};
