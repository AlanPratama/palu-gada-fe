import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Divider,
} from "@nextui-org/react";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReportedPostsApi from "../../../apis/reportedPostsApi";
import { useSelector } from "react-redux";
import PostsApi from "../../../apis/postsApi";

export default function ReportedPostsDetails() {
  const { item } = useSelector((state) => state.reportedPosts);
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

  if (!item) {
    return (
      <Card className="mx-auto font-bold text-3xl flex flex-1 text-center p-4">
        Laporan tidak ditemukan.
      </Card>
    );
  }

  return (
    <div className="container mx-auto">
      <Card className="mx-auto p-4">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Detail Laporan</h2>
          <Button
            color="danger"
            variant="solid"
            onPress={() => handleDeletePost(item.post.id)}
          >
            Hapus Postingan
          </Button>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Informasi Laporan</h3>
              <p>
                <strong> ID: </strong> {item.id}
              </p>
              <p>
                <strong> Pelapor: </strong> {item.user?.username} (
                {item.user?.email})
              </p>
              <p>
                <strong> Pesan: </strong> {item.message}
              </p>
              <p>
                <strong> Tanggal: </strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Postingan Yang Dilaporkan
              </h3>
              <p>
                <strong> ID: </strong> {item.post?.id}
              </p>
              <p>
                <strong> Judul: </strong> {item.post?.title}
              </p>
              <p>
                <strong> Pemilik: </strong> {item.post?.user?.username} (
                {item.post?.user?.email})
              </p>
            </div>
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-semibold mb-2">Detail Postingan</h3>
            <p>
              <strong> Deskripsi: </strong> {item.post?.description}
            </p>
            <div className="flex items-center mt-2">
              <ion-icon name="cash-outline" className="w-5 h-5 mr-2"></ion-icon>
              <span>
                <strong> Budget: </strong>
                {item.post?.budgetMin} - {item.post?.budgetMax} Rupiah
              </span>
            </div>
            <div className="flex items-center mt-2">
              <ion-icon
                name="calendar-outline"
                className="w-5 h-5 mr-2"
              ></ion-icon>
              <span>
                <strong> Tenggat: </strong>
                {new Date(item.post?.deadline || "").toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <ion-icon
                name="location-outline"
                className="w-5 h-5 mr-2"
              ></ion-icon>
              <span>
                <strong>Lokasi: </strong>
                {item.post?.district?.districtName},{" "}
                {item.post?.district?.regency}, {item.post?.district?.province}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <ion-icon
                name="person-outline"
                className="w-5 h-5 mr-2"
              ></ion-icon>
              <span>Selesai dalam {item.post?.finishDay} hari</span>
            </div>
            <div className="mt-2">
              <strong>Status:</strong>{" "}
              <Chip
                color={item.post?.status === "EXPIRED" ? "danger" : "success"}
              >
                {item.post?.status}
              </Chip>
            </div>
            {item.post?.isUrgent && (
              <div className="flex items-center mt-2">
                <ion-icon
                  name="warning-outline"
                  className="w-5 h-5 mr-2 text-warning"
                ></ion-icon>
                <span className="text-warning">Urgent</span>
              </div>
            )}
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-semibold mb-2">Ketegori</h3>
            <div className="flex flex-wrap gap-2">
              {item.post?.postCategories?.map((category, index) => (
                <Chip key={index} variant="flat">
                  {category.category}
                </Chip>
              ))}
            </div>
          </div>
          <Divider />
          <div>
            <h3 className="text-lg font-semibold mb-2">Tawaran</h3>
            {item.post.bids ? (
              item.post.bids.map((bid, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>Jumlah:</strong> {bid.amount} Rupiah
                  </p>
                  <p>
                    <strong>Pesan:</strong> {bid.message}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <Chip
                      color={
                        bid.bidStatus === "PENDING" ? "warning" : "success"
                      }
                    >
                      {bid.bidStatus}
                    </Chip>
                  </p>
                </div>
              ))
            ) : (
              <div>Tidak ada tawaran saat ini.</div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
