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

const CrudModal = ({ isOpen, modalType, selectedPayment, onClose }) => {
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
          {modalType === "Hapus" && (
            <Card shadow="none">
              <CardHeader className="flex-col items-start pb-2">
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-xl font-bold capitalize">
                    {selectedPayment.paymentType.replace("_", " ")}
                  </h4>
                  <Chip
                    color={
                      selectedPayment.status === "CANCEL" ? "danger" : "warning"
                    }
                    variant="flat"
                    size="sm"
                  >
                    {selectedPayment.status}
                  </Chip>
                </div>
                <p className="text-small text-default-500 mt-1">
                  Pembayar: {selectedPayment.user.email}
                </p>
              </CardHeader>
              <Divider className="my-3" />
              <CardBody className="px-0 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <InfoItem
                    icon="business-outline"
                    label="Bank"
                    value={selectedPayment.bank}
                    valueClassName="uppercase"
                  />
                  <InfoItem
                    icon="cash"
                    label="Total Pembayaran"
                    value={`Rp ${selectedPayment.amount.toLocaleString()}`}
                  />
                  <InfoItem
                    icon="calendar"
                    label="Tanggal Transfer"
                    value={new Date(
                      selectedPayment.transferDate
                        .split(" ")[0]
                        .split("-")
                        .reverse()
                        .join("-") +
                        "T" +
                        selectedPayment.transferDate.split(" ")[1]
                    ).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  />
                  <InfoItem
                    icon="calendar"
                    label="Tenggat"
                    value={new Date(
                      selectedPayment.expiryTime
                    ).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    valueClassName="text-red-400"
                  />
                  <InfoItem
                    icon="card-outline"
                    label="VA Number"
                    value={selectedPayment.vaNumber}
                  />
                </div>
              </CardBody>
            </Card>
          )}
          {modalType === "Pilih User" && <UsersPage onlySelect />}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onPress={onClose}
            color="danger"
            className={modalType === "Hapus" ? "hidden" : "font-bold"}
          >
            Close
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
  modalType: PropTypes.oneOf(["Hapus", "Pilih User"]).isRequired,
  selectedPayment: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default CrudModal;
