'use client';

import { ModalState, useGlobalStore } from '@/global-store';

export const useModal = () => {
  const { modal, setModal } = useGlobalStore();

  const isOpen = () => {
    return modal.isOpen;
  };

  const openModal = (props: ModalState) => {
    setModal({ isOpen: true, ...props });
    (document.getElementById('modal') as HTMLDialogElement)?.showModal();
  };

  const resetModal = () => {
    setModal({ isOpen: false });
  };

  return {
    modal,
    isOpen,
    openModal,
    resetModal,
  };
};
