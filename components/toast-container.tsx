'use client';

import React from 'react';
import Toast from '@/components/toast';
import { useGlobalStore } from '@/global-store';

const ToastContainer = () => {
  const { toasts } = useGlobalStore();

  return (
    <div className="toast toast-center cursor-pointer">
      {toasts.length > 0 &&
        toasts.map((toast, i) => <Toast key={i} id={toast.id} title={toast.title} status={toast.status} />)}
    </div>
  );
};

export default ToastContainer;
