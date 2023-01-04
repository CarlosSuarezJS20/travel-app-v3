import axios from "axios";

const instance = axios.create({
  baseURL: "https://budget-world-reactjs.firebaseio.com/",
  header: {
    "Content-type": "application/json",
  },
});

export default instance;
