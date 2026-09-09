const services = [
  {
    id: 1,
    name: "Dry Cleaning",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "Leather & Suede Cleaning",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "Home Deep Cleaning",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    name: "Sofa Cleaning",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    name: "Car Cleaning",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    name: "AC Service",
    price: 899,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOngVNDjz0GuMN7uk95W8trblO8fCBc6vnAxfue_5EA&s=10",
  },
];

let currentServiceIndex = 0;
let cart = [];

const serviceArea = document.getElementById("serviceArea");
const cartList = document.getElementById("cartList");
const totalAmount = document.getElementById("totalAmount");
const bookBtn = document.getElementById("bookBtn");
const bookingForm = document.getElementById("bookingForm");
const bookingError = document.getElementById("bookingError");
const bookingSuccess = document.getElementById("bookingSuccess");
const toast = document.getElementById("toast");
const logoutBtn = document.getElementById("logoutBtn");

function currency(amount) {
  return `₹ ${amount.toLocaleString("en-IN")}.00`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function renderCurrentService() {
  if (currentServiceIndex >= services.length) {
    serviceArea.innerHTML = `
      <div class="no-more-services">
        <div class="info-icon">✓</div>
        <h3>All services reviewed</h3>
        <p>You can book the services you added to the cart.</p>
      </div>`;
    return;
  }

  const service = services[currentServiceIndex];
  serviceArea.innerHTML = `
    <article class="service-card">
      <img class="service-image" src="${service.image}" alt="${service.name}">
      <div class="service-info">
        <h2 class="service-name">${service.name}</h2>
        <span class="service-price">${currency(service.price)}</span>
      </div>
      <div class="service-buttons">
        <button class="skip-btn" id="skipBtn">Skip Item ⊖</button>
        <button class="add-btn" id="addBtn">Add Item ⊕</button>
      </div>
    </article>`;
}

function renderCart() {
  if (!cart.length) {
    cartList.innerHTML = `
      <div class="empty-cart">
        <div class="info-icon">i</div>
        <div class="empty-title">No Items Added</div>
        <div class="empty-text">Add Items to the cart from the services bar</div>
      </div>`;
  } else {
    cartList.innerHTML = cart
      .map(
        (service, index) => `
      <div class="cart-row">
        <span>${index + 1}</span>
        <div class="cart-service">
          <span>${service.name}</span>
          <button class="remove-cart" data-id="${service.id}" aria-label="Remove ${service.name}">×</button>
        </div>
        <span class="cart-price">${currency(service.price)}</span>
      </div>`,
      )
      .join("");
  }

  const total = cart.reduce((sum, service) => sum + service.price, 0);
  totalAmount.textContent = currency(total);
  // Book Now stays clickable. The warning is shown only when the user tries to book with an empty cart.
  if (cart.length > 0) {
    bookingError.style.display = "none";
  }
}

function moveToNextService() {
  currentServiceIndex += 1;
  renderCurrentService();
}

function addCurrentService() {
  const service = services[currentServiceIndex];
  if (!service) return;

  if (!cart.some((item) => item.id === service.id)) {
    cart.push(service);
    renderCart();
    showToast(`${service.name} added to cart`);
  }

  // IMPORTANT: after Add Item, immediately show the next service.
  moveToNextService();
}

function skipCurrentService() {
  const service = services[currentServiceIndex];
  if (service) showToast(`${service.name} skipped`);

  // IMPORTANT: after Skip Item, do not add it; immediately show next service.
  moveToNextService();
}

function focusBookingForm() {
  if (!cart.length) {
    showToast("Add a service to the cart first");
    return;
  }
  bookingForm.scrollIntoView({ behavior: "smooth", block: "center" });
  document.getElementById("fullName").focus();
}

serviceArea.addEventListener("click", (event) => {
  if (event.target.id === "addBtn") addCurrentService();
  if (event.target.id === "skipBtn") skipCurrentService();
});

cartList.addEventListener("click", (event) => {
  const button = event.target.closest(".remove-cart");
  if (!button) return;
  const id = Number(button.dataset.id);
  const removed = cart.find((item) => item.id === id);
  cart = cart.filter((item) => item.id !== id);
  renderCart();
  if (removed) showToast(`${removed.name} removed`);
});

bookBtn.addEventListener("click", () => {
  if (!cart.length) {
    bookingError.style.display = "block";
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!cart.length) {
    bookingError.style.display = "block";
    return;
  }

  const name = document.getElementById("fullName").value.trim();
  bookingSuccess.textContent = `✓ Booking confirmed for ${name}`;
  bookingError.style.display = "none";
  showToast("Booking confirmed");
  cart = [];
  renderCart();
  bookingForm.reset();
});

logoutBtn.addEventListener("click", () => showToast("Logged out successfully"));

renderCurrentService();
renderCart();
