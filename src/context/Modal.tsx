// src/context/ModalContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define a type for the modal context
interface ModalContextType {
  modals: React.ReactNode[];
  pushModal: (modal: React.ReactNode) => void;
  popModal: () => void;
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal Provider component
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<React.ReactNode[]>([]);

  // Push a new modal onto the stack
  const pushModal = (modal: React.ReactNode) => {
    setModals((prev) => [...prev, modal]);
  };

  // Pop the last modal from the stack
  const popModal = () => {
    setModals((prev) => prev.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ modals, pushModal, popModal }}>
      {children}
      {/* Render the modals */}
      {modals.length > 0 && (
        <div className="modal-container">
          {modals.map((modal, index) => (
            <div key={index} className="absolute bg-[#00000060] w-[100vw] h-[100vh] top-0 z-10 md:items-center md:justify-center flex items-end">
              <div className='w-full md:w-[40vw] md:max-h-[60vh] max-h-[80vh] bg-[#fff] rounded-md pb-[24px]'>
                {modal}
              </div>
            </div>
          ))}
        </div>
      )}
    </ModalContext.Provider>
  );
};

// Hook to use modal context
export const useModals = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
};
