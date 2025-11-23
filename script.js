document.addEventListener('DOMContentLoaded', function() {
    // Initial load of dashboard content
    loadContent('dashboard');

    // Add event listeners to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionName = this.getAttribute('data-section');
            if (sectionName) {
                loadContent(sectionName);
                updateActiveNavLink(this);
            }
        });
    });

    // Initialize Dashboard animations
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });

    // Add interactive features to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Function to toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    
    // For mobile
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('open');
    }
}

// Function to load content dynamically
async function loadContent(sectionName) {
    const mainContentArea = document.getElementById('main-content-area');
    try {
        const response = await fetch(`sections/${sectionName}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        mainContentArea.innerHTML = html;
    } catch (error) {
        console.error('Error loading content:', error);
        mainContentArea.innerHTML = `<div class="content-section"><h2 class="section-title">Error</h2><p>Gagal memuat konten untuk ${sectionName}.</p></div>`;
    }
}

// Function to update active navigation link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Logout Function
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar dari sistem?')) {
        alert('Anda berhasil logout. Terima kasih!');
        // In real application, redirect to login page
        // window.location.href = 'login.html';
    }
}

// Handle Window Resize
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
    }
});