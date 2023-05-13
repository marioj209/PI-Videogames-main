import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createVideogame } from "../redux/actions";
import style from './VideoGameCreate.module.css'

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name='You must add a Name!'
  } else if (!input.released) {
    errors.released = 'You must add a realeased date!'   
  } else if (!input.description) {
    errors.description='You must add a description!'
  } else if (!input.rating||input.rating < 0 || input.rating > 5) {
    errors.rating='You must add a rating between 0 and 5!'
  } else if (!input.genres.length) {
    errors.genres = 'You must at least add one genre!'
  } else if (!input.platforms.length) {
    errors.platforms='You must at least add one platform!'
  }
  return errors
}

export default function VideoGameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});
  
  
  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    genres: [],
  });
  
  const platforms = [
    "PC",
    "PlayStation 5",
    "Xbox One",
    "PlayStation 4",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
  ];
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
      ...input,
      [e.target.name]:e.target.value
    }))
    console.log(input);
  }


  function handlePlatforms(e) {
    console.log('Platforms',e.target.value)
      setInput({
        ...input,
        platforms: [...input.platforms,e.target.value],
      });
    
  }

  function handleGenres(e) {
    console.log("Genres: ", e.target.value);
    if(!input.genres.includes(e.target.value))
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleGenresDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter(g => g !== e)
    })
  }
  function handlePlatformsDelete(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter(g=> g !== e)
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, description, released, rating, platforms, image } = input
    if (name && description && released && rating && image && platforms.length) {

      if (typeof input.image === "string") {
        const ima = input.image.slice(0, 5);

        if(!platforms.length)return alert('At least you must add one platform!')

        //if (input.genres.length > 4) return alert("Only 4 genres")
        
        if(!input.rating||input.rating<0||input.rating>5)return alert("You must add a rating between 0 and 5!");

        if (ima !== "https") {
          return alert("image must be https")

        } else {
          
          dispatch(createVideogame(input));
          alert("Videogames added succesfully");
          setInput({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: 0,
            platforms: [],
            genres: [],
          });
          history.push("/home");
        }
      }
    } else {
      return alert('You must complete the form')
        }
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
 

  return (
    <div>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <h2>Add your Videogame</h2>
        <div>
          <label>
            <h3>Name</h3>{" "}
          </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className={style.errors}>{errors.name}</p>}
        </div>
        <div>
          <label>
            <h3>Released date</h3>{" "}
          </label>
          <input
            type="text"
            value={input.released}
            name="released"
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
          />
          {errors.released && <p className={style.errors}>{errors.released}</p>}
        </div>
        <div>
          <label>
            <h3>Image</h3>
          </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            <h3>Description</h3>
          </label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={handleChange}
          />
          {errors.description && (
            <p className={style.errors}>{errors.description}</p>
          )}
        </div>
        <div>
          <label>
            <h3>Rating</h3>
          </label>
          <input
            type="text"
            value={input.rating}
            name="rating"
            onChange={handleChange}
          />
          {errors.rating && <p className={style.errors}>{errors.rating}</p>}
        </div>
        <div>
          <label>
            <h3 className={style.title}>Genres</h3>
          </label>
          <select className={style.select} onChange={(e) => handleGenres(e)}>
            <option hidden></option>
            {genres.map((e, i) => (
              <option value={e.name} key={i}>
                {e.name}
              </option>
            ))}
          </select>
          <ul>
            <li className={style.list}>
              {input.genres.map((g) => (
                <div className={style.div} key={g}>
                  <p>{g}</p>
                  <button
                    className={style.btnX}
                    onClick={() => handleGenresDelete(g)}
                  >
                    x
                  </button>
                </div>
              ))}
            </li>
          </ul>
          {errors.genres && <p className={style.errors}>{errors.genres}</p>}
        </div>
        <div>
          <label>
            <h3 className={style.title}>Platforms</h3>
          </label>
          <select className={style.select} onChange={(e) => handlePlatforms(e)}>
            <option hidden></option>
            {platforms.map((p) => (
              <option value={p} key={p}>
                {p}
              </option>
            ))}
          </select>
          <ul>
            <li className={style.list}>
              {input.platforms.map((p) => (
                <div className={style.div} key={p}>
                  <p>{p}</p>
                  <button
                    className={style.btnX}
                    onClick={() => handlePlatformsDelete(p)}
                  >
                    x
                  </button>
                </div>
              ))}
            </li>
          </ul>
          {errors.platforms && (
            <p className={style.errors}>{errors.platforms}</p>
          )}
        </div>
        <div>
          <button className={style.submit} type="submit">
            Add Videogame
          </button>
        </div>
        <div>
          <Link to="/home">
            <button className={style.back}>Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
