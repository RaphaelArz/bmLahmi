document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Optionally unobserve after the animation has been applied
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.fade-in');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});
