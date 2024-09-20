import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Input,
  Spinner,
  Textarea,
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
  const { item, isLoading } = useSelector((state) => state.bids);

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
        Tawaran tidak ditemukan.
      </Card>
    );
  }

  return (
    <>
      <Card className="mx-auto bg-gray-50 dark:bg-neutral-900">
        <CardHeader className="flex justify-between items-center px-6 pt-4">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            DETAIL TAWARAN
          </h3>
          <Chip
            color={
              item.status === "ACCEPTED"
                ? "primary"
                : item.status === "FINISH"
                ? "success"
                : item.status === "PENDING"
                ? "warning"
                : "danger"
            }
            variant="flat"
            size="lg"
          >
            {item.status}
          </Chip>
        </CardHeader>

        <CardBody className="px-6 -mt-2">
          <div className="grid sm:grid-cols-2 grid-flow-row gap-4">
            <Card className="justify-center flex flex-1 mb-4 h-[400px]">
              <CardBody className="mx-auto flex flex-1 justify-center items-center">
                <Image
                  src={
                    item.post.imageUrl ??
                    "https://placehold.co/600x400?text=No\nImage"
                  }
                  alt={item.post.title}
                  width={250}
                  height={250}
                  className="object-cover rounded-lg shadow-md mb-4"
                />
                <h4 className="text-lg font-semibold mb-2">
                  Informasi Penawar
                </h4>
                <User
                  name={item.user.name || "Tidak ada nama"}
                  description={item.user.email}
                  avatarProps={{
                    src: item.user.photoUrl,
                    size: "lg",
                  }}
                />
              </CardBody>
            </Card>
            <Card className="p-2 h-[400px]">
              <CardHeader>
                <h4 className="text-lg font-semibold">Informasi Tawaran</h4>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input
                  label="Jumlah"
                  value={`Rp ${item.amount.toLocaleString()}`}
                  readOnly
                  className="font-semibold text-green-600"
                />
                <Textarea label="Pesan" value={item.message} readOnly />
                <Input
                  label="Dibuat pada"
                  value={new Date(item.post.bids[0].createdAt).toLocaleString()}
                  readOnly
                />
                <Input
                  label="Terakhir diubah"
                  value={new Date(item.post.bids[0].updatedAt).toLocaleString()}
                  readOnly
                />
              </CardBody>
            </Card>
          </div>

          <Card className="p-2 mt-4">
            <CardHeader>
              <h4 className="text-lg font-semibold">Informasi Postingan</h4>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input label="Judul" value={item.post.title} readOnly />
              <Textarea
                label="Deskripsi"
                value={item.post.description}
                readOnly
              />
              <div className="flex items-center gap-2">
                <ion-icon name="cash-outline" size="large" />
                <Input
                  label="Budget Min"
                  value={`Rp ${item.post.budgetMin.toLocaleString()}`}
                  readOnly
                />
                <Input
                  label="Budget Max"
                  value={`Rp ${item.post.budgetMax.toLocaleString()}`}
                  readOnly
                />
              </div>
              <div className="flex items-center gap-2">
                <ion-icon name="calendar-outline" />
                <Input
                  label="Tenggat"
                  value={new Date(item.post.deadline).toLocaleDateString()}
                  readOnly
                />
              </div>
              <div className="flex items-center gap-2">
                <ion-icon name="time-outline" />
                <Input
                  label="Selesai dalam"
                  value={`${item.post.finishDay} hari`}
                  readOnly
                />
              </div>
              <div className="flex items-center gap-2">
                <ion-icon name="alert-circle-outline" />
                <Input label="Status" readOnly value={item.status} />
              </div>
              <div className="flex items-center gap-2">
                <ion-icon name="location-outline" />
                <Input
                  label="Lokasi"
                  value={`${item.post.district.districtName}, ${item.post.district.regency}, ${item.post.district.province}`}
                  readOnly
                />
              </div>
            </CardBody>
          </Card>
        </CardBody>

        <CardFooter className="px-6 space-x-2 justify-end">
          <Button
            color="primary"
            onPress={() => handleOpenModal("Ubah", item)}
            className="font-bold"
          >
            Ubah Status
          </Button>
          <Button
            color="danger"
            variant="solid"
            onPress={() => handleOpenModal("Hapus", item)}
            className="font-bold"
          >
            Hapus Tawaran
          </Button>
        </CardFooter>
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
}

export default BidsDetailPage;
