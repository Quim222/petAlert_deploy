import React from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 float-right">
          &times; {/* Icone de fechar */}
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
