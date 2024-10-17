import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import UsersApi from "../../../../apis/usersApi";

export const ModalCreateAdmin = ({ isOpen, onOpenChange }) => {
  const loading = useSelector((state) => state.users.isLoading);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await toast.promise(UsersApi.createAdmin(data), {
      pending: "Create Admin...",
      success: "Create Admin successful 👌",
      error: "Create Admin failed 🤯",
    });
    onOpenChange(false);
    reset();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl' hideCloseButton={true}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1 dark:text-white'>Create Admin</ModalHeader>
            <ModalBody>
              <div className='grid sm:grid-cols-2 gap-4'>
                <div>
                  <Input
                    type='email'
                    label='Email'
                    {...register("email", {
                      required: "Email harus diisi",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Alamat Email tidak valid",
                      },
                    })}
                  />
                  {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
                </div>
                <div>
                  <Input
                    type='text'
                    label='Username'
                    {...register("username", { required: "Username harus diisi" })}
                  />
                  {errors.username && <p className='text-red-500 text-xs'>{errors.username.message}</p>}
                </div>
                <div>
                  <Input
                    type='password'
                    label='Password'
                    {...register("password", {
                      required: "Password harus diisi",
                    })}
                  />
                  {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
                </div>
                <div>
                  <Input
                    type='password'
                    label='Confirm Password'
                    {...register("confirmPassword", {
                      required: "Konfirmasi Password harus diisi",
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Your passwords do no match";
                        }
                      },
                    })}
                  />
                  {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type='reset'
                color='danger'
                onPress={() => {
                  reset();
                  onClose();
                }}
              >
                Close
              </Button>
              <Button type='submit' color='primary' disabled={loading}>
                Submit
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

ModalCreateAdmin.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
};
