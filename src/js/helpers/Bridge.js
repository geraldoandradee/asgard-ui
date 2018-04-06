import DialogStore from "../stores/DialogStore";

const Bridge = {
  navigateTo: function (path) {
    location.href = path;
  },
  DialogStore: DialogStore
};

export default Bridge;
