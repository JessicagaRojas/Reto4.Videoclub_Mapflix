//Requerimos la carpeta "models" y le pasamos la función USER para traer el archivo
const { User, Token } = require('../models'); 

const UserController = { 
    getAll(req, res) {
        User.findAll()
            .then(users => res.send(users))
            .catch(error => { 
                console.error(error);
                res.status(500).send({ message: 'La hemos cagado ^^U' });
            })
        
    }
}; 

 module.exports = UserController //Exportamos UserController y toda su lógica