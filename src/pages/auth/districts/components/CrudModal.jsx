import PropTypes from "prop-types";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const CrudModal = ({
  isOpen,
  modalType,
  selectedDistrict,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: selectedDistrict || { name: "" },
  });

  useEffect(() => {
    reset(selectedDistrict || { name: "" });
  }, [selectedDistrict, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(modalType.toLowerCase(), data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalHeader>
            <span className="dark:text-white">{modalType} Kategori</span>
          </ModalHeader>
          <ModalBody>
            {modalType !== "Hapus" ? (
              <>
                <Input
                  {...register("districtName", {
                    required: "Nama kota harus diisi.",
                  })}
                  placeholder="Nama kota"
                  label="Nama Kota"
                />
                <Input
                  {...register("province", {
                    required: "Provinsi harus diisi.",
                  })}
                  placeholder="Provinsi"
                  label="Provinsi"
                />
                <Input
                  {...register("regency", {
                    required: "Kabupaten harus diisi.",
                  })}
                  placeholder="Kabupaten"
                  label="Kabupaten"
                />
              </>
            ) : (
              <h1 className="dark:text-white">
                Anda yakin ingin menghapus kota{" "}
                <span className="text-red-500">{selectedDistrict.name}</span>?
              </h1>
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
              className="font-bold"
            >
              Batal
            </Button>
            <Button type="submit" color="primary" className="font-bold">
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
  modalType: PropTypes.oneOf(["Tambah", "Ubah", "Hapus"]).isRequired,
  selectedDistrict: PropTypes.shape({
    name: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CrudModal;
