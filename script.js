const carousel = document.querySelector('.carousel1');
const cards = document.querySelectorAll('.card');
let currentIndex = 0;
let isDragging = false;
let startY = 0;

// Initialize the positions of the cards
function updateCardPositions() {
    cards.forEach((card, index) => {
        card.classList.remove('focused', 'above', 'below');

        if (index === currentIndex) {
            card.classList.add('focused');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('above');
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('below');
        }
    });
}

// Handle drag start
function onDragStart(event) {
    if (!event.target.classList.contains('card')) return; // Only drag cards
    isDragging = true;
    startY = event.touches ? event.touches[0].clientY : event.clientY;
}

// Handle drag move
function onDragMove(event) {
    if (!isDragging) return;

    const currentY = event.touches ? event.touches[0].clientY : event.clientY;
    const deltaY = currentY - startY;

    // Update transform of the focused card
    const focusedCard = cards[currentIndex];
    focusedCard.style.transform = `translateY(${deltaY}px) translateZ(200px)`;
}

// Handle drag end
function onDragEnd(event) {
    if (!isDragging) return;
    isDragging = false;

    const endY = event.touches ? event.touches[0].clientY : event.clientY;
    const deltaY = endY - startY;

    // Determine swipe direction
    if (deltaY < -50) {
        // Swipe up, move to next card
        currentIndex = (currentIndex + 1) % cards.length;
    } else if (deltaY > 50) {
        // Swipe down, move to previous card
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }

    // Reset transforms and update positions
    cards.forEach((card) => {
        card.style.transition = 'transform 0.5s ease'; // Smooth transition
        card.style.transform = ''; // Reset transform
    });

    setTimeout(() => {
        // Remove the transition after resetting
        cards.forEach((card) => (card.style.transition = ''));
        updateCardPositions();
    }, 500); // Match the transition time
}

// Attach event listeners
carousel.addEventListener('mousedown', onDragStart);
carousel.addEventListener('touchstart', onDragStart);
document.addEventListener('mousemove', onDragMove);
document.addEventListener('touchmove', onDragMove);
document.addEventListener('mouseup', onDragEnd);
document.addEventListener('touchend', onDragEnd);

// Initialize the carousel
updateCardPositions();
