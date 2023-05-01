import request from "@/axios/index.js";
export function setCollect(video_id, user_id) {
  return request
    .post(`/collect/setCollect`, { video_id, user_id })
    .then((res) => {
      return res.data.message;
    });
}
export function getCollect(id) {
  return request.get(`/collect/getCollect/${id}`).then((res) => {
    return res.data.data;
  });
}
export function deleteCollect(video_id, user_id) {
  return request
    .delete(`/collect/deleteCollect/${video_id}/${user_id}`)
    .then((res) => {
      return res.data.message;
    });
}
export function getCollectChart(id, type) {
  return request.get(`/collect/getCollectChart/${type}/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getTotalCollect(id) {
  return request.get(`/collect/getTotalCollect/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getCollectionVideo(id) {
  return request.get(`/collect/getCollectionVideo/${id}`).then((res) => {
    return res.data.data;
  });
}
