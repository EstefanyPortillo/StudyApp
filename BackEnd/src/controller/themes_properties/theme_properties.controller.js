const ThemePropertyService = require("../../service/themes_properties.service" );

const listar = async function (req, res) {
  console.log("listar propiedades de los temas"); 
  try {
    const themes_properties = await ThemePropertyService.listar(req.query.filtro || '',req.query.theme_id || '');
    if (themes_properties && themes_properties[0]) {
      res.json({
        success: true,
        tema_properties: themes_properties[0],
      });
    } else {
      res.json({
        success: true,
        tema_properties: [],
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const consultarPorCodigo = async function (req, res) {
  console.log("Buscar propiedades de tema");
  try {
    const tema_properties = await ThemePropertyService.consultarPorCodigo(req.query.id || '');;
    if (tema_properties) {
      res.json({
        success: true,
        theme_properties: tema_properties,
      });
    } else {
      res.json({
        success: true,
        theme_properties: [],
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const actualizar = async function (req, res) {
  console.log("actualizar propiedades de los temas");
  const data =req.body;
  let temaPropertyRetorno = null;
  try {    
    temaPropertyRetorno = await ThemePropertyService.actualizar(data);

    res.json({
      success: true,
      theme_properties: temaPropertyRetorno,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const eliminar = async function (req, res) {
  console.log("eliminar propiedades de los temas");
  try {
    const themePropertyRetorno = await ThemePropertyService.eliminar(req.params.id);
    res.json({
      success: themePropertyRetorno,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo
};
