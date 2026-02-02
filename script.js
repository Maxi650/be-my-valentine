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
    // Remove No button
    noBtn.remove();

    // Change the content of the card (GIF instead of MP4)
    card.innerHTML = `
        <div class="video-container success-message">
            <img src="./11.gif" alt="Cute celebration" class="cute-video">
        </div>
        <h1 class="question success-text">
            Yay! 💖<br>I knew you'd say yes!
        </h1>
        <p style="color: #666; margin-top: 10px;">
            Best Valentine Ever!
        </p>
    `;

    // Launch confetti
    createConfetti();
});

// Move No Button Function
const moveNoButton = () => {
    const margin = 20;

    const cardWidth = card.clientWidth;
    const cardHeight = card.clientHeight;

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = cardWidth - btnWidth - margin;
    const maxY = cardHeight - btnHeight - margin;
    const minX = margin;
    const minY = margin;

    const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    if (noBtn.parentNode !== card) {
        card.appendChild(noBtn);
    }

    if (!hasMoved) {
        caption.style.opacity = '1';
        hasMoved = true;
    }
};

// Desktop proximity detection
document.addEventListener('mousemove', (e) => {
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distanceX = e.clientX - btnCenterX;
    const distanceY = e.clientY - btnCenterY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < 150) {
        moveNoButton();
    }
});

// Mobile touch handling
document.addEventListener(
    'touchstart',
    (e) => {
        if (e.touches.length === 0) return;

        const touch = e.touches[0];
        const btnRect = noBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        const distanceX = touch.clientX - btnCenterX;
        const distanceY = touch.clientY - btnCenterY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 150) {
            e.preventDefault();
            moveNoButton();
        }
    },
    { passive: false }
);

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Confetti Effect
function createConfetti() {
    const colors = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#fff0f3', '#ffd700'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '1000';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';

        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;

        confetti.style.transition = `
            top ${duration}s ease-in,
            transform ${duration}s ease-in-out
        `;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.top = '110vh';
            confetti.style.transform = `
                translateX(${Math.random() * 100 - 50}px)
                rotate(${Math.random() * 360}deg)
            `;
        }, delay * 100);

        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000 + 100);
    }
}
