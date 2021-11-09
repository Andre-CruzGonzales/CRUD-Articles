const express=require("express");
const articuloSchema = require("../models/articulos");
const router = express.Router();


//create article
/**
 * @swagger
 * components:
 *  schemas:
 *      Articulo:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: El nombre del articulo
 *              precio:
 *                  type: number,
 *                  description: El precio del articulo
 *              marca:
 *                  type: string
 *                  description: La marca del articulo
 *              stock:
 *                  type: number
 *                  description: El stock existente del articulo 
 *          required:
 *              - nombre
 *              - precio
 *              - marca
 *              - stock
 *          example:
 *              nombre: Lavadora
 *              precio: 1540.00
 *              marca: LG
 *              stock: 15     
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Articulo
 *  description: API Lista de Articulos
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: crea un nuevo articulo
 *      tags: [Articulo]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Articulo'
 *      responses:
 *          200:
 *              description: nuevo articulo creado!  
 *          
 *              
 */
router.post('/articulos',(req,res)=>{
    const articulo = articuloSchema(req.body);
    articulo
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({"message":error}));
});
//get articulos
/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: devuelve los articulos
 *      tags: [Articulo]
 *      responses:
 *          200:
 *              description: todos los articulos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Articulo' 
 *          
 *              
 */
router.get('/articulos',(req,res)=>{
    articuloSchema
        .find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({"message":error}));
});

//get articulos por ID
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: devuelve un articulo por ID
 *      tags: [Articulo]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true,
 *              description: El id del articulo
 *      responses:
 *          200:
 *              description: el articulo buscado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Articulo'
 *          404:
 *              description: articulo not found
 *              
 */
router.get('/articulos/:id',(req,res)=>{
    const { id } = req.params;
    articuloSchema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((error)=>res.json({"message":error}));
});
//update articulos
/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: actualiza un nuevo articulo
 *      tags: [Articulo]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true,
 *              description: El id del articulo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Articulo'
 *      responses:
 *          200:
 *              description: articulo actualizado
 *          404:
 *              description: articulo not found
 *          
 *              
 */
router.put('/articulos/:id',(req,res)=>{
    const { id } = req.params;
    const { nombre, precio, marca, stock }=req.body;
    articuloSchema
        .updateOne({_id:id},{$set: {nombre, precio, marca, stock}})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({"message":error}));
});
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: elimina un articulo por ID
 *      tags: [Articulo]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true,
 *              description: El id del articulo
 *      responses:
 *          200:
 *              description: articulo eliminado
 *              
 *          404:
 *              description: articulo not found
 *              
 */
router.delete('/articulos/:id',(req,res)=>{
    const { id } = req.params;
    articuloSchema
        .remove({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({"message":error}));
});

module.exports = router;