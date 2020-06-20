'use strict';
const axios = require('axios');
const movie = require('../models/movie');
module.exports = {
    up: async(queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        const insertMovies = moviesJSON => {
          //Mapea los parámetros que queremos (title, overview, etc) y los trae en Json
            const movies = moviesJSON.map(m => ({
                title: m.title,
                overview: m.overview,
                poster_path: m.poster_path,
                popularity: m.popularity
            }));
            //inserta las primeras 20 movies
            return queryInterface.bulkInsert('Movies', movies, {});
        }
        try {
            //hacemos petición de las más populares
            const res = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=93607521fc72cef80371ed98384cf107&language=es-Es')
            const moviesJSON = [];
            moviesJSON.push(...res.data.results); //primera página
            for (let i = 2; i < 100; i++) {
                const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=93607521fc72cef80371ed98384cf107&language=es-Es&page=' + i)
                moviesJSON.push(...response.data.results) //segundas y sucesivas
            }
            console.log(moviesJSON.length)
            return insertMovies(moviesJSON);
        } catch (error) {
            console.log(error);
        }
    },
    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};