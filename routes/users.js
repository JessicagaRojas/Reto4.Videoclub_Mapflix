//importamos la libreria express (solo la función router)
const router = require('express').Router();
//requerimos el archivo usercontroller de la carpeta controllers y se lo pasamos a la funcion UserController
const UserController = require('../controllers/UserController');
//requerimos el archivo auth de la carpeta middlewares que se encarga
const  { auth }  = require('../middlewares/auth');//Paso de usuarios mediante la función desginada


router.get('/', auth, UserController.getAll);//para traernos a todos los usuarios
router.post('/signup', UserController.signup);//para crear un usuario y meterlo en la base de datos
router.post('/login', UserController.login);//para logear a un usuario ya creado en la base de datos

//Para eliminar usuario. Poner /delete: "ID usuario con número" en Postman
router.delete('/delete/:id', UserController.delete); 
module.exports = router;//exportamos las funciones 