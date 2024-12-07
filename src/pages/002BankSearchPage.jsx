import React, { useState, useEffect } from 'react'
import '../styles/BankSearchPage.css'
import zelleLogowhite from '../assets/imgs/zelleloggowhite.svg'
import { useAppContext } from '../context/AppContext'
// import ModalZ1 from '../components/modal/ModalZ1'
import ModalBS from '../components/modal/ModalBS'
import ModalButton from '../components/buttons/ModalButton'

function BankSearchPage() {
    const [searchValue, setSearchValue] = useState('')
    const { filterBankList, setBankDetails, bankDetails, navigateTo, connectBank } = useAppContext()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleContinue = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsModalOpen(false)
            setIsLoading(false)
            navigateTo(`/${connectBank}`)
        }, 4000)
    }

    const handleBankSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearch = (item) => {
        // get the value of the one clicked
        const bankName = item?.name
        const bankImage = item?.link
        //    console.log(bankName, bankImage)
        setBankDetails({ name: bankName, image: bankImage })
    }

    useEffect(() => {
        document.title = `Find Your Bank | Zelle`;
        if (bankDetails) {
            setIsModalOpen(true)
            setSearchValue('');
            handleBankSearch({ target: { value: '' } });
        } else {
            console.log('no bank details')
        }
    }, [bankDetails])


    return (
        <div className="bank-search-page">
            {/* Header Section */}
            <div className="header-main-section">
                <div className="header-section">
                    <span className="zelle-logo-container">
                        <img src={zelleLogowhite} alt="Zelle" className="zelle-logo" />
                    </span>
                    <span>Find Your Bank</span>
                </div>
            </div>

            {/* Search Input Section */}
            <div className="search-section">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter your bank's name"
                    value={searchValue}
                    onChange={handleBankSearch}
                />
                {searchValue && (
                    <button
                        className="clear-search-button"
                        onClick={() => {
                            setSearchValue('');
                            handleBankSearch({ target: { value: '' } });
                        }}
                    >
                        ✕
                    </button>
                )}
            </div>
            <div id="bankListResults" className="bank-list-results">
                {filterBankList(searchValue).map((item, index) => (
                    <div key={index} className="bank-list-item" onClick={() => handleSearch(item)}>
                        <p className="ags12BLI" style={{ cursor: 'pointer' }}>{item.name}</p>
                    </div>
                ))}
            </div>
            <main className="main-section">

                {/* What Next Section */}
                <div className="what-next-section">
                    <h2>What next?</h2>
                    <p className="instructions">
                        Please enter your bank name in the text field above to find your bank, the process
                        usually takes few minutes. You must have a bank account in the U.S. to use Zelle®.
                        Transactions typically occur in minutes when the recipient's email address or U.S.
                        mobile number is already enrolled with Zelle® or U.S. bank account.
                    </p>
                </div>
            </main>

            <footer>
                <div className="footer-content">
                    <div className="footer-logo-social">
                        <div className="footer-loggo-item">
                            <img src={zelleLogowhite} alt="Z" className="z" />
                        </div>
                        <div className="footer-links">
                            <a href="#">Contact Us</a>
                            <a href="#">Partners</a>
                            <a href="#">Press</a>
                            <a href="#">Legal</a>
                            <a href="#">Your Privacy Rights</a>
                        </div>
                        <div className="social-links">
                            <a href="#" className="twitter">Twitter</a>
                            <a href="#" className="facebook">Facebook</a>
                            <a href="#" className="instagram">Instagram</a>
                            <a href="#" className="youtube">YouTube</a>
                        </div>
                    </div>

                    <div className="footer-text">
                        <p className="footer-note">
                            ¹Must have a bank account in the U.S. to use Zelle®. Transactions typically occur in minutes when the recipient's email address
                            or U.S. mobile number is already enrolled with Zelle®
                        </p>
                        <p className="copyright">
                            ©{new Date().getFullYear()} Early Warning Services, LLC. All rights reserved. Zelle and the Zelle related marks are property of Early Warning
                            Services, LLC. Other product and company names mentioned herein are the property of their respective owners.
                        </p>
                    </div>
                </div>
            </footer>
            <ModalBS isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} OLClose={true} Header="Great News!">
                {/* <ModalBS isOpen={true} onClose={() => setIsModalOpen(false)} OLClose={true} Header="Great News!"> */}
                <div className="modal-content-bs">
                    <div className="modal-bodybs">
                        <div className="modal-logo">
                        </div>
                        <h3 className="modal-content-title">{bankDetails?.name} offers Zelle®</h3>
                        <img src={bankDetails?.image} alt={bankDetails?.name} className="modal-bank-logo" />
                        <div className="modal-main-contentbs ">
                            <p className="ags12">Your bank offers Zelle®!  You can use your online banking details to receive the money.</p>
                            <p className="ags12b">By selecting “Continue to your bank”, you will be taken to a secure interface with a secure privacy and security policy measure.</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <ModalButton onClick={handleContinue} name="Continue to your bank" isLoading={isLoading} disabled={isLoading} />
                        {/* <ModalButton onClick={handleContinue} name="Continue to your bank" isLoading={isLoading} disabled={isLoading} /> */}
                    </div>
                    <div className="modal-close-bs"
                        style={{
                            marginTop: '1rem',
                            fontSize: '1rem',
                        }}>
                        <a onClick={() => {
                            setIsModalOpen(false)
                            setSearchValue('')
                            handleBankSearch({ target: { value: '' } })
                            setBankDetails(null)
                        }}
                            style={{
                                cursor: 'pointer',
                                color: '#0066cc',
                                textDecoration: 'underline'
                            }}>
                            Cancel
                        </a>
                    </div>
                </div>
            </ModalBS>
        </div>
    )
}

export default BankSearchPage