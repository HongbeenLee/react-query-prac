import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { repoList } from "../apis";

export const Infinity = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { ref, inView } = useInView();
  const pageParamRef = useRef(1);
  const hasNextRef = useRef(true);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useInfiniteQuery(
    ["repos"],
    async ({ pageParam = 1 }) => {
      const res = await repoList(pageParam);
      const { link } = res.headers;

      // link에서 last가 없으면 마지막! 정규식으로 last찾기
      hasNextRef.current = link.match(/last/g) ? true : false;
      pageParamRef.current = pageParamRef.current + 1;

      return res.data;
    },
    {
      getNextPageParam: () => {
        // 어떻게 네트워크 요청이 멈추는 것인가...
        // undefined로 반환하면 알아서 멈추는것인가???
        return hasNextRef.current ? pageParamRef.current : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      // 얘는 무슨 일을 하는것인가...
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div>
      <h1>Infinite Loading</h1>
      {status === "loading" ? (
        <p>Loading...🎃</p>
      ) : status === "error" ? (
        <span>{`Error: ${error.message} ⚠️`}</span>
      ) : (
        <>
          {data.pages?.map((page) =>
            page?.map((repo) => (
              <div
                key={repo.id}
                style={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  padding: "5rem 1rem",
                  margin: "20px 20px 0 20px",
                  background: `hsla(${repo.id * 30}, 60%, 80%, 1)`,
                }}
              >
                <h3>{repo.name}</h3>
                <p key={repo.id}>{repo.description}</p>
              </div>
            ))
          )}
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div>
          {isFetching && isFetchingNextPage && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "30%",
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "2rem 1rem",
                backgroundColor: "gray",
              }}
            >
              Background Updating...
            </div>
          )}
        </>
      )}
      <hr />
    </div>
  );
};
