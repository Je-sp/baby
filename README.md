# 🎀 Happy New Year Website for Bik 💕

A romantic, mobile-first website created with love by Pat for Bik! 

## 📁 Files

- `index.html` - Main HTML structure
- `style.css` - All styling and animations
- `script.js` - Functionality and interactions

## 🎨 How to Customize

### 📸 **Change Photos**
In `index.html`, find the Photo Gallery section and replace the placeholder URLs:
```html
<img src="https://picsum.photos/300/300?random=1" alt="Photo 1">
```
Replace with your actual photo paths:
```html
<img src="images/our-photo-1.jpg" alt="Our photo">
```



#### Option 1: Local MP3 File
In `index.html`, uncomment the audio section:
```html
<audio id="bgMusic" loop>
    <source src="your-song.mp3" type="audio/mpeg">
</audio>
```

#### Option 2: Spotify Embed (Recommended!)
1. Go to the song on Spotify
2. Click **Share** → **Embed track**
3. Copy the embed code
4. Replace the Spotify iframe in `index.html`:
```html
<iframe style="border-radius: 12px" 
    src="PASTE_YOUR_SPOTIFY_EMBED_URL_HERE" 
    width="100%" 
    height="152" 
    frameborder="0" 
    allowfullscreen="" 
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
    loading="lazy">
</iframe>
```

#### Option 3: YouTube Embed
1. Find your YouTube video ID (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`)
2. In `script.js`, call:
```javascript
enableYouTube('YOUR_VIDEO_ID');
```

In `script.js`, adjust volume:
```javascript
const MUSIC_VOLUME = 0.3; // Change to 0.1 - 0.5 for softer volume
```
### 💌 **Edit Your Message**
In `index.html`, find the surprise message section and edit:
```html
<p class="message-text">
    My dearest Bik,
    ... your custom message here ...
</p>
```

### 📅 **Set Your Anniversary Date**
In `script.js`, update the anniversary date:
```javascript
const ANNIVERSARY_DATE = '2024-01-01'; // Change to your actual anniversary
```

### 🎆 **Set New Year Target**
In `script.js`, if you want a different New Year countdown:
```javascript
const NEW_YEAR_DATE = new Date('2025-01-01T00:00:00');
```

### 🎀 **Customize Names**
In `index.html`, search for:
- "Bik" → Your girlfriend's name
- "Pat" → Your name

## 🚀 How to Run

### Option 1: Open Directly
Simply double-click `index.html` to open in your browser.

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if installed)
npx serve

# Then open http://localhost:8000
```

### Option 3: VSCode Live Server
1. Install "Live Server" extension in VSCode
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📱 Mobile Testing

The site is optimized for iPhone 17 Pro Max. To test:
1. Connect your iPhone to your Mac
2. Use Safari Web Inspector or
3. Deploy to a free service like:
   - GitHub Pages
   - Netlify (drag and drop folder)
   - Vercel

## 🎊 Features

- ✨ Smooth animations and transitions
- 🎵 Play/Pause music button
- ⏰ Real-time New Year countdown
- 🎆 Fireworks celebration
- 💕 Photo gallery with hover effects
- 💌 Surprise message reveal
- ❤️ "I Love You" looping animation
- 📅 Days together counter
- 📱 Fully responsive mobile-first design

## 💕 Made with Love

Created by Pat for Bik 💖

Happy New Year, my love! 🎉

