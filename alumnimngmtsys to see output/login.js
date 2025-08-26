class LoginSystem {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.setupDemoAccounts();
    }

    initializeElements() {
        this.loginForm = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.loginBtn = document.getElementById('loginBtn');
        this.successModal = document.getElementById('successModal');
        this.userRoleSpan = document.getElementById('userRole');
        this.demoAccounts = document.querySelectorAll('.demo-account');
        
        // User credentials database (in real app, this would be server-side)
        this.users = {
            'superadmin@alumni.edu': { password: 'super123', role: 'Super Admin', dashboard: 'super-admin-dashboard.html' },
            'admin@alumni.edu': { password: 'admin123', role: 'Admin', dashboard: 'admin-dashboard.html' },
            'registrar@alumni.edu': { password: 'reg123', role: 'Registrar', dashboard: 'registrar-dashboard.html' },
            'alumni@alumni.edu': { password: 'alumni123', role: 'Alumni', dashboard: 'alumni-dashboard.html' },
            'jobmanager@alumni.edu': { password: 'job123', role: 'Job Manager', dashboard: 'job-manager-dashboard.html' },
            'eventmanager@alumni.edu': { password: 'event123', role: 'Event Manager', dashboard: 'event-manager-dashboard.html' },
            'finance@alumni.edu': { password: 'finance123', role: 'Finance Officer', dashboard: 'finance-dashboard.html' }
        };
    }

    setupEventListeners() {
        // Password toggle functionality
        this.passwordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });

        // Form submission
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Enter key support for inputs
        this.emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.passwordInput.focus();
            }
        });

        this.passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        });

        // Modal close functionality
        this.successModal.addEventListener('click', (e) => {
            if (e.target === this.successModal) {
                this.closeModal();
            }
        });
    }

    setupDemoAccounts() {
        this.demoAccounts.forEach(account => {
            account.addEventListener('click', () => {
                const email = account.getAttribute('data-email');
                const password = account.getAttribute('data-password');
                
                // Fill in the form with demo credentials
                this.emailInput.value = email;
                this.passwordInput.value = password;
                
                // Add visual feedback
                account.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    account.style.transform = 'translateY(-2px)';
                }, 150);
                
                // Focus on login button
                this.loginBtn.focus();
            });
        });
    }

    togglePasswordVisibility() {
        const isPassword = this.passwordInput.type === 'password';
        const icon = this.passwordToggle.querySelector('i');
        
        if (isPassword) {
            this.passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            this.passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    async handleLogin() {
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;

        // Basic validation
        if (!email || !password) {
            this.showError('Please fill in all fields');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Simulate API call delay
            await this.delay(1500);
            
            // Authenticate user
            const user = this.authenticateUser(email, password);
            
            if (user) {
                this.handleSuccessfulLogin(user);
            } else {
                this.showError('Invalid email or password');
            }
        } catch (error) {
            this.showError('Login failed. Please try again.');
            console.error('Login error:', error);
        } finally {
            this.setLoadingState(false);
        }
    }

    authenticateUser(email, password) {
        const user = this.users[email.toLowerCase()];
        
        if (user && user.password === password) {
            return {
                email: email,
                role: user.role,
                dashboard: user.dashboard
            };
        }
        
        return null;
    }

    handleSuccessfulLogin(user) {
        // Store user session (in real app, use secure tokens)
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('loginTime', new Date().toISOString());
        
        // Show success modal
        this.userRoleSpan.textContent = user.role;
        this.successModal.style.display = 'block';
        
        // Redirect after delay
        setTimeout(() => {
            this.redirectToDashboard(user);
        }, 2000);
    }

    redirectToDashboard(user) {
        // In a real application, you would redirect to actual dashboard pages
        // For demo purposes, we'll show an alert and reload
        
        const dashboardUrls = {
            'Super Admin': 'super-admin-dashboard.html',
            'Admin': 'admin-dashboard.html',
            'Registrar': 'registrar-dashboard.html',
            'Alumni': 'alumni-dashboard.html',
            'Job Manager': 'job-manager-dashboard.html',
            'Event Manager': 'event-manager-dashboard.html',
            'Finance Officer': 'finance-dashboard.html'
        };

        const targetUrl = dashboardUrls[user.role];
        
        // For demo - show alert with redirect info
        alert(`Redirecting to ${user.role} Dashboard\nTarget URL: ${targetUrl}\n\nIn a real application, you would be redirected to: ${targetUrl}`);
        
        // In production, uncomment the line below:
        // window.location.href = targetUrl;
        
        // For demo, just reload the page
        this.closeModal();
        this.resetForm();
    }

    setLoadingState(isLoading) {
        const btnText = this.loginBtn.querySelector('.btn-text');
        const spinner = this.loginBtn.querySelector('.loading-spinner');
        
        if (isLoading) {
            this.loginBtn.classList.add('loading');
            this.loginBtn.disabled = true;
            btnText.style.display = 'none';
            spinner.style.display = 'block';
        } else {
            this.loginBtn.classList.remove('loading');
            this.loginBtn.disabled = false;
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
        }
    }

    showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        // Add error styles
        errorDiv.style.cssText = `
            background: #fee;
            color: #c33;
            padding: 12px 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid #fcc;
            animation: shake 0.5s ease-in-out;
        `;

        // Insert error message before the login button
        this.loginBtn.parentNode.insertBefore(errorDiv, this.loginBtn);
        
        // Add shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);

        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);

        // Shake the form
        this.loginForm.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.loginForm.style.animation = '';
        }, 500);
    }

    closeModal() {
        this.successModal.style.display = 'none';
    }

    resetForm() {
        this.loginForm.reset();
        this.passwordInput.type = 'password';
        const icon = this.passwordToggle.querySelector('i');
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Utility functions for session management
class SessionManager {
    static getCurrentUser() {
        const userStr = sessionStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    static logout() {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('loginTime');
        window.location.href = 'index.html';
    }

    static getLoginTime() {
        return sessionStorage.getItem('loginTime');
    }
}

// Initialize the login system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (SessionManager.isLoggedIn()) {
        const user = SessionManager.getCurrentUser();
        const loginTime = new Date(SessionManager.getLoginTime());
        const now = new Date();
        const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
        
        // Auto-logout after 24 hours
        if (hoursSinceLogin > 24) {
            SessionManager.logout();
        } else {
            // Ask if user wants to continue with existing session
            if (confirm(`You're already logged in as ${user.role}. Continue to dashboard?`)) {
                // Redirect to appropriate dashboard
                alert(`Redirecting to ${user.role} Dashboard`);
                // window.location.href = user.dashboard; // Uncomment in production
            } else {
                SessionManager.logout();
            }
        }
    }
    
    // Initialize login system
    new LoginSystem();
});

// Add some additional utility functions
window.LoginUtils = {
    // Function to add new demo user (for testing)
    addDemoUser: function(email, password, role, dashboardUrl) {
        console.log('Demo user added:', { email, role });
        // In real app, this would make an API call
    },
    
    // Function to validate password strength
    validatePasswordStrength: function(password) {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        
        return {
            isValid: password.length >= minLength,
            strength: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers ? 'strong' : 'weak',
            suggestions: []
        };
    }
};
