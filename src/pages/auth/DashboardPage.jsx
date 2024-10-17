import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersApi from "../../apis/usersApi";
import PostsApi from "../../apis/postsApi";
import BidsApi from "../../apis/bidsApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const { items: users } = useSelector((state) => state.users);
  const { items: posts } = useSelector((state) => state.posts);
  const { items: bids } = useSelector((state) => state.bids);

  const navigate = useNavigate();

  const calculateData = useCallback(() => {
    const totalBids = bids.length;
    const totalBidAmount = bids.reduce((acc, bid) => acc + bid.amount, 0);
    const averageBidAmount = totalBids ? totalBidAmount / totalBids : 0;

    const acceptedOrFinishedBids = bids.filter(
      (bid) => bid.status === "ACCEPTED" || bid.status === "FINISH"
    );
    const totalIncome = acceptedOrFinishedBids.reduce(
      (total, bid) => total + (bid.fee || 0),
      0
    );

    const incomeByMonth = Array.from({ length: 12 }, (_, month) => ({
      name: new Date(0, month)?.toLocaleString("default", { month: "short" }),
      income: 0,
    }));
    acceptedOrFinishedBids.forEach((bid) => {
      const month = new Date(bid.createdAt).getMonth();
      incomeByMonth[month].income += bid.fee;
    });

    const totalUsers = users.length;
    const newUsersThisMonth = users.filter(
      (user) => new Date(user.createdAt).getMonth() === new Date().getMonth()
    ).length;

    const totalPosts = posts.length;
    const postStatusData = [
      {
        name: "Aktif",
        value: posts.filter((post) => post.status === "AVAILABLE").length,
      },
      {
        name: "Selesai",
        value: posts.filter((post) => post.status === "COMPLETED").length,
      },
      { name: "Urgent", value: posts.filter((post) => post.isUrgent).length },
    ];

    const postsByMonth = Array.from({ length: 12 }, (_, month) => ({
      name: new Date(0, month)?.toLocaleString("default", { month: "short" }),
      count: posts.filter(
        (post) => new Date(post.createdAt).getMonth() === month
      ).length,
    }));

    return {
      totalBids,
      averageBidAmount,
      totalIncome,
      incomeByMonth,
      totalUsers,
      newUsersThisMonth,
      totalPosts,
      postStatusData,
      postsByMonth,
      totalBidAmount,
    };
  }, [users, posts, bids]);

  const data = calculateData();

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      if (!posts.length && !users.length && !bids.length) {
        await UsersApi.getAll();
        await PostsApi.getAllPosts();
        await BidsApi.getAllBids();
        console.log("fetching");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [posts, users, bids]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex flex-1 mt-12 justify-center">
        <Spinner label="Memuat..." size="lg" />
      </div>
    );
  }

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
                        {data.totalUsers}
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
                        {data.newUsersThisMonth}
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
                  {users.slice(0, 5)?.map((user) => (
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
                        {data.totalPosts}
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
                        data={data.postStatusData}
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
                        {data.postStatusData?.map((entry, index) => (
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
                  <BarChart data={data.postsByMonth}>
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="count" fill="#8884d8">
                      {data.postsByMonth?.map((entry, index) => (
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
                        {data.totalBids}
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
                        Rp {data.averageBidAmount?.toLocaleString()}
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
                  {bids.slice(0, 5)?.map((bid) => (
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
                        Rp {bid.amount?.toLocaleString()}
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
                        Rp {data.totalBidAmount?.toLocaleString()}
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
                        Rp {data.totalIncome?.toLocaleString()}
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
                  <BarChart data={data.incomeByMonth}>
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="income" fill="#8884d8">
                      {data.incomeByMonth?.map((entry, index) => (
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
