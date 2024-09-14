import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export const ModalDetail = ({ isOpen, onOpenChange, selectedItem }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Detail User {selectedItem?.username}</ModalHeader>
        <ModalBody>
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-3 flex justify-center mb-2'>
              <img
                src={selectedItem?.photoUrl ?? "/astronot.png"}
                className='bg-gray-300 aspect-square rounded-2xl object-cover w-1/2'
                alt={"Photo Profile" + selectedItem?.username}
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
              <p>Username</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.username ?? "-"}</p>
            </div>
            <div>
              <p>Email</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.email ?? "-"}</p>
            </div>
            {selectedItem?.roles.map((item, index) => (
              <>
                <div key={item.id}>
                  <p>Role {index + 1}</p>
                </div>
                <div className='col-span-2'>
                  <p>{item?.name ?? "-"}</p>
                </div>
              </>
            ))}
            <div>
              <p>Address</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.address ?? "-"}</p>
            </div>
            <div>
              <p>Balance</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.balance ?? "-"}</p>
            </div>
            <div>
              <p>Birth Date</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.birthDate ?? "-"}</p>
            </div>
            <div>
              <p>District</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.district ?? "-"}</p>
            </div>
            <div>
              <p>Phone</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.phone ?? "-"}</p>
            </div>
            <div>
              <p>Gender</p>
            </div>
            <div className='col-span-2'>
              <p>{selectedItem?.userGender ?? "-"}</p>
            </div>
            <div>
              <p>Create At</p>
            </div>
            <div className='col-span-2'>
              <p>{`${new Date(selectedItem?.createdAt).toLocaleDateString("id-ID")} ${new Date(selectedItem?.createdAt).toLocaleTimeString(
                "id-ID"
              )}`}</p>
            </div>
            <div>
              <p>Update At</p>
            </div>
            <div className='col-span-2'>
              <p>{`${new Date(selectedItem?.updatedAt).toLocaleDateString("id-ID")} ${new Date(selectedItem?.updatedAt).toLocaleTimeString(
                "id-ID"
              )}`}</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
