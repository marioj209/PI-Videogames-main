import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={style.body}>
      <h1 data-text="Welcome"className={style.h1}>Welcome </h1>
      <Link to='/home'>
        <button className={style.btn}>Access </button>
      </Link>
    </div>
  )
}