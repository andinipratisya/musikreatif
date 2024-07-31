// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untuk menghhilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Handle seacrh
document.getElementById("search-button").addEventListener("click", function () {
  const searchQuery = document
    .getElementById("search-input")
    .value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-card-title")
      .innerText.toLowerCase();
    if (productName.includes(searchQuery)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Handle pengiriman form kontak
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    // Ambil nilai dari input
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    // Tampilkan pesan status
    alert("Pesan berhasil dikirim!");

    // Reset form
    document.getElementById("contactForm").reset();
  });

// Tambahkan event listener untuk tombol increase dan decrease quantity
document.querySelectorAll(".increase-quantity").forEach((button) => {
  button.addEventListener("click", function () {
    const productId = this.dataset.productId;
    const quantityInput = document.querySelector(
      `.product-quantity[data-product-id="${productId}"]`
    );
    quantityInput.value = parseInt(quantityInput.value, 10) + 1;
  });
});

document.querySelectorAll(".decrease-quantity").forEach((button) => {
  button.addEventListener("click", function () {
    const productId = this.dataset.productId;
    const quantityInput = document.querySelector(
      `.product-quantity[data-product-id="${productId}"]`
    );
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value, 10) - 1;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <p>${item.name} - IDR ${item.price} x ${item.quantity}</p>
        <button class="remove-from-cart" data-product-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    const checkoutButton = document.getElementById("checkout-button");
    if (cart.length === 0) {
      checkoutButton.style.display = "none";
    } else {
      checkoutButton.style.display = "block";
    }
  }

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id");
      const productName = this.getAttribute("data-product-name");
      const productPrice = parseInt(this.getAttribute("data-product-price"));
      const productQuantity = parseInt(
        document.querySelector(
          `.product-quantity[data-product-id="${productId}"]`
        ).value
      );

      const existingProduct = cart.find((item) => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += productQuantity;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: productQuantity,
        });
      }

      updateCart();
    });
  });

  document.getElementById("cart-items").addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-from-cart")) {
      const productId = e.target.getAttribute("data-product-id");
      const productIndex = cart.findIndex((item) => item.id === productId);
      if (productIndex > -1) {
        cart.splice(productIndex, 1);
        updateCart();
      }
    }
  });

  updateCart();
});

// Handle form pembayaran
if (document.getElementById("payment-form")) {
  document
    .getElementById("payment-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Pembayaran berhasil! Terima kasih telah berbelanja.");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });
}

// Tambahkan event listener untuk tombol search
document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("search-input").value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-card-title")
      .textContent.toLowerCase();
    if (productName.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const heroSection = document.querySelector(".hero");

  window.addEventListener("scroll", function () {
    if (window.scrollY < heroSection.offsetHeight) {
      navbar.classList.add("transparent");
    } else {
      navbar.classList.remove("transparent");
    }
  });

  // Inisialisasi pertama kali
  if (window.scrollY < heroSection.offsetHeight) {
    navbar.classList.add("transparent");
  } else {
    navbar.classList.remove("transparent");
  }
});

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
