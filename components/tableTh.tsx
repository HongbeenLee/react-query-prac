type Props = {
  name: string;
};

export const TableTh = (props: Props) => {
  const { name } = props;

  return (
    <th
      style={{
        backgroundColor: "#c49898",
      }}
    >
      {name}
    </th>
  );
};
