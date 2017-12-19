import DialogStore from "../stores/DialogStore";
import ajaxWrapper from "../helpers/ajaxWrapper";

const Sieve = {
  navigateTo: function (path) {
    location.href = path;
  },
  DialogStore: DialogStore,
  ajaxWrapper: ajaxWrapper
};

export default Sieve;
