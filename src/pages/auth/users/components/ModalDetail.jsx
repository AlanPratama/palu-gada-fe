import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import PropTypes from "prop-types";

export const ModalDetail = ({ isOpen, onOpenChange, selectedItem }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Detail User {selectedItem?.name}</ModalHeader>
        <ModalBody>
          <div className='grid grid-cols-3 gap-2' key={selectedItem?.id}>
            <div className='col-span-3 flex justify-center mb-2'>
              <img
                src={selectedItem?.photoUrl ?? "/astronot.png"}
                className='bg-gray-300 aspect-square rounded-2xl object-cover w-1/2'
                alt={"Photo Profile" + selectedItem?.name}
              />
            </div>
            <div>
              <p>Id</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.id ?? "-"}</p>
            </div>
            <div>
              <p>Name</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.name ?? "-"}</p>
            </div>
            <div>
              <p>District</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.districtId ?? "-"}</p>
            </div>
            <div>
              <p>Gender</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.userGender ?? "-"}</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

ModalDetail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    districtId: PropTypes.number,
    userGender: PropTypes.string,
  }),
};
