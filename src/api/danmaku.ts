import request from "@/axios/index.js";
export function geDanmakuByvid(vid) {
  return request.get("/danmaku/getDanmaku/" + vid).then((res) => {
    return res.data.data;
  });
}
export function postDanmaku(form) {
  return request.post("/danmaku/setDanmaku", form).then((res) => {
    return res.data;
  });
}
export function getFormatDanmaku(vid) {
  return request.get("/danmaku/getFormatDanmaku/" + vid).then((res) => {
    return res.data.data;
  });
}
export function getVideoDanmakuChart(id, type) {
  return request
    .get(`/danmaku/getVideoDanmakuChart/${type}/${id}`)
    .then((res) => {
      return res.data.data;
    });
}
