import http from "./HttpService";

const apiEndPoint = "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
