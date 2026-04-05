// ================= FORCE HERO LOAD =================

// Always start at top (fix mobile + hash issue)
window.addEventListener("load", () => {
  // Remove #hash from URL (like #team)
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  // Force scroll to top
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 0);
});


// ================= STOCK SYSTEM =================

let stockData = [];
let currentType = "car";

// Format label
function formatTypeLabel(type) {
  return type.charAt(0).toUpperCase() + type.slice(1) + " Tyres";
}

// Load stock (🔥 cache-busting fix added)
async function loadStock() {
  try {
    const response = await fetch("stock.json?v=" + Date.now());

    if (!response.ok) throw new Error("Could not load stock.json");

    stockData = await response.json();

    console.log("LIVE STOCK DATA:", stockData);

    renderStock();
  } catch (error) {
    console.error("Error loading stock:", error);

    const list = document.getElementById("stock-list");
    if (list) {
      list.innerHTML = "<p>Failed to load stock data.</p>";
    }
  }
}

// Render stock
function renderStock() {
  const list = document.getElementById("stock-list");
  const title = document.getElementById("stock-title");
  const searchInput = document.getElementById("search-input");

  if (!list || !title) return;

  const search = (searchInput?.value || "").toLowerCase().trim();

  title.textContent = formatTypeLabel(currentType);

  const filtered = stockData.filter((item) => {
    const sameType = item.type === currentType;

    const matchesSearch =
      item.brand.toLowerCase().includes(search) ||
      item.size.toLowerCase().includes(search);

    return sameType && matchesSearch;
  });

  if (filtered.length === 0) {
    list.innerHTML = "<p>No tyres found for this category.</p>";
    return;
  }

  list.innerHTML = filtered
    .map((item) => {
      const lowStockClass = item.quantity <= 5 ? "low-stock" : "";

      return `
        <div class="stock-item ${lowStockClass}">
          <div>
            <strong>${item.brand}</strong><br>
            <small>Size: ${item.size}</small><br>
            <small>Type: ${formatTypeLabel(item.type).replace(" Tyres", "")}</small>
          </div>

          <div class="stock-right">
            <span class="qty">Stock: ${item.quantity}</span>
            <span class="price">$${item.price}</span>
            <a href="https://wa.me/263771234567?text=Hi%20Mavhiri%2C%20I%20want%20${encodeURIComponent(item.brand + " " + item.size)}" target="_blank">
              Order
            </a>
          </div>
        </div>
      `;
    })
    .join("");
}


// ================= EVENTS =================

function setupEvents() {
  const tyreCards = document.querySelectorAll(".tyre-card");
  const searchInput = document.getElementById("search-input");
  const stockSection = document.getElementById("stock");

  tyreCards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      currentType = card.dataset.type;
      renderStock();

      if (stockSection) {
        stockSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", renderStock);
  }
}


// ================= MOBILE MENU =================

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");

  if (!toggle || !nav) return;

  // Toggle menu
  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  // Close when clicking a link
  const links = nav.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("show");
    }
  });
}


// ================= INIT =================

document.addEventListener("DOMContentLoaded", async () => {
  setupEvents();
  setupMobileMenu();
  await loadStock();
});
