import axios from "axios";

export const repoData = () =>
  axios
    .get("https://api.github.com/repos/tannerlinsley/react-query")
    .then((res) => res.data);

export const repoList = async (pageParam: number) => {
  const res = await axios.get(
    `https://api.github.com/users/tannerlinsley/repos?page=${pageParam}&per_page=30`
  );

  return res;
};
