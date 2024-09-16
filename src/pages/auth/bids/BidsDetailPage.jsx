import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Spinner,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BidsApi from "../../../apis/bidsApi";
import CrudModal from "./components/CrudModal";

function BidsDetailPage() {
  const [modalType, setModalType] = useState("");
  const [selectedBid, setSelectedBid] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { id } = useParams();
  const { item } = useSelector((state) => state.bids);

  const navigate = useNavigate();

  const fetchBid = useCallback(async () => {
    await BidsApi.getById(id);
  }, [id]);

  const handleBidAction = useCallback(
    async (action, bid = null) => {
      switch (action) {
        case "ubah":
          await BidsApi.editBidStatus(bid.id, bid.status);
          fetchBid();
          break;
        case "hapus":
          await BidsApi.deleteBids(bid.id);
          navigate("/bid");
          break;
        default:
          break;
      }
      onOpenChange(false);
    },
    [onOpenChange, fetchBid, navigate]
  );

  const handleOpenModal = useCallback(
    (type, bid = null) => {
      setModalType(type);
      setSelectedBid(bid);
      onOpen();
    },
    [onOpen]
  );

  useEffect(() => {
    fetchBid();
  }, [fetchBid]);

  if (item) {
    return (
      <>
        <Card className="mx-auto sm:w-full w-[300px] overflow-auto">
          <CardHeader className="flex justify-between items-center p-4">
            <h3 className="sm:text-2xl text-xl font-bold text-gray-800 dark:text-white">
              DETAIL TAWARAN
            </h3>
            <Chip
              color={item.status === "PENDING" ? "warning" : "success"}
              variant="flat"
              size="lg"
            >
              {item.status}
            </Chip>
          </CardHeader>
          <Divider />
          <CardBody className="p-6 space-y-6">
            <div className="p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Informasi Penawar</h4>
              <User
                name={item.user.name || "Tidak ada nama"}
                description={item.user.email}
                avatarProps={{
                  src:
                    item.user.photoUrl ||
                    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                  size: "lg",
                }}
              />
            </div>

            <Divider />

            <div className="p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">
                Informasi Postingan
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>
                    <strong>Judul:</strong> {item.post.title}
                  </p>
                  <p>
                    <strong>Deskripsi:</strong> {item.post.description}
                  </p>
                  <p>
                    <strong>Budget:</strong> Rp{" "}
                    {item.post.budgetMin.toLocaleString()} - Rp{" "}
                    {item.post.budgetMax.toLocaleString()}
                  </p>
                  <p>
                    <strong>Tenggat:</strong>{" "}
                    {new Date(item.post.deadline).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Selesai dalam:</strong> {item.post.finishDay} hari
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <Chip
                      color={
                        item.post.status === "AVAILABLE" ? "success" : "warning"
                      }
                      variant="flat"
                    >
                      {item.post.status}
                    </Chip>
                  </p>
                  <p>
                    <strong>Lokasi:</strong> {item.post.district.districtName},{" "}
                    {item.post.district.regency}, {item.post.district.province}
                  </p>
                </div>
                <div className="mx-auto">
                  <Image
                    src={item.post.imageUrl}
                    alt={item.post.title}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            <Divider />

            <div className="p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Informasi Tawaran</h4>
              <div className="space-y-2">
                <p>
                  <strong>Jumlah:</strong>{" "}
                  <span>Rp {item.amount.toLocaleString()}</span>
                </p>
                <p>
                  <strong>Pesan:</strong> &quot;{item.message}&quot;
                </p>
                <p>
                  <strong>Dibuat pada:</strong>{" "}
                  {new Date(item.post.bids[0].createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Terakhir diubah:</strong>{" "}
                  {new Date(item.post.bids[0].updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <Divider />

            <div className="flex justify-end gap-4">
              <Button
                color="primary"
                className="font-bold"
                onPress={() => handleOpenModal("Ubah", item)}
              >
                Ubah Status
              </Button>
              <Button
                color="danger"
                onPress={() => handleOpenModal("Hapus", item)}
                className="font-bold"
              >
                Hapus Tawaran
              </Button>
            </div>
          </CardBody>
        </Card>

        {isOpen && (
          <CrudModal
            isOpen={isOpen}
            modalType={modalType}
            selectedBid={selectedBid}
            onClose={() => onOpenChange(false)}
            onSubmit={handleBidAction}
          />
        )}
      </>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
}

export default BidsDetailPage;
