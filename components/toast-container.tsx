'use client';

import React, { useContext } from 'react';
import Toast from '@/components/toast';
import { GlobalContext } from '@/global-context';

const ToastContainer = () => {
  const { toastsState } = useContext(GlobalContext);
  const [toasts] = toastsState;

  return (
    <div className="toast toast-center cursor-pointer">
      {toasts.length > 0 &&
        toasts.map((toast, i) => <Toast key={i} id={toast.id} title={toast.title} status={toast.status} />)}
    </div>
  );
};

export default ToastContainer;
