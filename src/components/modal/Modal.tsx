import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, close, children }: ModalProps): JSX.Element => {
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-start justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="max-w-lg space-y-4 bg-white">
          <DialogTitle className="font-bold text-center bg-gray-300">
            Title will go here
          </DialogTitle>
          <div className="text-sm p-4">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
