import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
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
          {modalType === "Detail" && (
            <Card shadow="none">
              <CardHeader className="flex-col items-start pb-2">
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-xl font-bold capitalize">
                    {selectedPayout.payoutType.replace("_", " ")}
                  </h4>
                  <Chip
                    color={
                      selectedPayout.payoutStatus === "FAILED"
                        ? "danger"
                        : selectedPayout.payoutStatus === "PENDING"
                        ? "warning"
                        : "success"
                    }
                    variant="flat"
                    size="sm"
                  >
                    {selectedPayout.payoutStatus}
                  </Chip>
                </div>
                <p className="text-small text-default-500 mt-1">
                  Pemilik: {selectedPayout.user.email}
                </p>
              </CardHeader>
              <Divider className="my-3" />
              <CardBody className="px-0 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <InfoItem
                    icon="cash"
                    label="Total Pembayaran"
                    value={`Rp ${selectedPayout.amount.toLocaleString()}`}
                  />
                  <InfoItem
                    icon="calendar"
                    label="Tanggal Permintaan"
                    value={new Date(
                      selectedPayout.createdAt
                    ).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  />
                  {selectedPayout.payoutStatus !== "PENDING" && (
                    <InfoItem
                      icon="calendar"
                      label="Disetujui/ditolak"
                      value={new Date(
                        selectedPayout.updatedAt
                      ).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    />
                  )}
                  <InfoItem
                    icon="card-outline"
                    label="Destinasi"
                    value={selectedPayout.destinationNumber}
                  />
                </div>
              </CardBody>
            </Card>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onPress={onClose}
            color="danger"
            className={"font-bold"}
          >
            {modalType === "Detail" ? "Tutup" : "Batal"}
          </Button>
          {modalType !== "Detail" && (
            <Button
              type="button"
              color="primary"
              className={"font-bold"}
              onPress={handleUpdateStatus}
            >
              {modalType}
            </Button>
          )}
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
  modalType: PropTypes.oneOf(["Setujui", "Tolak", "Detail", "Pilih User"])
    .isRequired,
  selectedPayout: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default CrudModal;
