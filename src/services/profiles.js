import Http from "./http"; // não precisa de .js

function getToken() {
  return localStorage.getItem("token");
}

export function listProfiles(movieId) {
  return Http.get(`/profiles?movie_id=${movieId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
