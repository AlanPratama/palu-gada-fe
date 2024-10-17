import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { UsersPage } from "../../users/UsersPage";

const CrudModal = ({ isOpen, modalType, onClose, selectedReportedUser }) => {
  const [selectedMethod, setSelectedMethod] = useState("Email");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const { email, phone } = selectedReportedUser.reportedUser;
    const selectedValue = Array.from(selectedMethod)[0];

    if (selectedValue === "Email") {
      window.open("mailto:" + email);
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
      window.open(whatsappUrl, "_blank");
    }
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
          <span className="dark:text-white">{modalType} Laporan Pengguna</span>
        </ModalHeader>
        <ModalBody>
          {modalType === "Pilih User" && <UsersPage onlySelect />}
          {modalType === "Peringatan" && (
            <div className="flex flex-col gap-4">
              <Select
                className="dark:text-white"
                label="Metode Pengiriman"
                selectedKeys={selectedMethod}
                onSelectionChange={setSelectedMethod}
              >
                <SelectItem className="dark:text-white" key="Email">
                  Kirim melalui email
                </SelectItem>
                <SelectItem className="dark:text-white" key="Phone">
                  Kirim melalui WhatsApp
                </SelectItem>
              </Select>
              <Textarea
                label="Pesan"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onPress={onClose}
            color="danger"
            className="font-bold"
          >
            Tutup
          </Button>
          {modalType === "Peringatan" && (
            <Button
              color="primary"
              className="font-bold"
              onPress={handleSendMessage}
            >
              Kirim
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CrudModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.oneOf(["Pilih User", "Peringatan"]).isRequired,
  onClose: PropTypes.func.isRequired,
  selectedReportedUser: PropTypes.object.isRequired,
};

export default CrudModal;
