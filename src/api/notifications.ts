import request from "@/axios/index.js";

export function getNotice(id, type) {
  return request.get(`/notice/getNotice/${id}/${type}`).then((res) => {
    return res.data.data;
  });
}
export function getLike(id) {
  return request.get(`/notice/getLike/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getComment(id) {
  return request.get(`/notice/getComment/${id}`).then((res) => {
    return res.data.data;
  });
}
