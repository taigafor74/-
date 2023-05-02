import { defineStore } from "pinia";

export const useUploadStore = defineStore({
  id: "upload",

  state: () => ({
    url: "",
    imgUrl: "",
    visible: false,
    isUploadVideo: false,
    file: null,
    isEdit: false,
    editForm: {},
  }),

  actions: {
    setIsUploadVideo(isUploadVideo) {
      this.isUploadVideo = isUploadVideo;
    },
    setFile(file) {
      this.file = file;
    },
    setUrl(url) {
      this.url = url;
    },
    setImgUrl(imgUrl) {
      this.imgUrl = imgUrl;
    },
    setVisible(visible) {
      this.visible = visible;
    },
    resetAll() {
      this.url = "";
      this.imgUrl = "";
      this.visible = false;
      this.isUploadVideo = false;
      this.file = null;
      this.isEdit = false;
      this.editForm = {};
    },
  },
});
