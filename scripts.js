document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const canvas  = document.getElementById('dynamic-bg');
const ctx    = canvas.getContext('2d');
let particles = [];
const maxParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * (canvas.width / 5);
        this.y = Math.random() * (canvas.height / 5);
        this.size = Math.random() * 1 + 0.2;
        this.speedX = (Math.random() * 2 - 1) * 0.5;
        this.speedY = (Math.random() * 2 - 1) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#15f1f8';
        ctx.fill();

        ctx.shadowColor = '#15f1f8';
        ctx.shadowBlur = 20;
    }
}

function init() {
    particles = [];
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

init();
animate();


const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

document.addEventListener("DOMContentLoaded", function() {
    var cookiePopup = document.getElementById("cookie-popup");
    var acceptButton = document.getElementById("accept-cookies");
    var declineButton = document.getElementById("decline-cookies");

    if (!getCookie("cookiesAccepted") && !getCookie("cookiesDeclined")) {
        cookiePopup.style.display = "block";
    }
    acceptButton.addEventListener("click", function() {
        setCookie("cookiesAccepted", "true", 365);
        cookiePopup.style.display = "none";
    });

    declineButton.addEventListener("click", function() {
        setCookie("cookiesDeclined", "true", 365);
        cookiePopup.style.display = "none";
    });

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});