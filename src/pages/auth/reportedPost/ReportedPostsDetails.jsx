import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Divider,
  Spinner,
  Avatar,
} from "@nextui-org/react";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReportedPostsApi from "../../../apis/reportedPostsApi";
import { useSelector } from "react-redux";
import PostsApi from "../../../apis/postsApi";

export default function ReportedPostsDetails() {
  const { item, isLoading } = useSelector((state) => state.reportedPosts);
  const { id } = useParams();

  const fetchReportedPosts = useCallback(async () => {
    await ReportedPostsApi.getById(id);
  }, [id]);

  const handleDeletePost = async (id) => {
    await PostsApi.deletePosts(id);
    fetchReportedPosts();
  };

  useEffect(() => {
    fetchReportedPosts();
  }, [fetchReportedPosts]);

  if (isLoading) {
    return (
      <div className="flex flex-1 mt-12 justify-center">
        <Spinner label="Memuat..." size="lg" />
      </div>
    );
  }

  if (!item && !isLoading) {
    return (
      <Card className="mx-auto font-bold text-3xl flex flex-1 text-center p-4">
        Laporan tidak ditemukan.
      </Card>
    );
  }

  return (
    <div className="container mx-auto">
      <Card className="mx-auto bg-gray-50 dark:bg-neutral-900">
        <CardHeader className="flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold">Detail Laporan</h2>
          <Button
            color="danger"
            variant="solid"
            onPress={() => handleDeletePost(item.post.id)}
            startContent={<ion-icon name="trash-outline"></ion-icon>}
            className="font-bold"
          >
            Hapus Postingan
          </Button>
        </CardHeader>
        <CardBody className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-content1 dark:bg-content1-dark">
              <CardHeader className="  ">
                <h3 className="text-lg font-semibold">Informasi Laporan</h3>
              </CardHeader>
              <CardBody className="space-y-2">
                <p>
                  <strong>ID:</strong> {item.id}
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar src={item.user?.avatarUrl} size="sm" />
                  <div>
                    <p>
                      <strong>Pelapor:</strong> {item.user?.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.user?.email}
                    </p>
                  </div>
                </div>
                <p>
                  <strong>Pesan:</strong> {item.message}
                </p>
                <p>
                  <strong>Tanggal:</strong>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </CardBody>
            </Card>
            <Card className="bg-content1 dark:bg-content1-dark">
              <CardHeader className="  ">
                <h3 className="text-lg font-semibold">
                  Postingan Yang Dilaporkan
                </h3>
              </CardHeader>
              <CardBody className="space-y-2">
                <p>
                  <strong>ID:</strong> {item.post?.id}
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar src={item.post?.user?.avatarUrl} size="sm" />
                  <div>
                    <p>
                      <strong>Pemilik:</strong> {item.post?.user?.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.post?.user?.email}
                    </p>
                  </div>
                </div>
                <p>
                  <strong>Judul:</strong> {item.post?.title}
                </p>
              </CardBody>
            </Card>
          </div>
          <Divider />
          <Card className="bg-content1 dark:bg-content1-dark">
            <CardHeader className="  ">
              <h3 className="text-lg font-semibold">Detail Postingan</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <p>
                <strong>Deskripsi:</strong> {item.post?.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <ion-icon name="cash-outline" class="w-5 h-5 mr-2"></ion-icon>
                  <span>
                    <strong>Budget:</strong> {item.post?.budgetMin} -{" "}
                    {item.post?.budgetMax} Rupiah
                  </span>
                </div>
                <div className="flex items-center">
                  <ion-icon
                    name="calendar-outline"
                    class="w-5 h-5 mr-2"
                  ></ion-icon>
                  <span>
                    <strong>Tenggat:</strong>{" "}
                    {new Date(item.post?.deadline || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <ion-icon
                    name="location-outline"
                    class="w-5 h-5 mr-2"
                  ></ion-icon>
                  <span>
                    <strong>Lokasi:</strong> {item.post?.district?.districtName}
                    , {item.post?.district?.regency},{" "}
                    {item.post?.district?.province}
                  </span>
                </div>
                <div className="flex items-center">
                  <ion-icon
                    name="person-outline"
                    class="w-5 h-5 mr-2"
                  ></ion-icon>
                  <span>Waktu pengerjaan {item.post?.finishDay} hari</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <strong>Status:</strong>
                <Chip
                  variant="flat"
                  color={item.post?.status === "EXPIRED" ? "danger" : "success"}
                >
                  {item.post?.status}
                </Chip>
                {item.post?.isUrgent && (
                  <Chip
                    color="warning"
                    variant="flat"
                    className="px-2 text-center mx-auto"
                    startContent={<ion-icon name="warning-outline"></ion-icon>}
                  >
                    Urgent
                  </Chip>
                )}
              </div>
            </CardBody>
          </Card>
          <Divider />
          <Card className="bg-content1 dark:bg-content1-dark">
            <CardHeader className="  ">
              <h3 className="text-lg font-semibold">Kategori</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {item.post?.postCategories?.map((category, index) => (
                  <Chip key={index} variant="flat">
                    {category.category}
                  </Chip>
                ))}
              </div>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}
