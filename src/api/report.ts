import request from "@/axios/index.js";
export function setReport(form) {
  return request.post(`/report/setReport`, form).then((res) => {
    return res.data;
  });
}
