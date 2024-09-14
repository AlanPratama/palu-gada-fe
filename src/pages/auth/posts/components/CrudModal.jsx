import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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
            <span className="dark:text-white">{modalType} Unggahan</span>
          </ModalHeader>
          <ModalBody>
            {modalType === "Ubah" && (
              <Input
                {...register("name", {
                  required: "Nama kategori harus diisi.",
                })}
                placeholder="Nama kategori"
                label="Nama"
                endContent={
                  <ion-icon name="folder-open" size="small" color="primary" />
                }
              />
            )}
            {modalType === "Hapus" && (
              <h1 className="dark:text-white">
                Anda yakin ingin menghapus unggahan{" "}
                <span className="text-red-500">{selectedPost.title}</span>?
              </h1>
            )}
            {modalType === "Detail" && (
              <Card className="max-w-[400px]" shadow="none">
                <CardHeader className="flex-col items-start px-4 pb-0">
                  <div className="flex justify-between items-center w-full mb-4">
                    <h4 className="text-large font-bold">
                      {selectedPost.title}
                    </h4>
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
                  <p className="text-small text-default-500 mb-4">
                    Pengunggah: {selectedPost.user.email}
                  </p>
                  <div className="w-full justify-center flex">
                    <Image
                      isZoomed
                      alt="Post image"
                      className="object-cover w-full h-52 rounded-lg"
                      src={selectedPost.imageUrl}
                    />
                  </div>
                </CardHeader>
                <CardBody className="px-4">
                  <Divider className="my-4" />
                  <p className="text-default-700 text-xl mb-4 font-bold text-center">
                    {selectedPost.description}
                  </p>
                  <div className="space-y-4 text-xl font-bold">
                    <div className="flex flex-row">
                      <ion-icon name="cash" size="small" />
                      <p className="text-small ml-2">
                        Budget: Rp {selectedPost.budgetMin.toLocaleString()} -
                        Rp {selectedPost.budgetMax.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <ion-icon name="alarm" size="small" />
                      <p className="text-small ml-2">
                        Selesai dalam: {selectedPost.finishDay} hari
                      </p>
                    </div>
                    <div className="flex items-center">
                      <ion-icon name="calendar" size="small" />
                      <p className="text-small ml-2">
                        Deadline:
                        <span className="text-red-400">
                          {" "}
                          {new Date(selectedPost.deadline).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <ion-icon name="pin" size="small" />
                      <p className="text-small ml-2">
                        Lokasi: {selectedPost.district.districtName},{" "}
                        {selectedPost.district.regency},{" "}
                        {selectedPost.district.province}
                      </p>
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

CrudModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.oneOf(["Detail", "Ubah", "Hapus"]).isRequired,
  selectedPost: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CrudModal;
