import request from "@/axios/index.js";

export function getSettingVideo() {
  return request.get(`/setting/getMainVideo`).then((res) => {
    return res.data.data;
  });
}
