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
                  <Checkbox
                    {...register("isUrgent")}
                    defaultSelected={selectedPost.isUrgent}
                  >
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
                        label="Deadline"
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
