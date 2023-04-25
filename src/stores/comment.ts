import { defineStore } from "pinia";

export const useCommentStore = defineStore({
  id: "comment",

  state: () => ({
    comments: [],
    showReply: false,
    replyTo: "",
    commentType: "main",
    parrentId: "",
    uname: "",
    replyToWho: "",
    replyComment: {},
    replyToId: "",
  }),

  actions: {
    setComments(comment) {
      this.comments.push(comment);
    },
    resetAll() {
      this.showReply = false;
      this.replyTo = "";
      this.commentType = "main";
      this.parrentId = "";
      this.uname = "";
      this.replyToWho = "";
      this.replyToId = "";
    },
  },
});
