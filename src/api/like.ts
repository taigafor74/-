import request from "@/axios/index.js";
export function setLike(target_id, user_id, type) {
  return request
    .post(`/likes/setLike`, { target_id, user_id, type })
    .then((res) => {
      return res.data.message;
    });
}
export function getLike(id) {
  return request.get(`/likes/getLike/${id}`).then((res) => {
    return res.data.data;
  });
}
export function deleteLike(target_id, user_id, type) {
  return request
    .delete(`/likes/deleteLike/${target_id}/${user_id}/${type}`)
    .then((res) => {
      return res.data.message;
    });
}
export function userLike(id) {
  return request.get(`/likes/userLike/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getCommentLike(id) {
  return request.get(`/likes/getCommentLike/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getActiveLike(id) {
  return request.get(`/likes/getActiveLike/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getCountLikes(id, type) {
  return request.get(`/likes/getLikesChart/${type}/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getTotalLikes(id) {
  return request.get(`/likes/getTotalLikes/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getVideoLikesChart(id, type) {
  return request.get(`/likes/getVideoLikesChart/${type}/${id}`).then((res) => {
    return res.data.data;
  });
}
