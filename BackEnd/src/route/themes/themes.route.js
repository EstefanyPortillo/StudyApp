const Middleware = require('../../middleware/auth.controller');
const themesController = require('../../controller/themes/themes.controller');
module.exports = function(app) {

    app.get("/themes/list",Middleware.auth, themesController.listar);
    app.post("/themes/update",Middleware.auth, themesController.actualizar);
    app.delete("/themes/delete/:id",Middleware.auth, themesController.eliminar);
    app.get("/themes/:id",Middleware.auth, themesController.consultarPorCodigo);
}