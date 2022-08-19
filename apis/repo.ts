import axios from "axios";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export const repoData = () =>
  axios
    .get("https://api.github.com/repos/tannerlinsley/react-query")
    .then((res) => res.data);

export const repoList = async (pageParam: number) => {
  const res = await axios.get(
    `https://api.github.com/users/facebook/repos?page=${pageParam}&per_page=20`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }
  );

  return res;
};
