import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReportedUsersApi from "../../../apis/reportedUsers";
import CrudModal from "./components/CrudModal";

function ReportedUserDetails() {
  const { id } = useParams();
  const { item: selectedReportedUser, isLoading } = useSelector(
    (state) => state.reportedUsers
  );
  const [modalType, setModalType] = useState("");
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const handleOpenModal = useCallback(
    (type) => {
      setModalType(type);
      onOpen();
    },
    [onOpen]
  );

  useEffect(() => {
    ReportedUsersApi.getById(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-1 mt-12 justify-center">
        <Spinner label="Memuat..." size="lg" />
      </div>
    );
  }

  if (!selectedReportedUser && !isLoading) {
    return <div>Laporan tidak ditemukan</div>;
  }

  return (
    <div className="container mx-auto">
      <Card className="mx-auto bg-gray-50 dark:bg-neutral-900">
        <CardHeader className="flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold">Detail Laporan</h2>
          <Button
            color="warning"
            variant="flat"
            startContent={<ion-icon name="warning-outline"></ion-icon>}
            className="font-bold"
            onPress={() => handleOpenModal("Peringatan")}
          >
            Beri Peringatan
          </Button>
        </CardHeader>
        <CardBody className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <CardHeader className="text-lg font-semibold mb-2 dark:text-white">
                Detail Laporan
              </CardHeader>
              <CardBody>
                <InfoItem
                  icon="document-text-outline"
                  label="ID Laporan"
                  value={selectedReportedUser.id.toString()}
                />
                <InfoItem
                  icon="calendar-outline"
                  label="Dibuat pada"
                  value={selectedReportedUser.createdAt}
                />
                <InfoItem
                  icon="chatbubbles-outline"
                  label="Pesan"
                  value={selectedReportedUser.message}
                />
              </CardBody>
            </Card>

            <Card className="p-4">
              <CardHeader className="text-lg font-semibold mb-2 dark:text-white">
                Pengguna yang Dilaporkan
              </CardHeader>
              <CardBody>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar
                    src={selectedReportedUser.reportedUser.photoUrl}
                    alt="Foto Pengguna"
                    size="lg"
                  />
                  <div>
                    <p className="font-semibold dark:text-white">
                      {selectedReportedUser.reportedUser.name || "N/A"}
                    </p>
                    <p className="text-gray-500">
                      {selectedReportedUser.reportedUser.email || "N/A"}
                    </p>
                  </div>
                </div>
                <InfoItem
                  icon="call-outline"
                  label="Telepon"
                  value={selectedReportedUser.reportedUser.phone || "N/A"}
                />
                <InfoItem
                  icon="person-outline"
                  label="Jenis Kelamin"
                  value={selectedReportedUser.reportedUser.userGender || "N/A"}
                />
                <InfoItem
                  icon="card-outline"
                  label="NIK"
                  value={selectedReportedUser.reportedUser.nik || "N/A"}
                />
                <InfoItem
                  icon="calendar-outline"
                  label="Dibuat pada"
                  value={selectedReportedUser.reportedUser.createdAt}
                />
              </CardBody>
            </Card>
          </div>

          <Divider />

          <Card className="p-4">
            <CardHeader className="text-lg font-semibold mb-2 dark:text-white">
              Pelapor
            </CardHeader>
            <CardBody>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar
                  src={selectedReportedUser.user.photoUrl}
                  alt="Foto Pengguna"
                  size="lg"
                />
                <div>
                  <p className="font-semibold dark:text-white">
                    {selectedReportedUser.user.name || "N/A"}
                  </p>
                  <p className="text-gray-500">
                    {selectedReportedUser.user.email || "N/A"}
                  </p>
                </div>
              </div>
              <InfoItem
                icon="call-outline"
                label="Telepon"
                value={selectedReportedUser.user.phone || "N/A"}
              />
              <InfoItem
                icon="person-outline"
                label="Jenis Kelamin"
                value={selectedReportedUser.user.userGender || "N/A"}
              />
              <InfoItem
                icon="calendar-outline"
                label="Dibuat pada"
                value={selectedReportedUser.user.createdAt}
              />
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      {isOpen && (
        <CrudModal
          isOpen={isOpen}
          modalType={modalType}
          selectedReportedUser={selectedReportedUser}
          onClose={() => onOpenChange(false)}
        />
      )}
    </div>
  );
}

function InfoItem({ icon, label, value, valueClassName = "" }) {
  return (
    <div className="flex items-start mb-2">
      <span className="mr-2 mt-1">
        <ion-icon name={icon} style={{ fontSize: "1.2rem" }}></ion-icon>
      </span>
      <div>
        <p className="text-sm font-semibold dark:text-white">{label}</p>
        <p className={`text-sm ${valueClassName}`}>{value}</p>
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

export default ReportedUserDetails;
