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
  selectedCategory,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: selectedCategory || { name: "" },
  });

  useEffect(() => {
    reset(selectedCategory || { name: "" });
  }, [selectedCategory, reset]);

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
            ) : (
              <h1 className="dark:text-white">
                Anda yakin ingin menghapus kategori{" "}
                <span className="text-red-500">{selectedCategory.name}</span>?
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
  selectedCategory: PropTypes.shape({
    name: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CrudModal;
