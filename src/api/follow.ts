import request from "@/axios/index.js";
export function getFollows(id) {
  return request.get(`/user/getFollow/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getFans(id) {
  return request.get(`/user/getFans/${id}`).then((res) => {
    return res.data.data;
  });
}

export function follow(follower, followed) {
  return request.post(`/user/follow`, { follower, followed }).then((res) => {
    return res.data.message;
  });
}
export function unfollow(follower, followed) {
  return request.post(`/user/unfollow`, { follower, followed }).then((res) => {
    return res.data.message;
  });
}
export function updateFollow(store, followed, boolean) {
  if (boolean) {
    store.followArr.push(followed);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: store.id,
        uname: store.uname,
        avatar: store.avatar,
        followArr: store.followArr,
      })
    );
  } else {
    store.followArr = store.followArr.filter((item) => item !== followed);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: store.id,
        uname: store.uname,
        avatar: store.avatar,
        followArr: store.followArr,
      })
    );
  }
}
export function getCountFollowers(id, type) {
  return request.get(`/user/getCountFollowers/${type}/${id}`).then((res) => {
    return res.data.data;
  });
}
