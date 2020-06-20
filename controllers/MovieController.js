const { Movie, Order } = require('../models');

const MovieController = {
    async getAllmovies(req,res) {
        try {
            const movies = await Movie.findAll()
            res.status(200).send(movies)
            
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Error obteniendo usuarios'})
        }
    },
    async searchtitle(req,res) {
        try {
            const { title } = req.params
            const movie = await Movie.findOne({
                where : {
                    title : title
                }
            });
            if (movie === null){
                res.status(400).send({ message : 'Movie no encontrada'});
            }
            res.status(200).send(movie);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Error, pero seguramente tuyo codeando'})
        }
    },
    async searchId(req,res) {
        try {
            const { id } = req.params;
            const movieId = await Movie.findOne({
                where : {
                    id : id
                }
            })
            if (movieId === null){
                res.status(400).send({ message : 'Movie no encontrada'})
            }
            res.status(200).send(movieId);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Error, pero seguramente tuyo codeando'})
        }
    }
}
module.exports = MovieController;