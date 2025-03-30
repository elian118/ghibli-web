import React from 'react';
import { ToastProps } from '@/types';
import { useToast } from '@/hooks/useToast';

const Toast = ({ title, status, id }: ToastProps) => {
  const { removeToast } = useToast();
  return (
    <div
      id={id}
      className={`alert ${status}`}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        removeToast(e.currentTarget.id);
      }}
    >
      {title}
    </div>
  );
};

export default Toast;
