
const { sequelize } = require("../connection");
const { ThemePropertiesModel } = require("../model/theme_properties.model");

const listar = async function (textoBuscar,theme_id) {
  console.log("listar themes properties service");

  try {
    const theme_properties = await sequelize.query(
      `SELECT themes_properties.*,CONCAT(users.name,' ',users.last_name) as owner,users.id as owner_id FROM themes_properties 
       left join users on users.id=themes_properties.owner_user_id
        WHERE 
        theme_id = '${theme_id}'
        AND UPPER(property_name) LIKE UPPER('%${textoBuscar}%')
      ORDER BY themes_properties.id`
    );

    if (theme_properties  && theme_properties[0]) {
      
      return theme_properties;

    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (id) {
  console.log("Buscar theme properties service");

  try {

    const ThemePropertiesModelResult = await ThemePropertiesModel.findByPk(id);

    if (ThemePropertiesModelResult) {
      
      return ThemePropertiesModelResult;
    } else {
      return []
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizar = async function (data) {
  console.log("actualizar themes properties service");
  let themePropertyRetorno = null;
  let tmsExiste = null;
  const id = data.id;
  try {
    if (id) {
      tmsExiste = await ThemePropertiesModel.findByPk(id);
    }
    if (tmsExiste) {
      
      themePropertyRetorno = await ThemePropertiesModel.update(data, { where: { id: id } });

    } else {

      themePropertyRetorno = await ThemePropertiesModel.create(data);
    }

    return themePropertyRetorno;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (id) {
  console.log("eliminar themes properties service");

  try {
    await ThemePropertiesModel.destroy( { where: { id: id } });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo
};
