const initialState = {
  videogames: [],
  allVideoGames: [],
  genres: [],
  details: [],
  platforms:[]
};

function rootReducer(state=initialState,action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideoGames: action.payload,
      };

    case "FILTER_CREATED":
      const allVideoGame = state.allVideoGames;
      const createdFilter =
        action.payload === "created"
          ? allVideoGame.filter((e) => e.createdInDb)
          : allVideoGame.filter((f) => !f.createdInDb);
      return {
        ...state,
        videogames: action.payload === "All" ? allVideoGame : createdFilter,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: sortedArr,
      };

    case "ORDER_BY_RATING":
      
      let sortedRating =
        action.payload === "high" ?
          state.videogames.sort(function (a, b){
            return b.rating - a.rating;
          }) : state.videogames.sort(function (a, b) {
            return a.rating-b.rating
          })
          
      return {
        ...state,
        videogames: sortedRating,
      };

    case "SEARCH_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        details: action.payload,
      };
    case "FILTER_GENRES":
      const allVideogames = state.allVideoGames;
      const filtered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((f) => f.genres.includes(action.payload));
      return {
        ...state,
        videogames: [...filtered],
      };
    case 'RESET_ALL':
      return {
        ...state,
        details: []
      }
      

    default:
      return state;
  }
}


export default rootReducer;