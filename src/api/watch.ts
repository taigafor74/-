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
export function getWatchChart(id, type) {
  return request.get(`/watch/getWatchChart/${type}/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getTotalWatch(id) {
  return request.get(`/watch/getTotalWatch/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getVideoWatchChart(id, type) {
  return request.get(`/watch/getVideoWatchChart/${type}/${id}`).then((res) => {
    return res.data.data;
  });
}
