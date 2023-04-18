import request from "@/axios/index.js";
export function getUserInfo(userId) {
  return request
    .get("/user/getUserInfo", {
      params: {
        userId,
      },
    })
    .then((res) => {
      return res.data;
    });
}
