# 💸 Deserve Ko Ba To?!? 
**The Financial Delusion Enabler**
**🥉 3rd Place Winner - GDG Manila "Build with AI" Hackathon (Chaos-to-Code Category)**

A hilariously toxic, neobrutalist-styled web application designed to judge your financial decisions. Powered by **Google Gemini 1.5 Flash**, this app acts as your passive-aggressive Filipino financial advisor, calculating whether you *deserve* to buy that item using fake "Girl Math" and "Boy Math" logic. 

Perfect for hackathons, fun demos, and anyone trying to justify a terrible purchase. 🤡

## ✨ Features
- **Brutalist UI:** A vibrant, chaotic, and highly responsive frontend built with pure Tailwind CSS.
- **AI-Powered Judgement:** Sends your Bank Balance, Item Cost, and "Excuse" to Gemini to deliver a strictly JSON-formatted verdict.
- **Girl/Boy Math Deductions:** Generates a custom "CVS of Lies" receipt breaking down your purchase into fake deductions until it mathematically reaches ₱0.00.
- **Secure Architecture:** Uses a tiny Node.js/Express proxy server to completely hide the Gemini API key from the frontend.

## 🛠️ Tech Stack
- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (via CDN)
- **Backend:** Node.js, Express.js
- **AI:** Google Gemini 1.5 Flash API
- **Fonts:** Fredoka (UI) and Space Mono (Receipt)

## 🚀 How to Run Locally

### Prerequisites
1. You must have [Node.js](https://nodejs.org/) installed.
2. You need a **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 1. Installation
Clone or download this repository, then open your terminal in the project folder and install the backend dependencies:
```bash
npm install
```

### 2. Add Your API Key
Create a file named `.env` in the root of the project (next to `server.js`). 
Inside the `.env` file, paste your API key exactly like this:
```env
GEMINI_API_KEY=AIzaSyYourSecretKeyHere...
PORT=3000
```
*(Note: The `.env` file is included in `.gitignore` so your key stays safe and never gets pushed to GitHub!)*

### 3. Start the Server
Run the tiny proxy server:
```bash
node server.js
```
You should see: `🚀 Deserve Ko Ba To Proxy Server running at http://localhost:3000`

### 4. Open the App
Simply double-click the `index.html` file to open it in your browser (or use VS Code Live Server). 
Input your delusional purchase, and click **CALCULATE 💸**!

## 📜 Patch Notes (v2.00 - Post-Hackathon Update)
- **🏆 Winner's Badge:** Added a pulsing 3rd Place GDG Mini-Hackathon Winner badge to the main UI.
- **🤡 Enhanced Loading Screen:** Upgraded the loading view with a centered layout, a custom chaotic `clown-crazy` animation, and a brutalist pink loading progress bar.
- **🅰️ Brutalist Typography:** Removed soft emojis from the navigation buttons in favor of aggressive, pure-text typographic arrows (`NEXT ->`, `<- BACK`) that better fit the neobrutalist aesthetic.
- **🔒 Code Vaulting:** Preserved the original winning hackathon code in a separate file (`index_winning_version.html`) for remembrance.
