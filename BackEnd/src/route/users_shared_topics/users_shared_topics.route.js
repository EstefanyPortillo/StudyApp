const userSharedTopicController = require('../../controller/users_shared_topics/users_shared_topics.controller');
const Middleware = require('../../middleware/auth.controller');

module.exports = function(app) {

    app.post("/user/shared/topic/update",Middleware.auth, userSharedTopicController.actualizar);
    app.delete("/user/shared/topic/delete/:id_user/:id_topic", Middleware.auth, userSharedTopicController.eliminar);
}