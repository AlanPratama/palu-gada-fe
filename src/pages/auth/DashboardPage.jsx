import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy
const userData = {
  totalUsers: 1000,
  activeUsers: 750,
  newUsersThisMonth: 50,
};

const postData = {
  totalPosts: 500,
  activePosts: 300,
  completedPosts: 150,
  urgentPosts: 50,
};

const postStatusData = [
  { name: "Aktif", value: 300 },
  { name: "Selesai", value: 150 },
  { name: "Urgent", value: 50 },
];

const categoryData = [
  { name: "Category 1", count: 100 },
  { name: "Category 2", count: 150 },
  { name: "Category 3", count: 80 },
  { name: "Category 4", count: 120 },
  { name: "Category 5", count: 50 },
];

const recentTransactions = [
  { id: 1, user: "John Doe", amount: 500, type: "Payment", date: "2023-06-01" },
  { id: 2, user: "Jane Smith", amount: 1000, type: "Bid", date: "2023-06-02" },
  {
    id: 3,
    user: "Bob Johnson",
    amount: 750,
    type: "Payment",
    date: "2023-06-03",
  },
  { id: 4, user: "Alice Brown", amount: 250, type: "Bid", date: "2023-06-04" },
  {
    id: 5,
    user: "Charlie Davis",
    amount: 1500,
    type: "Payment",
    date: "2023-06-05",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function DashboardPage() {
  return (
    <Card className="p-8 sm:max-w-full max-w-[320px]">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Total Pengguna</p>
            <h4 className="font-bold text-large">{userData.totalUsers}</h4>
          </CardHeader>
        </Card>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Pengguna Aktif</p>
            <h4 className="font-bold text-large">{userData.activeUsers}</h4>
          </CardHeader>
        </Card>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">
              Pengguna baru bulan ini
            </p>
            <h4 className="font-bold text-large">
              {userData.newUsersThisMonth}
            </h4>
          </CardHeader>
        </Card>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Total Postingan</p>
            <h4 className="font-bold text-large">{postData.totalPosts}</h4>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Status Postingan</p>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={postStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {postStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Kategori Teratas</p>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8">
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Transaksi Terkini</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Table aria-label="Recent Transactions">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Pengguna</TableColumn>
              <TableColumn>Jumlah</TableColumn>
              <TableColumn>Tipe</TableColumn>
              <TableColumn>Tanggal</TableColumn>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>
                    Rp {transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </Card>
  );
}
