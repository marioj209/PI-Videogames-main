const { Router } = require("express");
const { Videogame } = require("../db");
const { getInfo, getById, getGenres, createVideogame } = require("../controllers/videogames");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/videogame', async (req, res) => {
//   const video = await getAllInfo();

//   res.status(200).json(video)
// })

router.get("/videogame", getInfo);

router.get("/videogame/:id", getById);

router.get("/genre", getGenres);

router.post("/videogame", createVideogame);

router.post("/test", async (req, res) => {
  const { name, image, released, platforms, rating, description, genres } = req.body
  
  const videoGame = await Videogame.create({
    name,
    image,
    released,
    platforms,
    rating,
    description,
  })
  res.send(videoGame);

})



module.exports = router;
