import http from "../services/HttpService";

const apiEndPoint = "/genres";

export function getGenres() {
  return http.get(apiEndPoint);
}
