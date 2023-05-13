import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail,resetAll } from "../redux/actions";
import { useEffect } from "react";
import style from './Details.module.css'

export default function Details (props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const myVgame = useSelector((state) => state.details);
  

  function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || "";
  }
  
  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(resetAll())
  }, [dispatch, id]);
  console.log(myVgame)

  return (
    <div>
      <div>
        <h1 data-text={myVgame?.name}>{myVgame?.name}</h1>
        <img className={style.img} src={myVgame?.image} alt="Pic not found" />

        <div className={style.container}>
          <h4 className={style.text}>
            <span>Description:</span>
            {stripHtml(myVgame?.description)}
          </h4>
        </div>
        <div className={style.data}>
          <h4 className={style.h4}>
            <div>Rating:</div> {myVgame?.rating}
          </h4>
          <h4 className={style.h4}>
            <div>Realease date:</div> {myVgame?.released}
          </h4>
          <h4>
            <div className={style.titles}>Play on:</div>
            {myVgame?.platforms}
          </h4>
          <h4>
            <div className={style.titles}>Genres:</div>
            {myVgame?.genres?myVgame?.genres:'Genres Not Found'}
          </h4>
        </div>
      </div>

      <Link to="/home">
        <button className={style.btn}>Back</button>
      </Link>
    </div>
  );
}