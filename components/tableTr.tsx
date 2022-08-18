import { TableTd } from "./tableTd";

type Props = {
  number: string;
  repo: {
    id: string;
    name: string;
    description: string;
    language: string;
    forks_count: string;
    url: string;
    homepage: string;
  };
};

export const TableTr = (props: Props) => {
  const { number, repo } = props;

  return (
    <tr
      key={repo.id}
      style={{
        border: "1px solid gray",
        height: "100px",
        backgroundColor: "antiquewhite",
      }}
    >
      <TableTd name={number}></TableTd>
      <TableTd>
        <a href={repo.url}>{repo.name}</a>
      </TableTd>
      <TableTd name={repo.description}></TableTd>
      <TableTd name={repo.language}></TableTd>
      <TableTd name={`${repo.forks_count} 🍴`}></TableTd>
      <TableTd>
        <a href={repo.homepage}>{repo.homepage}</a>
      </TableTd>
    </tr>
  );
};
