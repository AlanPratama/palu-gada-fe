import BidsApi from "../apis/bidsApi";
import PostsApi from "../apis/postsApi";
import UsersApi from "../apis/usersApi";

const getAllUsers = async () => {
  return await UsersApi.getAll();
};

const getAllPosts = async () => {
  return await PostsApi.getAllPosts();
};

const getAllBids = async () => {
  return await BidsApi.getAllBids();
};

const calculateTotalBids = (bids) => bids.length;

const calculateTotalBidAmount = (bids) =>
  bids.reduce((acc, bid) => acc + bid.amount, 0);

const calculateAverageBidAmount = (bids) => {
  const totalAmount = calculateTotalBidAmount(bids);
  return bids.length ? totalAmount / bids.length : 0;
};

const filterAcceptedOrFinishedBids = (bids) => {
  return bids.filter(
    (bid) => bid.status === "ACCEPTED" || bid.status === "FINISH"
  );
};

const calculateTotalIncome = (acceptedOrFinishedBids) => {
  return acceptedOrFinishedBids.reduce((total, bid) => {
    return total + (bid.fee || 0);
  }, 0);
};

const groupIncomeByMonth = (acceptedOrFinishedBids) => {
  const incomeByMonth = Array.from({ length: 12 }, (_, month) => ({
    name: new Date(0, month).toLocaleString("default", { month: "short" }),
    income: 0,
  }));

  acceptedOrFinishedBids.forEach((bid) => {
    const month = new Date(bid.createdAt).getMonth();
    const income = bid.fee;
    incomeByMonth[month].income += income;
  });

  return incomeByMonth.map((entry) => ({
    ...entry,
    income: entry.income.toFixed(2),
  }));
};

const calculateTotalUsers = (users) => users.length;

const calculateNewUsersThisMonth = (users) => {
  const currentMonth = new Date().getMonth();
  return users.filter(
    (user) => new Date(user.createdAt).getMonth() === currentMonth
  ).length;
};

const calculateTotalPosts = (posts) => posts.length;

const calculateActivePosts = (posts) =>
  posts.filter((post) => post.status === "AVAILABLE").length;

const calculateCompletedPosts = (posts) =>
  posts.filter((post) => post.status === "COMPLETED").length;

const calculateUrgentPosts = (posts) =>
  posts.filter((post) => post.isUrgent).length;

const generatePostStatusData = (posts) => {
  const activePosts = calculateActivePosts(posts);
  const completedPosts = calculateCompletedPosts(posts);
  const urgentPosts = calculateUrgentPosts(posts);

  return [
    { name: "Aktif", value: activePosts },
    { name: "Selesai", value: completedPosts },
    { name: "Urgent", value: urgentPosts },
  ];
};

const groupPostsByMonth = (posts) => {
  // Initialize all months with zero post count
  const postsByMonth = Array.from({ length: 12 }, (_, month) => ({
    name: new Date(0, month).toLocaleString("default", { month: "short" }),
    count: 0,
  }));

  // Count posts for each month
  posts.forEach((post) => {
    const month = new Date(post.createdAt).getMonth();
    postsByMonth[month].count += 1;
  });

  return postsByMonth;
};

export const dashboardService = {
  getAllUsers,
  getAllPosts,
  getAllBids,
  calculateTotalBids,
  calculateTotalBidAmount,
  calculateAverageBidAmount,
  filterAcceptedOrFinishedBids,
  calculateTotalIncome,
  groupIncomeByMonth,
  calculateTotalUsers,
  calculateNewUsersThisMonth,
  calculateTotalPosts,
  calculateActivePosts,
  calculateCompletedPosts,
  calculateUrgentPosts,
  generatePostStatusData,
  groupPostsByMonth,
};
