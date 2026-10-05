emailjs.init({
  publicKey: "L1Qu8P85YJgrDoitH",
});

let cart = [];

const serviceButtons = document.querySelectorAll(".service-btn");

const cartItems = document.getElementById("cartItems");

const totalAmount = document.getElementById("totalAmount");

const bookingForm = document.getElementById("bookingForm");

const bookingMessage = document.getElementById("bookingMessage");

const bookNowBtn = document.getElementById("bookNowBtn");

const emailServices = document.getElementById("emailServices");

const emailTotal = document.getElementById("emailTotal");

const bookServiceBtn = document.getElementById("bookServiceBtn");

if (bookServiceBtn) {
  bookServiceBtn.addEventListener("click", function () {
    const servicesSection = document.getElementById("services");

    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

serviceButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const id = this.dataset.id;

    const name = this.dataset.name;

    const price = Number(this.dataset.price);

    const existingItem = cart.find(function (item) {
      return item.id === id;
    });

    if (!existingItem) {
      cart.push({
        id: id,

        name: name,

        price: price,
      });

      this.classList.remove("add-btn");

      this.classList.add("remove-btn");

      this.innerHTML = "Remove Item ⊖";

      renderCart();

      return;
    }

    cart = cart.filter(function (item) {
      return item.id !== id;
    });

    this.classList.remove("remove-btn");

    this.classList.add("add-btn");

    this.innerHTML = "Add Item ⊕";

    renderCart();
  });
});

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        No items added yet
      </div>
    `;

    totalAmount.textContent = "0.00";

    emailServices.value = "";

    emailTotal.value = "0.00";

    return;
  }

  let total = 0;

  cart.forEach(function (item, index) {
    total += item.price;

    const row = document.createElement("div");

    row.className = "cart-row";

    row.innerHTML = `

      <span>
        ${index + 1}
      </span>

      <span>
        ${item.name}
      </span>

      <span>
        ₹${item.price.toFixed(2)}
      </span>

    `;

    cartItems.appendChild(row);
  });

  totalAmount.textContent = total.toFixed(2);

  emailServices.value = cart
    .map(function (item) {
      return item.name + " - ₹" + item.price.toFixed(2);
    })
    .join(", ");

  emailTotal.value = "₹" + total.toFixed(2);
}

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Please add at least one service to the cart.");

      return;
    }

    const fullName = document.getElementById("fullName").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    if (!fullName || !email || !phone) {
      alert("Please fill all the required fields.");

      return;
    }

    const total = cart.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);

    const services = cart
      .map(function (item) {
        return item.name + " - ₹" + item.price.toFixed(2);
      })
      .join("\n");

    const templateParams = {
      fullName: fullName,

      email: email,

      phone: phone,

      services: services,

      total: "₹" + total.toFixed(2),
    };

    console.log("Booking Details:", templateParams);

    bookNowBtn.disabled = true;

    bookNowBtn.textContent = "Sending...";

    emailjs
      .send("service_bbrpneb", "template_mvc7l6a", templateParams)

      .then(function (response) {
        console.log("Email sent successfully!", response.status, response.text);

        bookingMessage.textContent =
          "Thank you For Booking the Service! We will get back to you soon!";

        bookingMessage.classList.add("show");

        bookingForm.reset();

        cart = [];

        serviceButtons.forEach(function (button) {
          button.classList.remove("remove-btn");

          button.classList.add("add-btn");

          button.innerHTML = "Add Item ⊕";
        });

        renderCart();

        bookNowBtn.disabled = false;

        bookNowBtn.textContent = "Book now";
      })

      .catch(function (error) {
        console.error("EmailJS Error:", error);

        alert(
          "Something went wrong while sending the booking. Please try again.",
        );

        bookNowBtn.disabled = false;

        bookNowBtn.textContent = "Book now";
      });
  });
}

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("newsletterName").value.trim();

    const email = document.getElementById("newsletterEmail").value.trim();

    if (!name || !email) {
      alert("Please enter your name and email.");

      return;
    }

    alert(
      "Thank you " +
        name +
        "! You have successfully subscribed to our newsletter.",
    );

    newsletterForm.reset();
  });
}

renderCart();
