import Http from "./http"; // não precisa de .js

function getToken() {
  return localStorage.getItem("token");
}

export function getMe() {
  return Http.get("/me", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function createUser(
  instagramCode,
  firstName,
  lastName,
  bio,
  birthdayDate
) {
  return Http.post("/users/", {
    code: instagramCode,
    first_name: firstName,
    last_name: lastName,
    bio: bio,
    birthday_date: birthdayDate,
  });
}
