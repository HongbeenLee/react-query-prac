import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { repoData } from "../apis";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Home: NextPage = () => {
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["repoData"],
    repoData
  );

  if (isLoading) return <div>Loading...🎃</div>;

  if (isError) return <div>An error has occurred...</div>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{data.name}</h1>
        <p className={styles.description}>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong>{" "}
        <strong>✨ {data.stargazers_count}</strong>{" "}
        <strong>🍴 {data.forks_count}</strong>
        <div>{isFetching ? "Updating...👻" : ""}</div>
      </main>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default Home;
