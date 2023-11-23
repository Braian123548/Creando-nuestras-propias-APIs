const db = require('../../database/models');
const { Movie,Actor} = db;

const moviesController = {
    create: function (req, res) {
        const { title, rating, awards, release_date, length, genre_id } = req.body;

        const movieNew = {
            title: title,
            rating: rating,
            awards: awards,
            release_date: release_date,
            length: length,
            genre_id: genre_id
        };

        console.log(movieNew.title);

        Movie.create(movieNew)
            .then(() => {
                return res.send(movieNew);
            })
            .catch(error => res.send(error));
    },

    destroy: function (req, res) {
        const { id } = req.params;
    
        Actor.update({ favorite_movie_id: null }, {
            where: {
                favorite_movie_id: id
            }
        })
        .then(() => {
            Movie.destroy({
                where: {
                    id: id
                }
            })
            .then(() => {
                return res.send(`La película con el id ${id} ha sido eliminada.`);
            })
            .catch(error => res.send(error));
        })
        .catch(error => res.send(error));
    }
    
};

module.exports = moviesController;
