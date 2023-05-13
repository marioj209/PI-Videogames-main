import axios from "axios";

export function getVideoGames() {
  return async function (dispatch) {
    var json=await axios.get("http://localhost:3001/videogame")
      return dispatch({
          type: "GET_VIDEOGAMES",
          payload: json.data,
        });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/videogame?name=${name}`);
    return dispatch({
      type: "SEARCH_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genre");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/videogame/${id}`);
    return dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}

export function createVideogame(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/videogame",
      payload
    );
    return response;
  };
}

export function filteredGenres(payload) {
  console.log(payload);
  return {
    type: "FILTER_GENRES",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function resetAll(payload) {
  return {
    type: 'RESET_ALL',
    payload
  }
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPoints(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}
