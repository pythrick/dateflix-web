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

export function likeProfile(movieId, profileId, like) {
  return Http.post(
    `/profile-likes/`,
    {
      movie: movieId,
      to_user: profileId,
      like: like,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}
