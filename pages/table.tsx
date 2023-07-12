import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "../components/table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const Checkbox = () => (
  <div
    style={{
      textAlign: "center",
    }}>
    <input
      type="checkbox"
      style={{
        width: 22,
        height: 22,
      }}></input>
  </div>
);

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status:
      "In Relationship-In Relationship-In Relationship-In Relationship-In Relationship-In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columns: ColumnDef<Person, any>[] = [
  {
    id: "checkbox",
    header: Checkbox,
    cell: Checkbox,
  },
  {
    id: "firstName",
    header: "이름-(성)",
  },
  {
    id: "lastName",
    header: "이름",
  },
  {
    id: "age",
    header: "나이",
  },
  {
    id: "visits",
    header: () => (
      <>
        Visits<button>✈️</button>
      </>
    ),
  },
  {
    id: "status",
    header: "Status!",
  },
  {
    id: "progress",
    header: "Profile Progress",
  },
];

function TablePage() {
  return (
    <>
      <h2>Basic</h2>
      <Table<Person> dataSource={defaultData} columns={columns} />
      <h2>Column Resizing</h2>
      <Table.Resize<Person> dataSource={defaultData} columns={columns} />
    </>
  );
}

export default TablePage;
