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
export function updateAvatar(formData) {
  return request
    .put("/user/updateAvatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
}
