import request from "@/axios/index.js";
export function postComment(
  video_id,
  user_id,
  content,
  user_name,
  parent_id = null,
  reply_comment_id = null,
  replyToWho = null,
  reply_to_id = null
) {
  const requestData = { video_id, user_id, content, user_name, reply_to_id };
  console.log(requestData);

  if (parent_id) {
    requestData.parent_id = parent_id;
  }
  if (reply_comment_id) {
    requestData.reply_comment_id = reply_comment_id;
  }
  if (replyToWho) {
    requestData.replyToWho = replyToWho;
  }
  return request.post(`/comment/postComment`, requestData).then((res) => {
    return res.data;
  });
}
export function getComment(id) {
  return request.get(`/comment/getComment/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getReply(id) {
  return request.get(`/comment/getReply/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getByCommentId(id) {
  return request.get(`/comment/getByCommentId/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getCommentsChart(id, type) {
  return request.get(`/comment/getCommentsChart/${type}/${id}`).then((res) => {
    return res.data.data;
  });
}
export function getTotalComment(id) {
  return request.get(`/comment/getTotalComment/${id}`).then((res) => {
    return res.data.data;
  });
}
