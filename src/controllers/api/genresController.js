const db = require('../../database/models');
const { Genre } = db;

const genresController = {
  list: async (req, res) => {
    try {
      const genres = await Genre.findAll();
      const responseData = {
        status: 200,
        total: genres.length,
        url: 'api/genres',
        data: genres.map(genre => ({
          id: genre.id,
          name: genre.name,
          ranking: genre.ranking,
          active: genre.active,
          created_at: genre.created_at,
          updated_at: genre.updated_at,
        })),
      };
      res.json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener la lista de géneros' });
    }
  },

  detail: async (req, res) => {
    const genreId = req.params.id;

    try {
      const genre = await Genre.findByPk(genreId);
      if (!genre) {
        return res.status(404).json({ error: 'Género no encontrado' });
      }

      const responseData = {
        status: 200,
        data: {
          id: genre.id,
          name: genre.name,
          ranking: genre.ranking,
          active: genre.active,
          created_at: genre.created_at,
          updated_at: genre.updated_at,
        },
      };

      res.json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener detalles del género' });
    }
  },
};

module.exports = genresController;
