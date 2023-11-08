const { sequelize } = require("../connection");
const { ThemesModel } = require("../model/theme.model");

const listar = async function (textoBuscar,topic_id,user_id) {
  console.log("listar temas ACA");
  try {
    const themes = await sequelize.query(`SELECT * 
        FROM themes 
        WHERE 
        topic_id = ${topic_id} AND
        UPPER(name) LIKE UPPER('%${textoBuscar}%')
        ORDER BY id`);
    // EN THEMES[0] SE ENCUENTRA NUESTRO LISTADO DE SQL
    if (themes && themes[0]) {
      return themes;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (id) {
  console.log("consultar temas por codigo");
  try {
    const themes = await ThemesModel.findByPk(id);

    // EN themes SE ENCUENTRA NUESTRO themes BUSCADO
    if (themes) {
      return themes;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizar = async function (data) {
  console.log("actualizar temas");
  let themesRetorno = null; //GUARDARA EL TEMA QUE SE VA A INCLUIR O EDITAR
  const id = data.id; // ID PASADO

  let themeExiste = null;

  try {
    if (id) {
      themeExiste = await ThemesModel.findByPk(id);
    }
    if (themeExiste) {
      themesRetorno = await ThemesModel.update(data,{where: {id : id}});
    } else {
      themesRetorno = await ThemesModel.create(data);
    }
    return themesRetorno;
  } catch (error) {
    throw error;
  }
};

const eliminar = async function (id) {
  console.log("eliminar temas ");
  try {
    const themes = await ThemesModel.findByPk(id);
    if (themes) {
      await ThemesModel.destroy({
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
