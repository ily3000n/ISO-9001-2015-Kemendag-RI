import React, { FC, ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
          <div className="bg-white p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
