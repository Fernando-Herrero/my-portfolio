document.querySelectorAll('.read-more-btn').forEach(btn => {
    const icon = btn.querySelector('i');
    
    btn.addEventListener('click', () => {
        const projectCard = btn.closest('.project');
        const isExpanded = projectCard.classList.toggle('expanded');
        
        icon.classList.remove(isExpanded ? 'fa-chevron-down' : 'fa-chevron-up');
        icon.classList.add(isExpanded ? 'fa-chevron-up' : 'fa-chevron-down');
        
        btn.firstChild.textContent = isExpanded ? 'Read less ' : 'Read more ';
        
        if (isExpanded) {
            setTimeout(() => projectCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 350);
        }
    });
});
