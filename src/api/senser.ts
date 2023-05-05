import request from "@/axios/index.js";
export async function getAllSenser() {
  const res = await request.get("/senser/getAllSenser");
  return res.data;
}
