import Http from "./http"; // não precisa de .js

function getToken() {
  return localStorage.getItem("token");
}

export function listMovies(pageNumber) {
  return Http.get(`/movies/?page=${pageNumber}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function likeMovie(id, like) {
  return Http.post(
    "/likes/",
    {
      movie: id,
      like: like,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}
