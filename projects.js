// Projects Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Projects page loaded');
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Project Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || (cardCategories && cardCategories.includes(filterValue))) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Project Modal Functions (defined globally for onclick handlers)
function openProjectModal(projectId) {
    // Modal functionality is handled in inline script in projects.html
    console.log('Opening modal for:', projectId);
}

function closeProjectModal() {
    // Modal functionality is handled in inline script in projects.html
    console.log('Closing modal');
}
