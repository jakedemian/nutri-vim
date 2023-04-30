/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, ReactNode } from 'react';

import AddEntryModal from 'src/common/AddEntryModal';
import ClearDayModal from 'src/common/ClearDayModal';

interface ModalContextType {
  showAddEntryModal: () => void;
  hideAddEntryModal: () => void;
  showClearDayModal: () => void;
  hideClearDayModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  showAddEntryModal: () => {},
  hideAddEntryModal: () => {},
  showClearDayModal: () => {},
  hideClearDayModal: () => {},
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [addEntryModalVisible, setAddEntryModalVisible] = useState(false);
  const [clearDayModalVisible, setClearDayModalVisible] = useState(false);

  // TODO can I just inline these in the contextValue?
  const showAddEntryModal = () => {
    setAddEntryModalVisible(true);
  };

  const hideAddEntryModal = () => {
    setAddEntryModalVisible(false);
  };

  const showClearDayModal = () => {
    setClearDayModalVisible(true);
  };

  const hideClearDayModal = () => {
    setClearDayModalVisible(false);
  };

  const contextValue: ModalContextType = {
    showAddEntryModal,
    hideAddEntryModal,
    showClearDayModal,
    hideClearDayModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      <AddEntryModal hide={hideAddEntryModal} visible={addEntryModalVisible} />

      <ClearDayModal hide={hideClearDayModal} visible={clearDayModalVisible} />
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
