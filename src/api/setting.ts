import request from "@/axios/index.js";

export function getSettingVideo() {
  return request.get(`/setting/getMainVideo`).then((res) => {
    return res.data.data;
  });
}
export async function getTitle() {
  const res = await request.get("/setting/getTitle");
  return res.data;
}
