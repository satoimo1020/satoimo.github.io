window.addEventListener('DOMContentLoaded', () => {
    const tocLinks = document.querySelectorAll('.sidebar a');

    const sections = Array.from(tocLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function spyScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const triggerOffset = 140;

        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition + triggerOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', spyScroll);
    spyScroll();
});
