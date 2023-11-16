const Middleware = require('../../middleware/auth.controller');
const topicsController = require('../../controller/topics/topics.controller');

module.exports = function (app) {
    app.get("/topics/solo-listar",
        Middleware.auth,
        topicsController.soloListar
    );

    app.get(
        "/topics/shared_me/:id",
        Middleware.auth,
        topicsController.listarSharedMeController
    );

    app.delete("/topics/delete-share-me-topics/:off",
        Middleware.auth,
        topicsController.deleteTopicsController,
    );

    app.get("/topics/list", Middleware.auth, topicsController.listar);
    app.post("/topics/update", Middleware.auth, topicsController.actualizar);
    app.delete("/topics/delete/:id", Middleware.auth, topicsController.eliminar);
    app.get("/topics/:id", Middleware.auth, topicsController.consultarPorCodigo);
  
    app.post("/topics/update-order",
        Middleware.auth,
        topicsController.actualizarOrden
    );
}