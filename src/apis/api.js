import axios from "axios";
export const fetchUser = async () => {
  return await axios.get("https://jsonplaceholder.typicode.com/users/1");
};
