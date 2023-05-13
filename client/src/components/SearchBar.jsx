import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getByName } from "../redux/actions";
import style from './SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name)
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(name));
  }

  return (
    <div>
      <input
        className={style.container}
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button className={style.btn} type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}