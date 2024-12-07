import React, { useEffect } from 'react';
import './ModalZ1.css';

const ModalZ1 = ({ isOpen, onClose, OLClose=false, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={OLClose ? onClose : undefined}>
        <div className={`modal-container ${isOpen ? 'slide-in' : ''}`}>
        {/* <button className="modal-close" onClick={onClose}>
          ×
        </button> */}
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalZ1;
