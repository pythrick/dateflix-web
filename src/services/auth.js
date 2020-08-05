import Http from "./http"; // não precisa de .js

export function getToken(instagramCode) {
  return Http.post("/token/", { code: instagramCode });
}
