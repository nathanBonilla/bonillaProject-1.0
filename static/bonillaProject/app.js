const menu = document.querySelector('#mobile_menu');
const menuLinks = document.querySelector('nav ul');
const navLogo = document.querySelector('#logo');

// Display Mobile Menu
const mobileMenu = () => {
    menuLinks.classList.toggle('active');
}

const hideMobileMenu = () => {
    if(window.innerWidth <= 1110)
        menuLinks.classList.remove('active');
};

menu.addEventListener('click', mobileMenu)
menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

// Slideshow implementation
const track = document.querySelector('.slide_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.slide_button-right');
const prevButton = document.querySelector('.slide_button-left');
const slideIndicator = document.querySelector('.slide_nav');
const indicators = Array.from(slideIndicator.children)

const slideWidth = slides[0].getBoundingClientRect().width;

// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateIndicators = (currentIndicator, targetIndicator) => {
    currentIndicator.classList.remove('current-slide');
    targetIndicator.classList.add('current-slide');
}

const arrowDisplay = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0)
    {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }

    else if(targetIndex === slides.length - 1)
    {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }

    else
    {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling;
    const currentIndicator = slideIndicator.querySelector('.current-slide');
    const nextIndicator = currentIndicator.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    moveToSlide(track, currentSlide, nextSlide);
    updateIndicators(currentIndicator, nextIndicator);
    arrowDisplay(slides, prevButton, nextButton, nextIndex)
})

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling;
    const currentIndicator = slideIndicator.querySelector('.current-slide');
    const prevIndicator = currentIndicator.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    moveToSlide(track, currentSlide, prevSlide)
    updateIndicators(currentIndicator, prevIndicator);
    arrowDisplay(slides, prevButton, nextButton, prevIndex)
})

slideIndicator.addEventListener('click', e => {
    const targetIndicator = e.target.closest('button');

    if(!targetIndicator) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentIndicator = slideIndicator.querySelector('.current-slide');
    const targetIndex = indicators.findIndex(indicator => indicator === targetIndicator);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateIndicators(currentIndicator, targetIndicator);
    arrowDisplay(slides, prevButton, nextButton, targetIndex);
})
