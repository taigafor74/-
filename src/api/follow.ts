import request from "@/axios/index.js";
export function getFollows(id) {
  return request.get(`/user/getFollow/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getFans(id) {
  return request.get(`/user/getFans/${id}`).then((res) => {
    return res.data.data;
  });
}
