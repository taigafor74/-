import request from "@/axios/index.js";
export function setWatch(obj) {
  return request.post("/watch/setWatch", obj).then((res) => {
    return res.data;
  });
}
export function getWatch(id) {
  return request.get(`/watch/getWatch/${id}`).then((res) => {
    return res.data;
  });
}
