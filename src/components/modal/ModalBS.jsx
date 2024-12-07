import React, { useEffect } from 'react';
import './ModalBS.css';

const ModalBS = ({ isOpen, onClose, OLClose=false, Header, children }) => {
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
      <div className="modal-overlaybs" >
      {/* <div className="modal-overlaybs" onClick={OLClose ? onClose : undefined}> */}
        
        <div className={`modal-containerbs ${isOpen ? 'slide-in' : ''}`}>
        <div className="modal-headerbs">
            <h1 className="modal-header-titleMBS">{Header}</h1>
        </div>
        {/* <button className="modal-close" onClick={onClose}>
          ×
        </button> */}
          <div className="modal-contentbs">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBS;
