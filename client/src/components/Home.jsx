import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoGames,
  filterCreated,
  orderByName,
  orderByPoints,
  filteredGenres,
  getGenres,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVGames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [vGamesPerPage, setVGamesPerPage] = useState(15);
  const indexOfLastVGames = currentPage * vGamesPerPage;
  const indexOfFirstVGames = indexOfLastVGames - vGamesPerPage;
  const currentVGames = allVGames.slice(indexOfFirstVGames, indexOfLastVGames);

  //console.log()

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideoGames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideoGames());
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleFilter(e) {
    e.preventDefault();
    dispatch(filteredGenres(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleSortRating(e) {
    e.preventDefault();
    dispatch(orderByPoints(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  return (
    <div>
      <nav className={style.navBar}>
        <Link to="/videogame">
          <button className={style.btn}>Add your favorite VideoGame</button>
        </Link>
        <div>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
            className={style.btn}
          >
            Reload
          </button>
        </div>
        <div>
          <select className={style.select} onChange={(e) => handleSort(e)}>
            <option hidden>Order By: </option>
            <option className={style.option} value="asc">
              Ascending Order
            </option>
            <option className={style.option} value="desc">
              Descending Order
            </option>
          </select>
        </div>
        <div>
          <select
            className={style.select}
            onChange={(e) => handleSortRating(e)}
          >
            <option hidden>Order By: </option>
            <option className={style.option} value="high">
              Highest Rating
            </option>
            <option className={style.option} value="low">
              Lowest Rating
            </option>
          </select>
        </div>

        <div>
          <b>Filter by Genres </b>
          <select className={style.select} onChange={(e) => handleFilter(e)}>
            <option className={style.option} value="All">
              All
            </option>
            {allGenres?.map((g, i) => (
              <option className={style.option} value={g.name} key={i}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <b>Filter Created </b>
          <select
            className={style.select}
            onChange={(e) => handleFilterCreated(e)}
          >
            <option className={style.option} value="All">
              All
            </option>
            <option className={style.option} value="created">
              Created
            </option>
            <option className={style.option} value="api">
              API
            </option>
          </select>
        </div>
      </nav>
      <h1 data-text="VideoGames App">VideoGames App</h1>
      <SearchBar />
      <div>
        {currentVGames &&
          currentVGames.map((e) => {
            return (
              <div className={style.card} key={e.id}>
                <div className="animate__animated animate__fadeInTopLeft">
                  <Link to={"/home/" + e.id}>
                    <Card
                      name={e.name}
                      image={e.image}
                      rating={e.rating}
                      genres={e.genres}
                      id={e.id}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      <Paginado
        vGamesPerPage={vGamesPerPage}
        allVGames={allVGames.length}
        paginado={paginado}
      />
    </div>
  );
}
