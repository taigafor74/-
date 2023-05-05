import request from "@/axios/index.js";
export function setReport(form) {
  return request.post(`/report/setReport`, form).then((res) => {
    return res.data;
  });
}
export function getReport(userId) {
  return request.get(`/report/getReportByUser/${userId}`).then((res) => {
    return res.data;
  });
}
