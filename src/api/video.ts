import request from "@/axios/index.js";
export function getVideoByUser(id) {
  return request.get(`/videos/getVideoByUser/${id}`).then((res) => {
    return res.data;
  });
}
export function getVideoAllByUser(id) {
  return request.get(`/videos/getVideoAllByUser/${id}`).then((res) => {
    return res.data;
  });
}
export function getVideoByArea(area) {
  return request.get(`/videos/getVideoByArea/${area}`).then((res) => {
    return res.data.data;
  });
}
export function getHot(area) {
  return request.get(`/videos/getHot/${area}`).then((res) => {
    return res.data.data;
  });
}
