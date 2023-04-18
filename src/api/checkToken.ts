import request from "@/axios/index.js";
export async function checkToken() {
  try {
    const res = await request.get("/user/checkToken", {
      withCredentials: true,
    });
    return res.data.valid;
  } catch (err) {
    console.error(err);
    return false;
  }
}
