'use client';

import { useContext, useEffect } from 'react';
import { ToastProps } from '@/types';
import { GlobalContext } from '@/global-context';
import { v4 } from 'uuid';

export const useToast = () => {
  const { toastsState } = useContext(GlobalContext);
  const [toasts, setToasts] = toastsState;

  const toast = (newToast: ToastProps) => {
    const uid = v4();
    setToasts([...toasts, { id: uid, ...newToast }]);
    document.getElementById(uid)?.classList.add('slideUpAnimation');
  };

  const removeToast = (id: string) => {
    const restToast = toasts.filter((toast) => toast.id !== id);
    document.getElementById(id)?.classList.remove('slideUpAnimation');
    document.getElementById(id)?.classList.add('fadeOutAnimation');

    const removeToastTimer = setTimeout(() => {
      setToasts(restToast);
      clearTimeout(removeToastTimer);
    }, 500);
  };

  useEffect(() => {
    const itv = setInterval(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id!);
      } else {
        clearInterval(itv);
      }
    }, 5000);

    return () => {
      clearInterval(itv);
    };
  }, [toasts.length]);

  return {
    toast,
    removeToast,
  };
};
