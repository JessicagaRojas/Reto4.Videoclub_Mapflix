const { User, Token } = require('../models');//requerimos la carpeta models y le pasamos la funcion user para traer ese archivo
const bcryptjs = require('bcryptjs');//requerimos la libreria bcrypsjs para la encriptacion de contraseñas
const jwt = require('jsonwebtoken');//requerimos la libreria jsonwebtoken para la creacion de tokens
const UserController = {
    getAll(req, res) {
        User.findAll()
            .then(users => res.send(users))
            .catch(error => {
                console.error(error);
                res.status(500).send({ message: 'Error al crear el usuario' });
            })
    },
    async signup(req,res) {
        try {
            const hash = await bcryptjs.hash(req.body.password, 9);
            req.body.password = hash;
            const user = await User.create(req.body);
            res.status(200).send(user)
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Error al añadir usuario'});
        }
    },
    async login(req,res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            const isMatch = await bcryptjs.compare(req.body.password, user.password);
            if (!isMatch) {
                throw new Error('Has equivocado el password o el usuario')
            }
            const token = jwt.sign({ id: user.id}, 'bootCampdelInfierno', { expiresIn: '2s' });
            await Token.create({ 
                token: token,
                UserId: user.id,
                revoked: false
            });
            res.send({ user, token })
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'la has cagado en algun momento.'
            });
        }
    },
    async delete(req,res) {
        try {
            const { id } = req.params
            const user = await User.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).send({ message : 'Usuario eliminado'})
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Hay un problema logeando el usuario'})
        }
    }
}
module.exports = UserController;//exportamos usercontroller y toda su logica