import request from "@/axios/index.js";
export function login(loginForm) {
  return request
    .post("/user/login", loginForm, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    });
}
