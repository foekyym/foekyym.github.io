// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('block');
        });
    }

    

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation for reservation
    const reservationForm = document.querySelector('#contacto form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error').forEach(el => {
                el.classList.remove('error');
            });
            document.querySelectorAll('.error-message').forEach(el => {
                el.remove();
            });

            // Name validation
            if (!nombre.value.trim()) {
                nombre.classList.add('error');
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message text-red-500 text-sm mt-1';
                errorMsg.textContent = 'Por favor ingresa tu nombre';
                nombre.parentNode.appendChild(errorMsg);
                isValid = false;
            }

            // Email validation
            if (!/^\S+@\S+\.\S+$/.test(email.value)) {
                email.classList.add('error');
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message text-red-500 text-sm mt-1';
                errorMsg.textContent = 'Por favor ingresa un email válido';
                email.parentNode.appendChild(errorMsg);
                isValid = false;
            }

            if (isValid) {
                // Form submission would go here
                alert('Reserva enviada con éxito! Nos pondremos en contacto contigo pronto.');
                reservationForm.reset();
            }
        });
    }   

    // Add hover effects to menu items
    const menuItems = document.querySelectorAll('#menu .bg-white');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('transform', 'scale-105');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('transform', 'scale-105');
        });
    });
});