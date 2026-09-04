// --- Scroll Effects (Sticky Nav, Progress Bar, & Active Links) ---
window.addEventListener('scroll', () => {
    // 1. Shrink Navbar
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 2. Scroll Progress Bar at the top
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollY / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";

    // 3. Highlight Active Link on Scroll (Bulletproof)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a.nav-item");
    
    let current = "";

    sections.forEach((section) => {
        // The trigger line
        const sectionTop = section.offsetTop - 300; 
        
        if (scrollY >= sectionTop) {
            const sectionId = section.getAttribute("id");
            // Only track it if it has a pill link in the nav
            if (document.querySelector(`.nav-links a.nav-item[href="#${sectionId}"]`)) {
                current = sectionId;
            }
        }
    });

    // --- THE FIX: Check if we are at the absolute bottom of the page ---
    if ((window.innerHeight + Math.ceil(scrollY)) >= document.body.offsetHeight - 100) {
        current = "placements"; // Force it to Placements
    }

    // Apply the highlight
    navLinks.forEach((link) => {
        link.classList.remove("active");
        // Using exact match to prevent bugs
        if (current && link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
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
