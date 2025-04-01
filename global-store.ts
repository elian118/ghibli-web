import React from 'react';
import { ToastProps } from '@/types';
import { create } from 'zustand/react';

export type ModalState = {
  isOpen?: boolean;
  title?: string;
  body?: string | React.ReactNode;
  confirm?: boolean;
  action?: () => void;
};

export type GlobalState = {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  isMobileDevice: boolean;
  setIsMobileDevice: (val: boolean) => void;
  isOpenMobileMenu: boolean;
  setIsOpenMobileMenu: (val: boolean) => void;
  modal: ModalState;
  setModal: (val: ModalState) => void;
  toasts: ToastProps[];
  setToasts: (toasts: ToastProps[]) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  isDark: false,
  setIsDark: (val) => set({ isDark: val }),
  isMobileDevice: false,
  setIsMobileDevice: (val) => set({ isMobileDevice: val }),
  isOpenMobileMenu: false,
  setIsOpenMobileMenu: (val) => set({ isOpenMobileMenu: val }),
  modal: { isOpen: false },
  setModal: (val) => set({ modal: val }),
  toasts: [],
  setToasts: (toasts) => set({ toasts }),
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));
