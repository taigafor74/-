import request from "@/axios/index.js";
export function postComment(
  video_id,
  user_id,
  content,
  user_name,
  parent_id = null,
  reply_comment_id = null,
  replyToWho = null
) {
  const requestData = { video_id, user_id, content, user_name };
  if (parent_id) {
    requestData.parent_id = parent_id;
  }
  if (reply_comment_id) {
    requestData.reply_comment_id = reply_comment_id;
  }
  if (replyToWho) {
    requestData.replyToWho = replyToWho;
  }
  console.log(requestData);

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
