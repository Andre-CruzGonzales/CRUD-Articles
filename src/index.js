const express = require('express');
const mongoose = require('mongoose');
const app =  express();
require('dotenv').config();
const articuloRoutes = require('./routes/articulo');
const path = require('path');
//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options={
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Librerias Apis - CERTUS",
            version: "1.0.0",
            //description: "Demo de Librerias de Ventas API",
        },
        servers: [
            {
                url:"http://localhost:10801",
            },
        ],
    },
    apis:[`${path.join(__dirname,"./routes/*.js")}`],
};
//puerto
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use("/api",articuloRoutes);
app.use("/api-doc",
        swaggerUI.serve,
        swaggerUI.setup(swaggerJsDoc(options)));
//ruta de prueba
app.get('/',(req,res)=>{
    res.send('Welcome to my api');
});

//conexion a mongoDB
mongoose.connect(process.env.MONGODB_URI).
then(()=>console.log("Connected to MongoDB Atlas"))
.catch((error)=> console.log(error));
app.listen(port,()=>console.log('server listening on port',port));