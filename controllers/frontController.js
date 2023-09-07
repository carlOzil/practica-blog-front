const fetch = require("node-fetch")

//PÁG INICIAL
const indexArticles = async (req, res) => {

    try {
        const resp = await fetch('http://localhost:3000/api/v1/blog');

        if (resp.ok) {
            const blogs = await resp.json();

            res.render('index.ejs', {
                title: 'Práctica BLOG 2o23',
                blogs: blogs.data
            });
        };
    } catch (error) {
        console.log(error);
    };
};

//EXPANDIR UNA NOTICIA
const singleArticle = async (req, res) => {

    try {
        const resp = await fetch(`http://localhost:3000/api/v1/blog/${req.params.title}`);

        if (resp.ok) {
            const blogs = await resp.json();

            res.render("singleArticle.ejs", {
                title: "Artículo completo",
                blogs: blogs.data
            });
        };
    } catch (error) {
        console.log(error);
    };
};

//BUSCAR NOTICIA
const searchForm = async (req, res) => {

    try {
        const resp = await fetch(`http://localhost:3000/api/v1/blog/${req.body.title}`);

        if (resp.ok) {
            const blogs = await resp.json();

            res.render("search.ejs", {
                title: "Tu búsqueda:",
                blogs: blogs.data
            });
        };
    } catch (error) {
        console.log(error);
    };
};

//PÁGINA CREACIÓN CUENTA
const indexSign = (req, res) => {
    res.render('registerAcc.ejs', { title: 'Crear nueva cuenta' });
};
//PÁGINA INICIO SESIÓN
const indexLog = (req, res) => {
    res.render('logIn.ejs', { title: 'Inicia sesión' });
};

//CREAR CUENTA NUEVA
const register = async (req, res) => {

    const { email, name, password, passConfirm } = req.body
    const body = {
        email,
        name,
        password,
        passConfirm
    };
    try {
        const resp = await fetch("http://localhost:3000/api/v1/auth/register", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resp.ok) {
            res.render("logIn.ejs", {
                title: "Inicia sesión",
            });
        };
    } catch (error) {
        console.log(error);
    };
};

//INCIAR SESIÓN
const logIn = async (req, res) => {
    const { email, password } = req.body
    const body = {
        email,
        password
    };

    try {
        const resp = await fetch("http://localhost:3000/api/v1/auth/login", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (resp.ok) {
            const user = await resp.json();

            if (user.role == "publisher") {
                res.render("indexPublisher.ejs", {
                    title: "Saludos blogero",
                    name: user.name,
                    uid: user.uid,
                    role: user.role
                });

            } else {
                res.render("admin/indexAdmin.ejs", {
                    title: "Saludos administrador",
                    name: user.name,
                    uid: user.uid,
                    role: user.role
                });
            };
        };

    } catch (error) {
        console.log(error);
    };
};


module.exports = {
    indexArticles,
    singleArticle,
    indexLog,
    indexSign,
    register,
    logIn,
    searchForm

}