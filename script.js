/**
 * ========================================
 * Happy New Year - Romantic Website
 * JavaScript Functionality
 * ========================================
 */

// ========================================
// Configuration - EDIT THESE VALUES
// ========================================

// Your anniversary date (Format: YYYY-MM-DD)
const ANNIVERSARY_DATE = '2024-09-17';

// Target New Year date (default: January 1, 2025)
const NEW_YEAR_DATE = new Date('2025-01-01T00:00:00');

// Music volume (0.0 to 1.0)
const MUSIC_VOLUME = 0.3;

// ========================================
// DOM Elements
// ========================================
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const youtubePlayer = document.getElementById('youtubePlayer');
const youtubeAPI = document.getElementById('youtubeAPI');
const spotifyPlayer = document.getElementById('spotifyPlayer');
const countdownTimer = document.getElementById('countdownTimer');
const countdownMessage = document.getElementById('countdownMessage');
const fireworksContainer = document.getElementById('fireworks');
const revealBtn = document.getElementById('revealBtn');
const messageReveal = document.getElementById('messageReveal');
const daysTogether = document.getElementById('daysTogether');
const anniversaryDateEl = document.getElementById('anniversaryDate');
const floatingHearts = document.getElementById('floatingHearts');
const sparkles = document.getElementById('sparkles');

// Music player state
let isPlaying = false;
let playerType = 'none'; // 'mp3', 'youtube', or 'spotify'

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initMusicToggle();
    initCountdown();
    initDaysTogether();
    initRevealButton();
    initFloatingHearts();
    initSparkles();
    initScrollAnimations();
    initFireworks();
});

// ========================================
// Music Toggle Functionality
// ========================================
function initMusicToggle() {
    // Set volume for MP3
    if (bgMusic) {
        bgMusic.volume = MUSIC_VOLUME;
    }
    
    // Add click event to toggle
    musicToggle.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    if (!isPlaying) {
        // Try to play
        playMusic();
    } else {
        // Pause
        pauseMusic();
    }
    
    // Update button state
    updateMusicButton();
}

function playMusic() {
    // Try MP3 first
    if (bgMusic && bgMusic.src && playerType === 'mp3') {
        bgMusic.play().catch(error => {
            console.log('MP3 play error:', error);
        });
        isPlaying = true;
        return;
    }
    
    // Try Spotify
    const spotifyIframe = spotifyPlayer?.querySelector('iframe');
    if (spotifyIframe && playerType === 'spotify') {
        // Spotify doesn't allow programmatic play from embed
        // But we can show the player
        spotifyPlayer.style.display = 'block';
        isPlaying = true;
        return;
    }
    
    // Try YouTube (requires API setup)
    if (playerType === 'youtube') {
        // YouTube API play
        isPlaying = true;
        return;
    }
    
    // Default: If no specific player type set, enable Spotify
    if (playerType === 'none') {
        enableSpotify();
    }
}

function pauseMusic() {
    // Pause MP3
    if (bgMusic && playerType === 'mp3') {
        bgMusic.pause();
    }
    
    isPlaying = false;
    updateMusicButton();
}

function enableSpotify() {
    playerType = 'spotify';
    spotifyPlayer.style.display = 'block';
    isPlaying = true;
    
    // Hide MP3 audio
    if (bgMusic) {
        bgMusic.style.display = 'none';
    }
}

function enableMP3() {
    playerType = 'mp3';
    if (bgMusic) {
        bgMusic.style.display = 'block';
    }
    spotifyPlayer.style.display = 'none';
    youtubePlayer.style.display = 'none';
}

function enableYouTube(videoId) {
    playerType = 'youtube';
    youtubePlayer.style.display = 'block';
    
    // Load YouTube IFrame API
    if (!window.YTApiLoaded) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = function() {
            window.YTApiLoaded = true;
            createYouTubePlayer(videoId);
        };
    } else {
        createYouTubePlayer(videoId);
    }
    
    if (bgMusic) {
        bgMusic.style.display = 'none';
    }
    spotifyPlayer.style.display = 'none';
}

let youtubePlayerInstance = null;
function createYouTubePlayer(videoId) {
    if (youtubePlayerInstance) {
        youtubePlayerInstance.destroy();
    }
    
    youtubePlayerInstance = new YT.Player('youtubeAPI', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: videoId
        },
        events: {
            onStateChange: onYouTubeStateChange
        }
    });
}

function onYouTubeStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
    }
    updateMusicButton();
}

function updateMusicButton() {
    if (isPlaying) {
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<span class="music-icon">⏸️</span>';
    } else {
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<span class="music-icon">🎵</span>';
    }
}

// ========================================
// Countdown Timer
// ========================================
function initCountdown() {
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = NEW_YEAR_DATE.getTime() - now;
    
    if (distance < 0) {
        // New Year has arrived!
        showNewYearCelebration();
        return;
    }
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update DOM with leading zeros
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function showNewYearCelebration() {
    // Hide countdown timer
    countdownTimer.style.display = 'none';
    
    // Show celebration message
    countdownMessage.classList.add('show');
    
    // Trigger fireworks
    fireworksContainer.classList.add('show');
    launchFireworks();
    
    // Stop the countdown interval
    clearInterval(updateCountdown);
}

// ========================================
// Fireworks Animation
// ========================================
function initFireworks() {
    // Pre-create some firework elements
    for (let i = 0; i < 20; i++) {
        createFirework();
    }
}

function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // Random position and color
    const x = Math.random() * 100;
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB', '#FFD700'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    firework.style.left = `${x}%`;
    firework.style.top = `${Math.random() * 50}%`;
    firework.style.backgroundColor = color;
    firework.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    
    fireworksContainer.appendChild(firework);
    
    // Remove and recreate
    setTimeout(() => {
        firework.remove();
        createFirework();
    }, 1500);
}

function launchFireworks() {
    // Launch multiple fireworks initially
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 200);
    }
}

// ========================================
// Days Together Calculator
// ========================================
function initDaysTogether() {
    // Set anniversary date
    anniversaryDateEl.textContent = formatDate(ANNIVERSARY_DATE);
    
    // Calculate days together
    calculateDaysTogether();
}

function calculateDaysTogether() {
    const anniversary = new Date(ANNIVERSARY_DATE);
    const now = new Date();
    
    // Calculate difference in days
    const diffTime = Math.abs(now - anniversary);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Animate the number
    animateNumber(daysTogether, diffDays);
}

function animateNumber(element, targetNumber) {
    const duration = 2000; // Animation duration in ms
    const startTime = performance.now();
    const startNumber = 0;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easeOut);
        element.textContent = currentNumber.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ========================================
// Surprise Reveal Button
// ========================================
function initRevealButton() {
    revealBtn.addEventListener('click', toggleMessage);
}

function toggleMessage() {
    messageReveal.classList.toggle('show');
    
    // Change button text based on state
    if (messageReveal.classList.contains('show')) {
        revealBtn.textContent = 'Hide Message 💕';
        revealBtn.style.background = 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)';
    } else {
        revealBtn.textContent = 'Tap for a Surprise 💌';
        revealBtn.style.background = 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 50%, #FF1493 100%)';
    }
}

// ========================================
// Floating Hearts Background
// ========================================
function initFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💓', '💝'];
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        createFloatingHeart(hearts, i * 3);
    }
}

function createFloatingHeart(hearts, delay) {
    setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = `floatHeart ${Math.random() * 10 + 10}s linear infinite`;
        
        floatingHearts.appendChild(heart);
        
        // Remove and recreate
        setTimeout(() => {
            heart.remove();
            createFloatingHeart(hearts, 0);
        }, 15000);
    }, delay * 1000);
}

// ========================================
// Sparkles Effect
// ========================================
function initSparkles() {
    // Create sparkle elements
    for (let i = 0; i < 30; i++) {
        createSparkle();
    }
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    sparkle.style.left = `${x}%`;
    sparkle.style.top = `${y}%`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparkle.style.animationDuration = `${Math.random() * 2 + 1}s`;
    
    sparkles.appendChild(sparkle);
    
    // Recreate sparkle when animation ends
    setTimeout(() => {
        sparkle.remove();
        createSparkle();
    }, 3000);
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    // Add fade-in class to elements
    const fadeElements = document.querySelectorAll('.countdown-container, .gallery, .surprise-container, .love-section, .date-card, .footer');
    fadeElements.forEach(el => el.classList.add('fade-in'));
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all fade elements
    fadeElements.forEach(el => observer.observe(el));
}

// ========================================
// Smooth Scroll for Navigation
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Random number between min and max
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Console greeting
console.log('%c💕 Happy New Year, Bik! 💕', 'font-size: 24px; color: #FF69B4; font-weight: bold;');
console.log('%cMade with love by Pat 💖', 'font-size: 16px; color: #FF1493;');

