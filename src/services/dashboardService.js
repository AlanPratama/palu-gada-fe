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
  return bids.length ? (totalAmount / bids.length).toFixed(2) : 0;
};

const filterAcceptedOrFinishedBids = (bids) =>
  bids.filter((bid) => bid.status === "ACCEPTED" || bid.status === "FINISH");

const calculateTotalIncome = (acceptedOrFinishedBids) =>
  acceptedOrFinishedBids
    .reduce((acc, bid) => acc + bid.amount * 0.02, 0)
    .toFixed(2);

const groupIncomeByMonth = (acceptedOrFinishedBids) => {
  const incomeByMonth = acceptedOrFinishedBids.reduce((acc, bid) => {
    const month = new Date(bid.createdAt).getMonth();
    const income = bid.amount * 0.02;
    acc[month] = (acc[month] || 0) + income;
    return acc;
  }, {});

  return Object.entries(incomeByMonth).map(([month, income]) => ({
    name: new Date(0, month).toLocaleString("default", { month: "short" }),
    income: income.toFixed(2),
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
  const postsByMonth = posts.reduce((acc, post) => {
    const month = new Date(post.createdAt).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(postsByMonth).map(([month, count]) => ({
    name: new Date(0, month).toLocaleString("default", { month: "short" }),
    count,
  }));
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
