type Props = {
  name?: string;
  children?: React.ReactNode;
  style?: object;
};

export const TableTd = (props: React.PropsWithChildren<Props>) => {
  const { name, children, style } = props;

  return (
    <td
      style={{
        textAlign: "center",
        // padding: "0 10px",
        ...style,
      }}
    >
      {name}
      {children}
    </td>
  );
};
