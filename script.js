const tools = [
    { name: "DeWalt Drill", cat: "Power Tools", price: 500, img: "public/drill.jpg" },
    { name: "Lawn Mower", cat: "Gardening", price: 1200, img: "public/lawnmower.jpg" },
    { name: "Pressure Washer", cat: "Cleaning", price: 800, img: "public/washer.jpg" },
    { name: "Circular Saw", cat: "Power Tools", price: 700, img: "public/saw.avif" },
    { name: "Leaf Blower", cat: "Gardening", price: 400, img: "public/leafblower.jpg" },
    { name: "Steam Cleaner", cat: "Cleaning", price: 600, img: "public/steamcleaner.jpeg" },
    { name: "Jackhammer", cat: "Construction", price: 2500, img: "public/jackhammer.jpg" },
    { name: "Orbital Sander", cat: "Power Tools", price: 350, img: "public/sander.jpg" },
    { name: "Hedge Trimmer", cat: "Gardening", price: 550, img: "public/trimmer.jpg" },
    { name: "Ladder (20ft)", cat: "General", price: 300, img: "public/ladder.jpg" }
];

let currentFilter = "All";

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
}

function handleRegistration() {
    const user = document.getElementById('regUser').value;
    const pass = document.getElementById('regPass').value;
    const phone = document.getElementById('regPhone').value;

    if (user.length < 6 || !/^[A-Za-z\s]+$/.test(user)) {
        showError('regError', "User: Alphabets only, min 6 chars.");
    } else if (pass.length < 6) {
        showError('regError', "Pass: Min 6 chars.");
    } else if (!/^\d{10}$/.test(phone)) {
        showError('regError', "Phone: 10 digits required.");
    } else {
        const users = JSON.parse(localStorage.getItem('ts_users') || '[]');
        users.push({ username: user, password: pass });
        localStorage.setItem('ts_users', JSON.stringify(users));
        alert("Registration Successful!");
        showPage('login');
    }
}

function handleLogin() {
    const userIn = document.getElementById('loginUser').value;
    const passIn = document.getElementById('loginPass').value;
    const users = JSON.parse(localStorage.getItem('ts_users') || '[]');
    const found = users.find(u => u.username === userIn && u.password === passIn);

    if (found) {
        document.getElementById('mainNav').style.display = 'flex';
        showPage('home');
        renderTools();
    } else {
        showError('loginError', "Invalid Credentials.");
    }
}

function showError(id, msg) {
    const el = document.getElementById(id);
    el.innerText = msg;
    el.style.display = 'block';
}

function filterByType(type) {
    currentFilter = type;
    document.getElementById('heroTitle').innerText = type === "All" ? "Professional Gear, Simplified." : type;
    showPage('home');
    renderTools();
}

function renderTools() {
    const query = document.getElementById('toolSearch').value.toLowerCase();
    const grid = document.getElementById('toolsGrid');
    const filtered = tools.filter(t => (currentFilter === "All" || t.cat === currentFilter) && t.name.toLowerCase().includes(query));

    grid.innerHTML = filtered.map(t => `
        <div class="card">
            <img src="${t.img}" alt="${t.name}">
            <div class="card-info">
                <span class="cat-tag">${t.cat}</span>
                <h3>${t.name}</h3>
                <span class="price">₹${t.price} / day</span>
                <button class="btn-p" onclick="bookTool('${t.name}', ${t.price})">Book Now</button>
            </div>
        </div>
    `).join('');
}

function bookTool(name, price) {
    const days = prompt(`Days for ${name}?`, "1");
    if (days && !isNaN(days)) {
        const total = price * parseInt(days);
        const tax = total * 0.05;
        document.getElementById('billDetails').innerHTML = `
            <p><strong>Tool:</strong> ${name}</p>
            <p><strong>Rent:</strong> ₹${total}</p>
            <p><strong>Tax (5%):</strong> ₹${tax}</p>
            <h3>Total: ₹${total + tax}</h3>
        `;
        document.getElementById('feedbackArea').style.display = 'block';
        showPage('bill');
    }
}

function submitFeedback() {
    alert("Paid! Thank you.");
    showPage('home');
}