const PRODUCT = {
  id: "seven-multi-color",
  name: "Seven By M.S. Dhoni Multi-Color Running Shoes",
  price: 1334,
  image: "thala-shoe.png",
};

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("thala7Cart") || "[]");
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("thala7Cart", JSON.stringify(cart));
}

function money(value) {
  return "₹" + Number(value || 0).toLocaleString("en-IN");
}

function getCartSubtotal() {
  return getCart().reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0),
    0,
  );
}

/*
  IMPORTANT:
  This is the single source of truth for Cart + Payment.
*/
function getOrderSummary() {
  const subtotal = getCartSubtotal();
  const tax = Math.round(subtotal * 0.05);

  const discount =
    localStorage.getItem("thala7Coupon") === "THALA7"
      ? Math.round(subtotal * 0.1)
      : 0;

  return {
    subtotal,
    tax,
    discount,
    total: subtotal + tax - discount,
  };
}

function saveOrderSummary() {
  const summary = getOrderSummary();
  localStorage.setItem("thala7OrderSummary", JSON.stringify(summary));
  return summary;
}

function updateSummary() {
  const summary = getOrderSummary();

  const set = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = money(value);
  };

  set("subtotal", summary.subtotal);
  set("taxes", summary.tax);
  set("discount", summary.discount);
  set("total", summary.total);

  set("checkoutSubtotal", summary.subtotal);
  set("checkoutTaxes", summary.tax);
  set("checkoutDiscount", summary.discount);
  set("checkoutTotal", summary.total);

  const checkoutPay = document.getElementById("checkoutPay");
  if (checkoutPay) {
    checkoutPay.textContent = `Pay Now ${money(summary.total)}`;
  }

  // Keep the exact displayed cart total available for payment.html.
  saveOrderSummary();
}

function addProduct(qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === PRODUCT.id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...PRODUCT, qty });
  }

  saveCart(cart);
}

const qtyEl = document.getElementById("qty");
if (qtyEl) {
  let qty = 1;

  const plus = document.getElementById("plus");
  const minus = document.getElementById("minus");
  const addToCart = document.getElementById("addToCart");

  if (plus) {
    plus.onclick = () => {
      qty++;
      qtyEl.textContent = qty;
    };
  }

  if (minus) {
    minus.onclick = () => {
      if (qty > 1) qty--;
      qtyEl.textContent = qty;
    };
  }

  if (addToCart) {
    addToCart.onclick = () => {
      addProduct(qty);
      window.location.href = "cart.html";
    };
  }
}

document.querySelectorAll(".thumb").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".thumb")
      .forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");

    const image = document.getElementById("mainProductImage");
    if (image) image.src = btn.dataset.img;
  });
});

function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  const cart = getCart();

  if (!cart.length) {
    container.innerHTML =
      '<div class="empty-cart"><h3>Your cart is empty.</h3><p>Add a sneaker to continue shopping.</p></div>';
    localStorage.removeItem("thala7OrderSummary");
    updateSummary();
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-product">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <b>${item.name}</b>
          <small>Multi-Color Running Shoes</small>
        </div>
      </div>

      <div class="cart-qty">
        <button onclick="changeQty('${item.id}', -1)">−</button>
        <strong>${item.qty}</strong>
        <button onclick="changeQty('${item.id}', 1)">+</button>
      </div>

      <strong>${money(item.price * item.qty)}</strong>
      <button class="remove" onclick="removeItem('${item.id}')">×</button>
    </div>
  `,
    )
    .join("");

  updateSummary();
}

function changeQty(id, change) {
  const cart = getCart();
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty += change;
  if (item.qty < 1) item.qty = 1;

  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  saveCart(getCart().filter((item) => item.id !== id));
  renderCart();
}

window.changeQty = changeQty;
window.removeItem = removeItem;

// Cart coupon
const couponBtn = document.getElementById("applyCoupon");
if (couponBtn) {
  couponBtn.onclick = () => {
    const input = document.getElementById("coupon");
    const code = input ? input.value.trim().toUpperCase() : "";

    if (code === "THALA7") {
      localStorage.setItem("thala7Coupon", "THALA7");
      updateSummary();
      couponBtn.textContent = "Applied ✓";
    } else {
      alert("Try coupon: THALA7");
    }
  };
}

// Cart -> Payment
const payNow = document.getElementById("payNow");
if (payNow) {
  payNow.onclick = () => {
    if (!getCart().length) {
      alert("Your cart is empty.");
      return;
    }

    // Save the EXACT total shown in Cart before navigating.
    saveOrderSummary();
    window.location.href = "payment.html";
  };
}

// Payment page
if (document.getElementById("checkoutTotal")) {
  const cart = getCart();

  if (!cart.length) {
    window.location.href = "cart.html";
  } else {
    // Read the saved Cart total first.
    const saved = JSON.parse(
      localStorage.getItem("thala7OrderSummary") || "null",
    );

    if (saved && typeof saved.total === "number") {
      const set = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = money(value);
      };

      set("checkoutSubtotal", saved.subtotal);
      set("checkoutTaxes", saved.tax);
      set("checkoutDiscount", saved.discount);
      set("checkoutTotal", saved.total);

      const checkoutPay = document.getElementById("checkoutPay");
      if (checkoutPay)
        checkoutPay.textContent = `Pay Now ${money(saved.total)}`;
    } else {
      updateSummary();
    }
  }
}

const checkoutPay = document.getElementById("checkoutPay");
if (checkoutPay) {
  checkoutPay.onclick = () => {
    const cart = getCart();
    if (!cart.length) {
      alert("Your cart is empty.");
      window.location.href = "cart.html";
      return;
    }

    const saved = JSON.parse(
      localStorage.getItem("thala7OrderSummary") || "null",
    );
    const total =
      saved && typeof saved.total === "number"
        ? saved.total
        : getOrderSummary().total;

    alert(
      "Demo checkout successful! This project does not process real payments.\n\n" +
        "Total: " +
        money(total),
    );
  };
}

// Render/update on whichever page is open.
renderCart();
if (
  !document.getElementById("cartItems") &&
  document.getElementById("checkoutTotal")
) {
  // If payment page loaded before the saved summary existed.
  const saved = JSON.parse(
    localStorage.getItem("thala7OrderSummary") || "null",
  );
  if (!saved) updateSummary();
}
