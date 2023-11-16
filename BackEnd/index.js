
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser());
app.use(cors ({
    origin: '*'
}));
const userRoute= require("./src/route/users/users.route");
const themesRoute= require("./src/route/themes/themes.route");
const topicsRoute= require("./src/route/topics/topics.route");
const themesPropertiesRoute= require("./src/route/themes_properties/themes_properties.route");
const userSharedTopicRoute = require("./src/route/users_shared_topics/users_shared_topics.route")
//RUTA RAIZ ES ESE GET
//LLAMADA A LA RUTA DE LOS CASOS DE USO, EN ESTE CASO DE USER AL INICIO DE LA APLICACION
userRoute(app);
themesRoute(app);
topicsRoute(app);
themesPropertiesRoute(app);
userSharedTopicRoute(app);
app.listen(3000);