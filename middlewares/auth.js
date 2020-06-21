//usamos la libreria del token y se la pasamos a funcion jwt
const jwt = require('jsonwebtoken');
const { User, Token } = require('../models');//Requerimos models para pasar la función token + user
const auth = async(req, res, next) => {
    try {
        //en req.headers estan los headers y guardamos el token en el de authoritation
        const token = req.headers.authorization;
        //obtenemos el payload a partir del token y del secreto con el que firmamos anteriormente el token (consultar login)
        const payload = jwt.verify(token, 'bootCampdelInfierno');
        //con findByPk buscamos por id el usuario
        const user = await User.findByPk(payload.id);
        //buscamos el token en la base de datos que no este revocado y que pertenezca a ese usuario
        const tokenFound = await Token.findOne({
            //condiciones de la query
            where: {
                token: token,
                UserId: payload.id,
                revoked: false
            }
        })
        //si el token o el usuario no existen le respondemos no autorizado
        if (!user || !tokenFound) { 
            return res.status(401).send({
                message: 'No autorizado'
            })
        }
        //creamos una propiedad en el objeto req, llamada user, y le asignamos como valor el objeto usuario obtenido de la bd
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(401).send({
            message: 'No autorizado', error
        })
    }
}
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ message: 'No autorizado',
        error })
    }
    next();
}
//exportamos las funciones de auth
module.exports = {
    auth,
    isAdmin
}






















