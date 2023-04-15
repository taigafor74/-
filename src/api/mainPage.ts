import request from "@/axios/index.js";
export function getVideoList() {
  return request.get("/videos/getAllVideos").then((res) => {
    return res.data.data;
  });
}
export function getVideo(id) {
  return request.get(`/videos/getVideo/${id}`).then((res) => {
    return res.data.data;
  });
}
