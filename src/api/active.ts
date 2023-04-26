import request from "@/axios/index.js";
export function postActive(formData) {
  return request
    .post("/active/postActive", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
}
export function getAllActive() {
  return request.get("/active/getAllActive").then((res) => {
    return res.data.data;
  });
}
export function shareActive(form) {
  return request.post("/active/shareActive", form).then((res) => {
    return res.data;
  });
}
export function getActive(id) {
  return request.get("/active/getActive/" + id).then((res) => {
    return res.data.data;
  });
}
export function getActiveByUserId(id) {
  return request.get("/active/getActiveByUserId/" + id).then((res) => {
    return res.data.data;
  });
}
