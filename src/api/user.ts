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
export function getInfo(id) {
  return request.get(`/user/getInfo/${id}`).then((res) => {
    return res.data;
  });
}
export function updateDesc(id, desc) {
  return request.put(`/user/updateDesc`, { id, desc }).then((res) => {
    return res.data;
  });
}
export function updateInfo(form) {
  return request.put(`/user/updateInfo`, form).then((res) => {
    return res.data;
  });
}
export function edit(id, edit) {
  return request.put(`/user/edit/${id}`, { edit }).then((res) => {
    return res.data;
  });
}
