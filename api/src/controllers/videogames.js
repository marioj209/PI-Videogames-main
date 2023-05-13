const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { Op } = require('sequelize');

/*Funciones que busca por nombre y trae toda la info de la ruta principal*/



async function  getInfo  (req, res) {
  const { name } = req.query;
  try {
    if (name) {
      let gamesDB = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike] : "%" + name + "%"
      }
        },
        include: {
          model: Genre,
          attributes: ['name'],
          through:{attributes:[]}
        }
      });
      
      if (gamesDB) {
        gameDB = gamesDB.map(g => {
          let gen = []
          for (let i = 0; i < g.genres.length; i++){
            gen.push(g.genres[i].name)
          }
          return {
            id: g.id,
            name: g.name,
            image: g.image,
            genres: gen.toString(),
            rating: g.rating,
          }
        })
        let gamesAPI = await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
        );
        gamesAPIFull = gamesAPI.data.results.map((e) => {
          var game = {
            id: e.id,
            name: e.name,
            rating: e.rating,
            image: e.background_image,
            genres:
            e.genres &&
            e.genres
            .map((p) => p.name)
            .filter((p) => p != null)
            .join(", "),
          };
          return game;
        });
        gamesAPIFull = gamesAPIFull.filter(f => f.name.toLowerCase().includes(name.toLowerCase()));
        res.json(gamesAPIFull.concat(gameDB));
      } else {
        let gamesAPI = await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
        );
        gamesAPIFull = gamesAPI.data.results.map((e) => {
          var game = {
            id: e.id,
            name: e.name,
            rating: e.rating,
            image: e.background_image,
            genres:
              e.genres &&
              e.genres
                .map((p) => p.name)
                .filter((p) => p != null)
                .join(", "),
          };
          return game;
        });
        res.json(gamesAPIFull);
      }
    } else {
      let gamesResults = [];
      let apiRAWG = `https://api.rawg.io/api/games?key=${API_KEY}`;
      for (let i = 0; i < 5; i++) {
        let games = (await axios.get(apiRAWG)).data;
        let dataGame = games.results.map((e) => {
          var game = {
            id: e.id,
            name: e.name,
            image: e.background_image,
            rating: e.rating,
            genres: e.genres
              .map((g) => g.name)
              .filter((f) => f != null)
              .join(", "),
          };
          return game;
        });
        apiRAWG = games.next;
        gamesResults = gamesResults.concat(dataGame);
      }

      let dbGames = await Videogame.findAll({ include: [Genre] });
      let jsonGames = dbGames.map((J) => J.toJSON());
      jsonGames.forEach((C) => {
        C.genres = C.genres
          .map((genre) => genre.name)
          .filter((p) => p != null)
          .join(", ");
      });
      gamesResults = gamesResults.concat(jsonGames);

      res.json(gamesResults);
    }
  } catch (error) {
    console.log(error);
  }
}

/*Funcion de busqueda por ID*/

async function getById (req, res) {
  const { id } = req.params;
  try {
    if (id.includes("-")) {
      let dbID = await Videogame.findByPk(id,{
        include: {
          model: Genre,
          attributes: ["name"],
          thougth: { attributes: [] },
        },
      });
      let e = dbID
      const information = {
        id: e.id,
        name: e.name,
        image: e.image,
        rating: e.rating,
        description: e.description,
        released: e.released,
        platforms: e.platforms,
        createdAt: e.createdAt,
        updateAt: e.updatedAt,
        genres: e.genres.map(e=>e.name).join(', ')
      }
      res.status(200).send(information)
    } else if (id) {
      const games = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      //console.log(data)
      const e = games.data;
      const info = {
        id: e.id,
        name: e.name,
        rating: e.rating,
        image: e.background_image,
        released: e.released,
        description: e.description,
        platforms: e.platforms
          ? e.platforms
            .map((p) => p.platform.name)
            .filter((f) => f.name !== null)
            .join(", ")
          : "Platforms not found",
        genres:
          e.genres &&
          e.genres
            .map((g) => g.name)
            .filter((f) => f.name !== null)
            .join(", "),
      };
      return res.status(200).json(info);
    }
  } catch (error) {
    res.status(400).send("Game not found");
  }
};

/*Funcion que trae todos los generos de la Api y los crea en Db */

async function getGenres(req, res) {
  try {
    const genApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const allGenres = genApi.data.results;
    //console.log(allGenres);
    allGenres.forEach((e) => {
      Genre.findOrCreate({
        where: { name: e.name },
      });
    });
    const DbGenres = await Genre.findAll();
    res.status(200).json(DbGenres);
  } catch (error) {
    res.status(400).send("Genres not found");
  }
}

/* Funcion para crear un videojuego */
async function createVideogame(req, res) {
  const { name, description, image, released, rating, platforms, genres } =
    req.body;
  let platform = platforms.toString();
  let gameCreated = await Videogame.create({
    name,
    description,
    image,
    released,
    rating,
    platforms:platform,
  });

  let genreDb = await Genre.findAll({
    where: { name: genres },
  });
  gameCreated.addGenre(genreDb);
  res.send("Videogame created successfully!");
}



module.exports = {
  getInfo,
  getById,
  getGenres,
  createVideogame,
};
