import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { repoList } from "../apis";
import { TableTh } from "./tableTh";
import { TableTr } from "./tableTr";

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
      console.log(pageParam);
      const res = await repoList(pageParam);
      // console.log(res);
      const { link } = res.headers;

      // link에서 last가 없으면 마지막 페이지 -> 정규식으로 last찾기
      hasNextRef.current = link.match(/last/g) ? true : false;
      pageParamRef.current = pageParamRef.current + 1;

      return {
        results: res.data,
        nextPage: pageParam + 1,
        hasNext: link.match(/last/g) ? true : false,
      };
    },
    {
      getNextPageParam: (pageParam, pages) => {
        return pageParam.hasNext ? pageParam.nextPage : undefined;
      },
    }
  );
  console.log(data);
  useEffect(() => {
    if (inView) {
      // 얘는 무슨 일을 하는것인가...
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div>
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          color: "navy",
        }}
      >
        Repositories By Meta ♾
      </h1>
      <table
        style={{
          width: "100%",
          padding: "20px",
          position: "relative",
          tableLayout: "fixed",
          wordBreak: "break-all",
          height: "auto",
        }}
      >
        <colgroup>
          <col width="4%" />
          <col width="10%" />
          <col width="20%" />
          <col width="8%" />
          <col width="6%" />
          <col width="10%" />
        </colgroup>
        <thead style={{ position: "sticky", top: "0px", height: "50px" }}>
          <tr>
            <TableTh name="No."></TableTh>
            <TableTh name="Repo Name 👾"></TableTh>
            <TableTh name="Description ✏️"></TableTh>
            <TableTh name="Language 💬"></TableTh>
            <TableTh name="Forks 🍴"></TableTh>
            <TableTh name="Homepage 🏠"></TableTh>
          </tr>
        </thead>
        <tbody>
          {status === "loading" ? (
            <tr style={{ width: "100%" }}>
              <td>Loading...🎃</td>
            </tr>
          ) : status === "error" ? (
            <tr style={{ width: "100%" }}>
              <td>{`Error: ${error.message} ⚠️`}</td>
            </tr>
          ) : (
            <>
              {data.pages.map((page, perTwenty) =>
                page.results.map((repo, index) => {
                  const number = perTwenty * 20 + index + 1;
                  return (
                    <TableTr key={number} number={number} repo={repo}></TableTr>
                  );
                })
              )}
            </>
          )}
        </tbody>
      </table>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div ref={ref} style={{ fontSize: "20px" }}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage || "Nothing more to load"}
        </div>
      </div>
      {isFetching && isFetchingNextPage && (
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "40%",
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "2rem 1rem",
            backgroundColor: "gray",
          }}
        >
          Background Updating...
        </div>
      )}
      <hr />
    </div>
  );
};
