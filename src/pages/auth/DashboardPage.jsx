import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    totalBids: 0,
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

  useEffect(() => {
    const fetchData = async () => {
      if (users.length <= 0) {
        setLoading(true);
        await dashboardService.getAllUsers();
        console.log("fetching users");
      }
      if (posts.length <= 0) {
        setLoading(true);
        await dashboardService.getAllPosts();
        console.log("fetching posts");
      }
      if (bids.length <= 0) {
        setLoading(true);
        await dashboardService.getAllBids();
        console.log("fetching bids");
      }

      const acceptedOrFinishedBids =
        dashboardService.filterAcceptedOrFinishedBids(bids);

      setDashboardData({
        totalBids: dashboardService.calculateTotalBids(bids),
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
      setLoading(false);
    };

    fetchData();
  }, [bids, posts, users]);

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
  } = dashboardData;

  return (
    <Card className="p-8 sm:max-w-full max-w-[320px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="py-4 bg-blue-100 dark:bg-blue-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-0 pt-2 px-4 flex-row gap-2 items-start">
            <ion-icon
              name="people"
              style={{ fontSize: "24px", color: "#3b82f6" }}
            ></ion-icon>
            <div className="flex flex-col">
              <p className="text-tiny uppercase font-bold text-blue-600 dark:text-blue-300">
                Total Pengguna
              </p>
              <h4 className="font-bold text-large text-blue-800 dark:text-blue-100">
                {totalUsers}
              </h4>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 bg-yellow-100 dark:bg-yellow-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-0 pt-2 px-4 flex-row gap-2 items-start">
            <ion-icon
              name="person-add"
              style={{ fontSize: "24px", color: "#f59e0b" }}
            ></ion-icon>
            <div className="flex flex-col">
              <p className="text-tiny uppercase font-bold text-yellow-600 dark:text-yellow-300">
                Pengguna Baru
              </p>
              <h4 className="font-bold text-large text-yellow-800 dark:text-yellow-100">
                {newUsersThisMonth}
              </h4>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 bg-green-100 dark:bg-green-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-0 pt-2 px-4 flex-row gap-2 items-start">
            <ion-icon
              name="newspaper"
              style={{ fontSize: "24px", color: "#10b981" }}
            ></ion-icon>
            <div className="flex flex-col">
              <p className="text-tiny uppercase font-bold text-green-600 dark:text-green-300">
                Total Postingan
              </p>
              <h4 className="font-bold text-large text-green-800 dark:text-green-100">
                {totalPosts}
              </h4>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 bg-purple-100 dark:bg-purple-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-0 pt-2 px-4 flex-row gap-2 items-start">
            <ion-icon
              name="hammer"
              style={{ fontSize: "24px", color: "#8b5cf6" }}
            ></ion-icon>
            <div className="flex flex-col">
              <p className="text-tiny uppercase font-bold text-purple-600 dark:text-purple-300">
                Total Tawaran
              </p>
              <h4 className="font-bold text-large text-purple-800 dark:text-purple-100">
                {totalBids}
              </h4>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 bg-pink-100 dark:bg-pink-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-0 pt-2 px-4 flex-row gap-2 items-start">
            <ion-icon
              name="cash"
              style={{ fontSize: "24px", color: "#ec4899" }}
            ></ion-icon>
            <div className="flex flex-col">
              <p className="text-tiny uppercase font-bold text-pink-600 dark:text-pink-300">
                Rata-rata Tawaran
              </p>
              <h4 className="font-bold text-large text-pink-800 dark:text-pink-100">
                Rp {averageBidAmount}
              </h4>
            </div>
          </CardHeader>
        </Card>
        <Card className="py-4 bg-indigo-100 dark:bg-indigo-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-0 pt-2 px-4 flex-row gap-2 items-start">
            <ion-icon
              name="wallet"
              style={{ fontSize: "24px", color: "#6366f1" }}
            ></ion-icon>
            <div className="flex flex-col">
              <p className="text-tiny uppercase font-bold text-indigo-600 dark:text-indigo-300">
                Total Pendapatan
              </p>
              <h4 className="font-bold text-large text-indigo-800 dark:text-indigo-100">
                Rp {totalIncome}
              </h4>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="py-4 bg-white dark:bg-neutral-800 shadow-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              Status Postingan
            </h2>
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

        <Card className="py-4 bg-white dark:bg-neutral-800 shadow-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              Postingan per Bulan
            </h2>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={postsByMonthData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00C49F">
                    {postsByMonthData.map((entry, index) => (
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

        <Card className="py-4 bg-white dark:bg-neutral-800 shadow-lg md:col-span-2">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              Pendapatan per Bulan
            </h2>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeByMonthData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
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
            </div>
          </CardBody>
        </Card>
      </div>
    </Card>
  );
}
