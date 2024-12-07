import React from 'react'
import './ModalButton.css'
function ModalButton({ onClick, name, isLoading, disabled }) {
    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            className="modal-button"
        >
            {isLoading ? (
                <div className="button-content">
                    <span className="spinner"></span>
                    <span>Loading...</span>
                </div>
            ) : name}
        </button>
    )
}

export default ModalButton 