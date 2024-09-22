import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dashboardService } from "../../services/dashboardService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    totalBids: 0,
    totalBidsAmount: 0,
    averageBidAmount: 0,
    totalIncome: 0,
    incomeByMonthData: [],
    totalUsers: 0,
    newUsersThisMonth: 0,
    totalPosts: 0,
    postStatusData: [],
    postsByMonthData: [],
  });

  const [loading, setLoading] = useState(true);

  const { items: users } = useSelector((state) => state.users);
  const { items: posts } = useSelector((state) => state.posts);
  const { items: bids } = useSelector((state) => state.bids);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (users.length <= 0) {
        setLoading(true);
        await dashboardService.getAllUsers();
      }
      if (posts.length <= 0) {
        setLoading(true);
        await dashboardService.getAllPosts();
      }
      if (bids.length <= 0) {
        setLoading(true);
        await dashboardService.getAllBids();
      }

      const acceptedOrFinishedBids =
        dashboardService.filterAcceptedOrFinishedBids(bids);

      setDashboardData({
        totalBids: dashboardService.calculateTotalBids(bids),
        totalBidsAmount: dashboardService.calculateTotalBidAmount(bids),
        averageBidAmount: dashboardService.calculateAverageBidAmount(bids),
        totalIncome: dashboardService.calculateTotalIncome(
          acceptedOrFinishedBids
        ),
        incomeByMonthData: dashboardService.groupIncomeByMonth(
          acceptedOrFinishedBids
        ),
        totalUsers: dashboardService.calculateTotalUsers(users),
        newUsersThisMonth: dashboardService.calculateNewUsersThisMonth(users),
        totalPosts: dashboardService.calculateTotalPosts(posts),
        postStatusData: dashboardService.generatePostStatusData(posts),
        postsByMonthData: dashboardService.groupPostsByMonth(posts),
      });

      if (
        dashboardData.totalBids &&
        dashboardData.totalPosts &&
        dashboardData.totalUsers
      ) {
        setLoading(false);
      }
    };

    fetchData();
  }, [bids, posts, users, dashboardData]);

  if (loading) {
    return (
      <div className="flex flex-1 mt-12 justify-center">
        <Spinner label="Memuat..." size="lg" />
      </div>
    );
  }

  const {
    totalBids,
    averageBidAmount,
    totalIncome,
    incomeByMonthData,
    totalUsers,
    newUsersThisMonth,
    totalPosts,
    postStatusData,
    postsByMonthData,
    totalBidsAmount,
  } = dashboardData;

  return (
    <Card className="p-6 bg-gray-50 dark:bg-neutral-900">
      <CardHeader>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </CardHeader>
      <CardBody>
        <Tabs
          aria-label="Dashboard sections"
          size="lg"
          color="primary"
          className="overflow-auto sm:w-fit w-[230px] mx-auto justify-center flex flex-1"
        >
          <Tab
            key="users"
            title={
              <div className="flex items-center space-x-2">
                <ion-icon name="people" />
                <span>Pengguna</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <ion-icon
                        name="people"
                        style={{
                          fontSize: "24px",
                          color: "var(--tw-text-opacity)",
                        }}
                        className="text-blue-600 dark:text-blue-300"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                        Total Pengguna
                      </p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {totalUsers}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                      <ion-icon
                        name="person-add"
                        style={{
                          fontSize: "24px",
                          color: "var(--tw-text-opacity)",
                        }}
                        className="text-yellow-600 dark:text-yellow-300"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-300">
                        Pengguna Baru Bulan Ini
                      </p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {newUsersThisMonth}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <Card className="mt-6 bg-white dark:bg-neutral-800 shadow-lg">
              <CardBody>
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Pengguna Terbaru
                </h3>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 px-4">
                  {users.slice(0, 5).map((user) => (
                    <li
                      key={user.id}
                      className="py-3 flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {user.username}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {user.createdAt}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="posts"
            title={
              <div className="flex items-center space-x-2">
                <ion-icon name="newspaper" />
                <span>Postingan</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <ion-icon
                        name="newspaper"
                        style={{
                          fontSize: "24px",
                          color: "var(--tw-text-opacity)",
                        }}
                        className="text-green-600 dark:text-green-300"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-300">
                        Total Postingan
                      </p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {totalPosts}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardBody>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
                    Persentase Status Postingan
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
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
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </div>
            <Card className="mt-6 bg-white dark:bg-neutral-800 shadow-lg">
              <CardBody>
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Postingan Bulan Ini
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={postsByMonthData}>
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="count" fill="#8884d8">
                      {postsByMonthData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="bids"
            title={
              <div className="flex items-center space-x-2">
                <ion-icon name="hammer" />
                <span>Tawaran</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <ion-icon
                        name="hammer"
                        style={{
                          fontSize: "24px",
                          color: "var(--tw-text-opacity)",
                        }}
                        className="text-purple-600 dark:text-purple-300"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-600 dark:text-purple-300">
                        Total Tawaran
                      </p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {totalBids}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
                      <ion-icon
                        name="cash"
                        style={{
                          fontSize: "24px",
                          color: "var(--tw-text-opacity)",
                        }}
                        className="text-pink-600 dark:text-pink-300"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-pink-600 dark:text-pink-300">
                        Rata-rata Nominal Tawaran
                      </p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Rp {averageBidAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <Card className="mt-6 bg-white dark:bg-neutral-800 shadow-lg">
              <CardBody>
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Tawaran Terkini
                </h3>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {bids.slice(0, 5).map((bid) => (
                    <li
                      key={bid.id}
                      className="py-3 flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {bid.title}
                        </span>
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            bid.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : bid.status === "FINISH"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : bid.status === "ACCEPTED"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {bid.status}
                        </span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Rp {bid.amount.toLocaleString()}
                        <Button
                          variant="light"
                          color="primary"
                          className="ml-2"
                          onClick={() => navigate("/bids/" + bid.id)}
                        >
                          Detail
                        </Button>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="finance"
            title={
              <div className="flex items-center space-x-2">
                <ion-icon name="wallet" />
                <span>Keuangan</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                      <ion-icon
                        name="cash"
                        style={{
                          fontSize: "24px",
                          color: "var(--tw-text-opacity)",
                        }}
                        className="text-red-600 dark:text-red-300"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-600 dark:text-red-300">
                        Akumulasi Tawaran
                      </p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Rp {totalBidsAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                      <ion-icon
                        name="wallet"
                        style={{
                          fontSize: "24px",
                          color: "var(--tw-text-opacity)",
                        }}
                        className="text-indigo-600 dark:text-indigo-300"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                        Total Pendapatan
                      </p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Rp {totalIncome.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <Card className="mt-6 bg-white dark:bg-neutral-800 shadow-lg">
              <CardBody>
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Pendapatan Berdasarkan Bulan
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={incomeByMonthData}>
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="income" fill="#8884d8">
                      {incomeByMonthData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
