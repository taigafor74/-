import request from "@/axios/index.js";

export function getSearch(keyword) {
  return request.get(`/search/getSearch/${keyword}`).then((res) => {
    return res.data;
  });
}
