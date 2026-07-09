document.querySelectorAll('.tip-indicator').forEach(indicator => {
    const content = indicator.querySelector('.tip-content');
    if (!content) return;

    indicator.addEventListener('mouseenter', () => {
        const rect = indicator.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const contentWidth = 274;

        let top = rect.bottom;
        let left = 0;

        if (rect.left < windowWidth / 2) {
            left = rect.left;
            content.classList.remove('is-left');
            content.classList.add('is-right');

            if (left + contentWidth > windowWidth) {
                left = windowWidth - contentWidth - 16;
            }
        } else {
            left = rect.right - contentWidth;
            content.classList.remove('is-right');
            content.classList.add('is-left');

            if (left < 16) {
                left = 16;
            }
        }

        content.style.top = `${top}px`;
        content.style.left = `${left}px`;
    });
});
