import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ vGamesPerPage, allVGames, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVGames / vGamesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
      <nav>
        <ul className={style.paginado}>
          {pageNumbers &&
            pageNumbers.map((number) => {
              return (
                <li key={number}>
                  <a
                    href={`#page${number}`}
                    className={style.a}
                    onClick={() => paginado(number)}
                  >
                    {number}
                  </a>
                </li>
              );
            })}
        </ul>
      </nav>
  )
}
