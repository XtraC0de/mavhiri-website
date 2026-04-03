let stockData = [];
let currentType = "car";

/* ================= HELPERS ================= */

function formatTypeLabel(type) {
  return type.charAt(0).toUpperCase() + type.slice(1) + " Tyres";
}

/* ================= LOAD STOCK ================= */

async function loadStock() {
  try {
    const response = await fetch("stock.json");
    if (!response.ok) throw new Error("Could not load stock.json");

    stockData = await response.json();
    renderStock();
  } catch (error) {
    console.error("Error loading stock:", error);
    document.getElementById("stock-list").innerHTML =
      "<p>Failed to load stock data.</p>";
  }
}

/* ================= RENDER STOCK ================= */

function renderStock() {
  const list = document.getElementById("stock-list");
  const title = document.getElementById("stock-title");
  const searchInput = document.getElementById("search-input");

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
            <strong>${item.brand}</strong>
            <small>Size: ${item.size}</small>
            <small>Type: ${formatTypeLabel(item.type).replace(" Tyres", "")}</small>
          </div>

          <div class="stock-right">
            <span class="qty">Stock: ${item.quantity}</span>
            <span>$${item.price}</span>

            <a href="https://wa.me/263771234567?text=Hi%20Mavhiri%2C%20I%20am%20interested%20in%20${encodeURIComponent(item.brand + " " + item.size)}" target="_blank">
              Order
            </a>
          </div>
        </div>
      `;
    })
    .join("");
}

/* ================= EVENTS ================= */

function setupEvents() {
  const tyreCards = document.querySelectorAll(".tyre-card");
  const searchInput = document.getElementById("search-input");
  const stockSection = document.getElementById("stock");

  tyreCards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      currentType = card.dataset.type;
      renderStock();

      stockSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  searchInput.addEventListener("input", renderStock);
}

/* ================= HAMBURGER MENU ================= */

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("mobile-nav");

  if (!toggle || !nav) return;

  const navLinks = nav.querySelectorAll("a");

  // Toggle menu
  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  // Close when clicking a link
  navLinks.forEach((link) => {
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

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", async () => {
  setupEvents();
  setupMobileMenu();
  await loadStock();
});
