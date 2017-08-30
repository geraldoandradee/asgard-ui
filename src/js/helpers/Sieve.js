import DialogStore from "../stores/DialogStore";

const Sieve = {
  navigateTo: function (path) {
    location.href = path;
  },
  DialogStore: DialogStore
};

export default Sieve;
