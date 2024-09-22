import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { UsersPage } from "../../users/UsersPage";

const CrudModal = ({
  isOpen,
  modalType,
  selectedPayout,
  onClose,
  onSubmit,
}) => {
  const handleUpdateStatus = () => {
    onSubmit(selectedPayout.id, modalType === "Setujui" ? "SUCCESS" : "FAILED");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size={modalType === "Pilih User" ? "4xl" : "md"}
    >
      <ModalContent>
        <ModalHeader>
          <span className="dark:text-white">{modalType} Pembayaran</span>
        </ModalHeader>
        <ModalBody>
          {modalType === "Pilih User" && <UsersPage onlySelect />}
          {modalType === "Setujui" && (
            <h2 className="dark:text-white">
              Anda yakin ingin menyetujui pembayaran ke user{" "}
              <span className="text-red-500">
                {selectedPayout?.user?.email}
              </span>
              ?
            </h2>
          )}
          {modalType === "Tolak" && (
            <h2 className="dark:text-white">
              Anda yakin ingin menolak pembayaran ke user{" "}
              <span className="text-red-500">
                {selectedPayout?.user?.email}
              </span>
              ?
            </h2>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onPress={onClose}
            color="danger"
            className={"font-bold"}
          >
            Batal
          </Button>
          <Button
            type="button"
            color="primary"
            className={"font-bold"}
            onPress={handleUpdateStatus}
          >
            {modalType}
          </Button>
        </ModalFooter>
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
  modalType: PropTypes.oneOf(["Setujui", "Tolak", "Pilih User"]).isRequired,
  selectedPayout: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default CrudModal;
