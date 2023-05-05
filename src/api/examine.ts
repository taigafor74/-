import request from "@/axios/index.js";

export function getUserExamines(id) {
  return request.get("/examine/getUserExamines/" + id).then((res) => {
    return res.data.data;
  });
}
