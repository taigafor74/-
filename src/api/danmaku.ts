import request from "@/axios/index.js";
export function geDanmakuByvid(vid) {
  return request.get("/danmaku/getDanmaku/" + vid).then((res) => {
    return res.data.data;
  });
}
