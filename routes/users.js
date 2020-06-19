//Importa la librería express (solo función router)
const router = require('express').Router(); 

//Requiere el fichero UserController y se lo pasa función UserController
const UserController = require('../controllers/UserController');

//Paso de usuario mediante la función designada (común a las siguientes)
router.get('/', UserController.getAll); //Para traer a todos los usuarios

router.post('/signup', UserController.signup); //Para crear un usuario y meterlo en la base de datos

// router.post('/signup', UserController.signup); 

module.exports = router; //Exportamos las funciones ¿Al POSTMAN?