import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ModalZ1 from '../components/modal/ModalZ1'
import '../styles/loadingPage.css'
import zzzImage from '../assets/imgs/zzz.png'
import ModalButton from '../components/buttons/ModalButton'
import zelleLogo from '../assets/imgs/zelleloggo.svg'
function LoadingPage() {
    const { navigateTo, bankSearch } = useAppContext()
    const [showLoadingContent, setShowLoadingContent] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoadingContent(false)
            setIsModalOpen(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    const handleContinue = () => {
        setIsModalOpen(false)
        navigateTo(`/${bankSearch}`)
    }

    return (
        <div className="loading-page">
            {showLoadingContent && (
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <img src={zzzImage} alt="Loading" className="loading-image" />
                </div>
            )}

            <ModalZ1 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="loading-modal-content">
                    <div className="modal-body">
                        <div className="modal-logo">
                            <img src={zelleLogo} alt="Zelle" title="Zelle" />
                        </div>
                        <h3 className="aqq1">We have money for you</h3>
                        <div className="modal-main-content">
                            <p className="aqq2">You have received money through Zelle®, and we're processing the payment at the moment. Your sender registered with a Zelle® member bank that supports real-time payment processing.</p>
                            <p className="aqq2">Please select your bank to receive the money, the process usually takes few minutes.</p>
                        </div>
                    </div>
                    <div className="modal-footer aqq3">
                        <ModalButton onClick={handleContinue} name="Start Search" />
                    </div>
                </div>
            </ModalZ1>
        </div>
    )
}

export default LoadingPage
