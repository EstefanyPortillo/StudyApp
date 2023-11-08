const userController = require('../../controller/users/users.controller');
const Middleware = require('../../middleware/auth.controller');

module.exports = function(app) {

    app.get("/users/list",Middleware.auth, userController.listar);
    app.get("/users/:id", Middleware.auth,userController.consultarPorCodigo);
    app.post("/users/update",Middleware.auth, userController.actualizar);
    app.delete("/users/delete/:id",Middleware.auth, userController.eliminar);
    app.post("/users/login/", userController.login);
    app.post("/users/logout/",Middleware.auth, userController.logout);
}