const themePropertyController = require('../../controller/themes_properties/theme_properties.controller');
const Middleware = require('../../middleware/auth.controller');

module.exports = function(app) {

    app.get("/themes-properties/list",Middleware.auth, themePropertyController.listar);
    app.get("/themes-properties",Middleware.auth, themePropertyController.consultarPorCodigo);
    app.post("/themes-properties/update",Middleware.auth, themePropertyController.actualizar);
    app.delete("/themes-properties/delete/:id",Middleware.auth, themePropertyController.eliminar);
}