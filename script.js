// --- Sticky Navbar Shrink on Scroll ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Faculty Secret Reveal Logic ---
function revealSecret(cardElement, secretMessage) {
    const secretBox = cardElement.querySelector('.secret-text');
    const descBox = cardElement.querySelector('.faculty-desc');
    
    // Toggle the display
    if (secretBox.style.display === 'block') {
        secretBox.style.display = 'none';
        descBox.style.display = 'block';
    } else {
        secretBox.innerText = `CLASSIFIED: ${secretMessage}`;
        secretBox.style.display = 'block';
        descBox.style.display = 'none';
    }
}

// --- Admission Logic (The Score Check) ---
function processApplication() {
    const btn = document.getElementById('apply-btn');
    const scoreInput = document.getElementById('jee-score').value;
    const trollBox = document.getElementById('troll-box');
    const trollMessage = document.getElementById('troll-message');
    const alertIcon = document.getElementById('alert-icon');
    const alertTitle = document.getElementById('alert-title');
    
    if (scoreInput === "") {
        alert("Please enter your JEE score! We need to verify your lack of intelligence.");
        return;
    }

    const score = parseFloat(scoreInput);

    btn.innerText = "Scanning Brain Cells...";
    btn.style.opacity = "0.7";
    btn.disabled = true;
    
    trollBox.classList.remove('show');
    trollBox.classList.remove('success-mode');

    setTimeout(() => {
        if (score < 5) {
            alertIcon.innerText = "✅";
            alertTitle.innerText = "Admission Granted!";
            trollBox.classList.add('success-mode');
            trollMessage.innerText = `Congratulations! You scored ${score}/330. Your spectacular lack of academic capability perfectly aligns with our Laddoo Engineering standards. Welcome to IIT Dholakpur!`;
        } else {
            alertIcon.innerText = "❌";
            alertTitle.innerText = "Application Rejected";
            
            const rejectionMessages = [
                `You scored ${score}? You are way too smart for us. Go to IIT Bombay or something.`,
                `Overqualification Error: A score of ${score} means you might actually study instead of eating laddoos.`,
                `Security Alert: Anyone scoring 5 or above is suspected of being a spy from Pehalwanpur.`,
                `Rejected. We only accept students whose IQ matches the temperature of a warm samosa.`,
                `Your score of ${score} is offensive to Kalia, who scored a solid -12. Request denied.`
            ];
            
            trollMessage.innerText = rejectionMessages[Math.floor(Math.random() * rejectionMessages.length)];
        }
        
        trollBox.classList.add('show');
        
        btn.innerText = "Initiate Application Process";
        btn.style.opacity = "1";
        btn.disabled = false;

        trollBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
}

document.getElementById('apply-btn').addEventListener('click', processApplication);

document.getElementById('jee-score').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        processApplication();
    }
});
