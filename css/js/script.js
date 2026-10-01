document.addEventListener('DOMContentLoaded', function() {
    const childOption = document.getElementById('childOption');
    const loginForm = document.getElementById('loginForm');
    
    
    
    if (childOption) {
        childOption.classList.add('active');
    }
    
    let activeUserType = 'child';
    
    const showRegisterForm = document.getElementById('showRegisterForm');
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    
    if (showRegisterForm && loginContainer && registerContainer) {
        showRegisterForm.addEventListener('click', function(e) {
            e.preventDefault();
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        });
    }
    
    const showLoginForm = document.getElementById('showLoginForm');
    if (showLoginForm && loginContainer && registerContainer) {
        showLoginForm.addEventListener('click', function(e) {
            e.preventDefault();
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const users = JSON.parse(localStorage.getItem('studentUsers')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            showNotification('Student login successful! Redirecting...', 'success');
            
            setTimeout(function() {
                window.location.href = 'student-dashboard.html';
            }, 1500);
        } else {
            showNotification('Invalid student credentials. Please try again.', 'error');
        }
    });
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword !== confirmPassword) {
                showNotification('Passwords do not match. Please try again.', 'error');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('studentUsers')) || [];
            if (users.some(user => user.username === newUsername)) {
                showNotification('Username already exists. Please choose a different one.', 'error');
                return;
            }
            
            users.push({
                username: newUsername,
                password: newPassword
            });
            
            localStorage.setItem('studentUsers', JSON.stringify(users));
            
            showNotification('Account created successfully! You can now login.', 'success');
            
            setTimeout(function() {
                if (loginContainer && registerContainer) {
                    registerContainer.style.display = 'none';
                    loginContainer.style.display = 'block';
                }
            }, 2000);
        });
    }
    
    function showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});