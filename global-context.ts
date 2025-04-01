import React, { createContext } from 'react';
import { ToastProps } from '@/types';

export type ModalState = {
  isOpen?: boolean;
  title?: string;
  body?: string | React.ReactNode;
  confirm?: boolean;
  action?: () => void;
};

export type GlobalContextType = {
  isDarkState: [boolean, (val: boolean) => void];
  isMobileDeviceState: [boolean, (val: boolean) => void];
  isOpenMobileMenuState: [boolean, (val: boolean) => void];
  modalState: [modal: ModalState, setModal: (val: ModalState) => void];
  toastsState: [toasts: ToastProps[], setToasts: (toasts: ToastProps[]) => void];
  accessTokenState: [accessToken: string | null, setAccessToken: (token: string | null) => void];
};

export const initModal: ModalState = {
  isOpen: false,
};

export const initGlobalContext: GlobalContextType = {
  isDarkState: [false, () => {}],
  isMobileDeviceState: [false, () => {}],
  isOpenMobileMenuState: [false, () => {}],
  modalState: [{ isOpen: false }, () => {}],
  toastsState: [[], () => {}],
  accessTokenState: [null, () => {}],
};

export const GlobalContext: React.Context<GlobalContextType> = createContext(initGlobalContext);
