const express = require('express');

require('dotenv').config();

//SERVIDOR
const app = express();

//PORT
const port = process.env.PORT

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//parse application/json
app.use(express.json())

// CARPETA ESTÁTICA
app.use(express.static(__dirname + '/public'));

// CONFIGURAR INGENIERIA DE PLANTILLAS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// LLAMAR RUTAS FRONT
app.use("/", require("./routers/frontRouters"));
app.use("/admin", require('./routers/frontRouters'))

// LLAMAR A POSIBLE ERROR
// app.use((req, res, next) => {
//     res.status(404).render("404", {
//         titulo: 'ERROR 404'
//     });
// });

//SERVIDOR A LA ESCUCHA
app.listen(port, ()=>{
    console.log(`Servidor FRONT a la escucha del puerto ${port}`)

});
