import axios from "axios";

export const repoData = () =>
  axios
    .get("https://api.github.com/repos/tannerlinsley/react-query")
    .then((res) => res.data);

export const repoList = async (pageParam: number) => {
  const res = await axios.get(
    `https://api.github.com/users/facebook/repos?page=${pageParam}&per_page=20`,
    {
      headers: {
        Authorization: "token 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",
      },
    }
  );

  return res;
};
