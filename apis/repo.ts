import axios from "axios";

export const repoData = () => axios
  .get("https://api.github.com/repos/tannerlinsley/react-query")
  .then((res) => res.data);
