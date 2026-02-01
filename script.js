const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const question = document.querySelector('.question');
const icon = document.getElementById('main-icon');
const caption = document.getElementById('no-caption');
const buttonContainer = document.querySelector('.button-container');
const card = document.querySelector('.card');

// State to track if the no button has moved
let hasMoved = false;

// Yes Button Click Event
yesBtn.addEventListener('click', () => {
    // Explicitly remove the No button and proximity listeners
    noBtn.remove();
    // Also disable the event listeners by removing the element references or using a flag
    // (Since we replace innerHTML, the original noBtn element is detached, but let's be safe)
    
    // Change the content of the card
    card.innerHTML = `
        <div class="video-container success-message">
            <video autoplay loop muted controls playsinline class="cute-video">
                <source src="./11.mp4" type="video/mp4">
                <p>Your browser does not support the video tag.</p>
            </video>
        </div>
        <h1 class="question success-text">Yay! 💖<br>I knew you'd say yes!</h1>
        <p style="color: #666; margin-top: 10px;">Best Valentine Ever!</p>
    `;
    
    // Launch confetti
    createConfetti();
});

// No Button Interaction (Desktop: Mouseover, Mobile: Touchstart/Click)
const moveNoButton = () => {
    // Get card dimensions
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate boundaries with safety margin
    // We want the button to stay INSIDE the card, so we need to account for its width/height
    // AND the card's padding if we want to be nice, but strictly it just needs to be in the box.
    // However, clientWidth includes padding.
    // Let's use a margin of 20px from the edges.
    const margin = 20;
    
    const cardWidth = card.clientWidth;
    const cardHeight = card.clientHeight;
    
    // If the button hasn't been moved yet, it might not have absolute positioning dimensions calculated correctly
    // relative to the parent if we rely on offsets.
    // But offsetWidth/offsetHeight should be correct.
    
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    const maxX = cardWidth - btnWidth - margin;
    const maxY = cardHeight - btnHeight - margin;
    const minX = margin;
    const minY = margin;
    
    // Generate random position
    const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;
    
    // Apply new position
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    
    // Ensure button is a direct child of card for correct positioning context
    if (noBtn.parentNode !== card) {
        card.appendChild(noBtn);
    }
    
    // Show caption if it's the first time
    if (!hasMoved) {
        caption.style.opacity = '1';
        hasMoved = true;
    }
};

// Proximity detection
document.addEventListener('mousemove', (e) => {
    if (noBtn.disabled) return; // If we ever disable it
    
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    
    const distanceX = e.clientX - btnCenterX;
    const distanceY = e.clientY - btnCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Trigger distance
    const triggerDistance = 150; // Pixels
    
    if (distance < triggerDistance) {
        moveNoButton();
    }
});

// Mobile touch handling - if they touch anywhere near it
document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    
    const distanceX = touch.clientX - btnCenterX;
    const distanceY = touch.clientY - btnCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < 150) { // Same threshold
        e.preventDefault(); // Prevent click
        moveNoButton();
    }
}, { passive: false });

noBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent clicking
    moveNoButton();
});

// Simple Confetti Function
function createConfetti() {
    const colors = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#fff0f3', '#ffd700'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '1000';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        
        // Random animation duration and delay
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        confetti.style.transition = `top ${duration}s ease-in, transform ${duration}s ease-in-out`;
        
        document.body.appendChild(confetti);
        
        // Trigger animation
        setTimeout(() => {
            confetti.style.top = '110vh';
            confetti.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
        }, delay * 100);
        
        // Clean up
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000 + 100);
    }
}
