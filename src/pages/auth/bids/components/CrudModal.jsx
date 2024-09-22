import {
  Button,
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

const CrudModal = ({ isOpen, modalType, selectedBid, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: selectedBid || { name: "" },
  });

  useEffect(() => {
    reset(selectedBid || { name: "" });
  }, [selectedBid, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(modalType.toLowerCase(), data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalHeader>
            <span className="dark:text-white">{modalType} Tawaran</span>
          </ModalHeader>
          <ModalBody>
            {modalType === "Tambah" && <div>Blom ada di backend</div>}
            {modalType === "Ubah" && (
              <>
                <Select
                  {...register("status", {
                    required: "Status harus diisi.",
                  })}
                  label="Pilih status"
                  className="w-full"
                  disallowEmptySelection
                  defaultSelectedKeys={[selectedBid?.status.toString()]}
                >
                  {selectedBid.status === "ACCEPTED" && (
                    <SelectItem
                      key="FINISH"
                      value="FINISH"
                      className="dark:text-white"
                    >
                      FINISH
                    </SelectItem>
                  )}
                  <SelectItem
                    key="REJECTED"
                    value="REJECTED"
                    className="dark:text-white"
                  >
                    REJECTED
                  </SelectItem>
                  <SelectItem
                    key="ACCEPTED"
                    value="ACCEPTED"
                    className="dark:text-white"
                  >
                    ACCEPTED
                  </SelectItem>
                  <SelectItem
                    key="PENDING"
                    value="PENDING"
                    className="dark:text-white"
                  >
                    PENDING
                  </SelectItem>
                </Select>
              </>
            )}
            {modalType === "Hapus" && (
              <h1 className="dark:text-white">
                Anda yakin ingin menghapus tawaran ini?
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
  selectedBid: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CrudModal;
