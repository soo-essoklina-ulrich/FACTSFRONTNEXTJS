'use client';

import React from 'react';
import { CircularProgress } from '@heroui/react';

const LoadingWithoutModal = ({ message = 'Chargement en cours...', padding = 'p-36' }) => {
  return (
    <div className={`flex flex-col items-center p-36 justify-items-center ${padding}`}>
      <CircularProgress size={36} />
      <h6 className="mt-2">{message}</h6>
    </div>
  );
};

export default LoadingWithoutModal;
