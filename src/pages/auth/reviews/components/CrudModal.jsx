import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import PostsPage from "../../posts/PostsPage";
import { UsersPage } from "../../users/UsersPage";

const CrudModal = ({
  isOpen,
  modalType,
  selectedReview,
  onClose,
  onSubmit,
}) => {
  const ratingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<ion-icon key={`full-${i}`} name="star" />);
    }

    if (hasHalfStar) {
      stars.push(<ion-icon key="half" name="star-half" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<ion-icon key={`empty-${i}`} name="star-outline" />);
    }

    return <>{stars}</>;
  };

  const handleSubmit = (id) => {
    onSubmit(id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size={
        modalType === "Pilih User"
          ? "4xl"
          : modalType === "Pilih Postingan"
          ? "4xl"
          : "md"
      }
    >
      <ModalContent>
        <ModalHeader>
          <span className="dark:text-white">{modalType} Ulasan</span>
        </ModalHeader>
        <ModalBody>
          {modalType === "Hapus" && (
            <h1 className="dark:text-white">
              Anda yakin ingin menghapus ulasan{" "}
              <span className="text-red-500">
                {ratingStars(selectedReview.rating)} {selectedReview.comment}
              </span>
              ?
            </h1>
          )}
          {modalType === "Pilih User" && <UsersPage onlySelect />}
          {modalType === "Pilih Postingan" && <PostsPage onlySelect />}
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            onPress={() => handleSubmit(selectedReview.id)}
            color="danger"
            className={modalType === "Hapus" ? "font-bold" : "hidden"}
          >
            Hapus
          </Button>
          <Button
            type="button"
            onPress={onClose}
            color="primary"
            className="font-bold"
          >
            {modalType === "Hapus" ? "Batal" : "Tutup"}
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
  modalType: PropTypes.oneOf(["Hapus", "Pilih User", "Pilih Postingan"])
    .isRequired,
  selectedReview: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CrudModal;
