import request from "@/axios/index.js";
export function setLike(video_id, user_id) {
  return request.post(`/likes/setLike`, { video_id, user_id }).then((res) => {
    return res.data.message;
  });
}
export function getLike(id) {
  return request.get(`/likes/getLike/${id}`).then((res) => {
    return res.data.data;
  });
}
export function deleteLike(video_id, user_id) {
  return request
    .delete(`/likes/deleteLike/${video_id}/${user_id}`)
    .then((res) => {
      return res.data.message;
    });
}
