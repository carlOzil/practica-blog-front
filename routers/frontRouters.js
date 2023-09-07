const express = require("express");
const router = express.Router();

const { indexArticles, singleArticle, indexSign, indexLog, register, logIn, searchForm } = require("../controllers/frontController")

//PÁGINA INICIAL
router.get("/", indexArticles)

//EXPANDIR ARTICULO
router.get("/single/:title", singleArticle)

//BUSCAR ARTICULOS
router.post("/search", searchForm)

//REGISTRO
router.get("/signup", indexSign)

//REGISTRADO
router.post("/signedup", register)

//INCIAR SESION
router.get("/login", indexLog)

//SESION INICIADA
router.post("/logedin", logIn)

//CREAR ARTÍCULO

//EDITAR ARTICULO PROPIO

module.exports = router