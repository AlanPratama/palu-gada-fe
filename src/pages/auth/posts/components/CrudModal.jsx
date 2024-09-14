import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DistrictsApi from "../../../../apis/districtsApi";

const CrudModal = ({ isOpen, modalType, selectedPost, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: selectedPost || { title: "" },
  });
  const { items } = useSelector((state) => state.districts);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    reset(selectedPost || { title: "" });
    DistrictsApi.getAllDistricts();
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <Select
                    {...register("districtId", {
                      required: "District is required.",
                    })}
                    label="Pilih kota"
                    className="w-full"
                    disallowEmptySelection
                    defaultSelectedKeys={[
                      selectedPost?.district?.id?.toString(),
                    ]}
                    onValueChange={(value) =>
                      setSelectedDistrict("districtId", value)
                    }
                  >
                    {items.map((district) => (
                      <SelectItem
                        key={district.id}
                        value={selectedDistrict}
                        className="dark:text-white"
                      >
                        {district.districtName}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="col-span-full">
                  <Input
                    {...register("title", { required: "Judul harus diisi." })}
                    placeholder="Judul"
                    label="Judul"
                    defaultValue={selectedPost?.title}
                  />
                </div>

                <div className="col-span-full">
                  <Textarea
                    {...register("description", {
                      required: "Deskripsi harus diisi.",
                    })}
                    placeholder="Deskripsi"
                    label="Deskripsi"
                    defaultValue={selectedPost?.description}
                  />
                </div>

                <div>
                  <Input
                    {...register("budgetMin", {
                      required: "Budget minimum harus diisi.",
                    })}
                    type="number"
                    placeholder="Budget Minimum"
                    label="Budget Minimum"
                    defaultValue={selectedPost?.budgetMin}
                  />
                </div>

                <div>
                  <Input
                    {...register("budgetMax", {
                      required: "Budget maksimum harus diisi.",
                    })}
                    type="number"
                    placeholder="Budget Maksimum"
                    label="Budget Maksimum"
                    defaultValue={selectedPost?.budgetMax}
                  />
                </div>

                <div>
                  <Input
                    {...register("finishDay", {
                      required: "Hari penyelesaian harus diisi.",
                    })}
                    type="number"
                    placeholder="Selesai dalam hari"
                    label="Hari Penyelesaian"
                    defaultValue={selectedPost?.finishDay}
                  />
                </div>

                <div className="flex items-center">
                  <Checkbox {...register("isUrgent")} defaultSelected>
                    Urgent
                  </Checkbox>
                </div>

                <div className="col-span-full">
                  <Input
                    {...register("imageUrl", {
                      required: "URL gambar harus diisi.",
                    })}
                    placeholder="URL Gambar"
                    label="URL Gambar"
                    defaultValue={selectedPost?.imageUrl}
                  />
                </div>
              </div>
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
