import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CrudModal = ({ isOpen, modalType, selectedPost, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: selectedPost || { title: "" },
  });

  useEffect(() => {
    reset(selectedPost || { title: "" });
  }, [selectedPost, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(modalType.toLowerCase(), data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalHeader>
            <span className="dark:text-white">{modalType} Postingan</span>
          </ModalHeader>
          <ModalBody>
            {modalType === "Ubah" && (
              <Select
                {...register("status", {
                  required: "Status harus diisi.",
                })}
                label="Pilih status"
                className="w-full"
                disallowEmptySelection
                defaultSelectedKeys={[selectedPost?.status.toString()]}
              >
                <SelectItem
                  key="AVAILABLE"
                  value="AVAILABLE"
                  className="dark:text-white"
                >
                  AVAILABLE
                </SelectItem>
                <SelectItem
                  key="NOT_AVAILABLE"
                  value="NOT_AVAILABLE"
                  className="dark:text-white"
                >
                  NOT_AVAILABLE
                </SelectItem>
                <SelectItem
                  key="EXPIRED"
                  value="EXPIRED"
                  className="dark:text-white"
                >
                  EXPIRED
                </SelectItem>
              </Select>
            )}
            {modalType === "Hapus" && (
              <h1 className="dark:text-white">
                Anda yakin ingin menghapus postingan{" "}
                <span className="text-red-500">{selectedPost.title}</span>?
              </h1>
            )}
            {modalType === "Detail" && (
              <Card className="mx-auto" shadow="none">
                <CardHeader className="flex-col items-start pb-2">
                  <div className="flex justify-between items-center w-full">
                    <h4 className="text-xl font-bold">{selectedPost.title}</h4>
                    <Chip
                      color={
                        selectedPost.status === "AVAILABLE"
                          ? "success"
                          : "warning"
                      }
                      variant="flat"
                      size="sm"
                    >
                      {selectedPost.status}
                    </Chip>
                  </div>
                  <p className="text-small text-default-500 mt-1">
                    Pengunggah: {selectedPost.user.email}
                  </p>
                </CardHeader>
                <Divider className="my-3" />
                <CardBody className="px-0 py-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Image
                      isZoomed
                      alt="Post image"
                      className="object-cover w-64 h-64 rounded-lg"
                      src={
                        selectedPost.imageUrl
                          ? selectedPost.imageUrl
                          : "https://placehold.co/600x400?text=No\nImage"
                      }
                    />
                    <div className="space-y-3">
                      <InfoItem
                        icon="newspaper"
                        label="Deskripsi"
                        value={selectedPost.description}
                      />
                      <InfoItem
                        icon="cash"
                        label="Budget"
                        value={`Rp ${selectedPost.budgetMin.toLocaleString()} - Rp ${selectedPost.budgetMax.toLocaleString()}`}
                      />
                      <InfoItem
                        icon="alarm"
                        label="Selesai dalam"
                        value={`${selectedPost.finishDay} hari`}
                      />
                      <InfoItem
                        icon="calendar"
                        label="Tenggat"
                        value={new Date(
                          selectedPost.deadline
                        ).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        valueClassName="text-red-400"
                      />
                      <InfoItem
                        icon="pin"
                        label="Lokasi"
                        value={`${selectedPost.district.districtName}, ${selectedPost.district.regency}, ${selectedPost.district.province}`}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              onPress={onClose}
              color="danger"
              className={modalType === "Detail" ? "hidden" : "font-bold"}
            >
              Batal
            </Button>
            <Button
              type="submit"
              color="primary"
              className={modalType === "Detail" ? "hidden" : "font-bold"}
            >
              {modalType}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

function InfoItem({ icon, label, value, valueClassName = "" }) {
  return (
    <div className="flex items-start">
      <span className="mr-2 mt-1">
        <ion-icon name={icon} style={{ fontSize: "1rem" }}></ion-icon>
      </span>
      <div>
        <p className="text-small font-semibold">{label}</p>
        <p className={`text-small ${valueClassName}`}>{value}</p>
      </div>
    </div>
  );
}

InfoItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueClassName: PropTypes.string,
};

CrudModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.oneOf(["Detail", "Ubah", "Hapus"]).isRequired,
  selectedPost: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CrudModal;
