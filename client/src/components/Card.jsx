import React from "react";
import style from'./Card.module.css'

export default function Card({ name, image, genres, rating }) {
  return (
    <div>
      <h3 className={style.h3}>{name}</h3>
      <img className={style.img} src={image?image:require('../image/videogame.png')} alt={"Pic not found"} />
      <h5 className={style.h5}>
        Genres: {genres ? genres + " " : "genres not found"}
      </h5>
      <h5 className={style.h5}>Rating: {rating}</h5>
    </div>
  );
}