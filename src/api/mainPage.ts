import request from "@/axios/index.js";

export function getVideoList(page = 1, limit = 20) {
  return request
    .get("/videos/getAllVideos", {
      params: {
        page,
        limit,
      },
    })
    .then((res) => {
      return res.data.data;
    });
}
export function getVideo(id) {
  return request.get(`/videos/getVideo/${id}`).then((res) => {
    return res.data.data;
  });
}
export async function getVideos() {
  const res = await request.get("/videos/AllVideos");
  return res.data;
}
