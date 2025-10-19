// ===== CUSTOMIZATION SECTION =====
const MESSAGE = "Nhân ngày 20 tháng 10, hội đàn ông con trai 12A7 chúc bạn sẽ luôn xinh đẹp, lạc quan và tích cực với cuộc đời";
const TYPING_SPEED = 50; // milliseconds per character
const FLOWER_EMOJIS = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🏵️', '💮'];

// PHOTO FRAMES - Replace these paths with your own images
const PHOTO_URLS = [
    'images/photo1.jpg',  // Top Left
    'images/photo2.jpg',  // Top Right
    'images/photo3.jpg',  // Bottom Left
    'images/photo4.jpg'   // Bottom Right
];

// GIFT TAG IMAGE - Replace with your own image path
const GIFT_TAG_IMAGE = 'images/tag.jpg';
// ===================================

const giftBox = document.getElementById('giftBox');
const overlay = document.getElementById('overlay');
const letterContainer = document.getElementById('letterContainer');
const letter = document.getElementById('letter');
const letterContent = document.getElementById('letterContent');

let isLetterOpen = false;

// Set photo URLs
document.getElementById('frame1').querySelector('img').src = PHOTO_URLS[0];
document.getElementById('frame2').querySelector('img').src = PHOTO_URLS[1];
document.getElementById('frame3').querySelector('img').src = PHOTO_URLS[2];
document.getElementById('frame4').querySelector('img').src = PHOTO_URLS[3];
document.getElementById('tagImage').src = GIFT_TAG_IMAGE;

function createFlowers() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)];
            flower.style.left = Math.random() * 100 + '%';
            flower.style.animationDuration = (Math.random() * 2 + 3) + 's';
            flower.style.animationDelay = (Math.random() * 0.5) + 's';
            document.body.appendChild(flower);
            
            setTimeout(() => flower.remove(), 5000);
        }, i * 100);
    }
}

function typeWriter(text, element, speed) {
    let i = 0;
    element.textContent = '';
    element.style.display = 'block';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

giftBox.addEventListener('click', handleGiftClick);
giftBox.addEventListener('touchend', (e) => {
    e.preventDefault();
    handleGiftClick();
});

function handleGiftClick() {
    giftBox.classList.add('hidden');
    overlay.style.display = 'block';
    letterContainer.style.display = 'block';
    createFlowers();
    
    // Show photo frames with staggered animation
    setTimeout(() => document.getElementById('frame1').style.display = 'block', 300);
    setTimeout(() => document.getElementById('frame2').style.display = 'block', 450);
    setTimeout(() => document.getElementById('frame3').style.display = 'block', 600);
    setTimeout(() => document.getElementById('frame4').style.display = 'block', 750);
}

// Auto-trigger typing animation when letter appears
setTimeout(() => {
    if (!isLetterOpen) {
        isLetterOpen = true;
        typeWriter(MESSAGE, letterContent, TYPING_SPEED);
    }
}, 800);

// Click overlay to close
overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    letterContainer.style.display = 'none';
    document.getElementById('frame1').style.display = 'none';
    document.getElementById('frame2').style.display = 'none';
    document.getElementById('frame3').style.display = 'none';
    document.getElementById('frame4').style.display = 'none';
    giftBox.classList.remove('hidden');
    letterContent.style.display = 'none';
    letterContent.textContent = '';
    isLetterOpen = false;
});