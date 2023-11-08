const Middleware = require('../../middleware/auth.controller');
const topicsController = require('../../controller/topics/topics.controller');
module.exports = function(app) {

    app.get("/topics/list",Middleware.auth, topicsController.listar);
    app.post("/topics/update",Middleware.auth, topicsController.actualizar);
    app.delete("/topics/delete/:id",Middleware.auth, topicsController.eliminar);
    app.get("/topics/:id",Middleware.auth, topicsController.consultarPorCodigo);
}