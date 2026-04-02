let stockItems = [];
let editId = null;

const STORAGE_KEY = "mavhiri_stock_data";

function getDefaultData() {
  return [
    {
      id: 1,
      type: "car",
      brand: "Michelin",
      size: "225/45R17",
      quantity: 12,
      price: 1200
    },
    {
      id: 2,
      type: "car",
      brand: "Bridgestone",
      size: "195/65R15",
      quantity: 8,
      price: 950
    },
    {
      id: 3,
      type: "kombi",
      brand: "Goodyear",
      size: "205R16",
      quantity: 10,
      price: 1800
    },
    {
      id: 4,
      type: "truck",
      brand: "Double Coin",
      size: "315/80R22.5",
      quantity: 6,
      price: 4500
    },
    {
      id: 5,
      type: "bus",
      brand: "Continental",
      size: "295/80R22.5",
      quantity: 4,
      price: 4300
    }
  ];
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stockItems));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  stockItems = saved ? JSON.parse(saved) : getDefaultData();
}

function getFormValues() {
  return {
    type: document.getElementById("type").value,
    brand: document.getElementById("brand").value.trim(),
    size: document.getElementById("size").value.trim(),
    quantity: Number(document.getElementById("quantity").value),
    price: Number(document.getElementById("price").value)
  };
}

function clearForm() {
  document.getElementById("type").value = "car";
  document.getElementById("brand").value = "";
  document.getElementById("size").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
  document.getElementById("form-title").textContent = "Add New Tyre";
  editId = null;
}

function validateForm(data) {
  if (!data.brand || !data.size) {
    alert("Please enter brand and size.");
    return false;
  }

  if (Number.isNaN(data.quantity) || data.quantity < 0) {
    alert("Please enter a valid quantity.");
    return false;
  }

  if (Number.isNaN(data.price) || data.price < 0) {
    alert("Please enter a valid price.");
    return false;
  }

  return true;
}

function renderAdminList() {
  const list = document.getElementById("admin-list");

  if (stockItems.length === 0) {
    list.innerHTML = "<p>No tyres added yet.</p>";
    return;
  }

  list.innerHTML = stockItems
    .sort((a, b) => a.type.localeCompare(b.type) || a.brand.localeCompare(b.brand))
    .map((item) => {
      return `
        <div class="admin-item">
          <div>
            <strong>${item.brand}</strong><br>
            <small>Type: ${item.type}</small><br>
            <small>Size: ${item.size}</small><br>
            <small>Quantity: ${item.quantity}</small><br>
            <small>Price: $${item.price}</small>
          </div>
          <div class="admin-item-right">
            <button onclick="editTyre(${item.id})">Edit</button>
            <button class="btn-danger-admin" onclick="deleteTyre(${item.id})">Delete</button>
          </div>
        </div>
      `;
    })
    .join("");
}

function addOrUpdateTyre() {
  const data = getFormValues();
  if (!validateForm(data)) return;

  if (editId !== null) {
    stockItems = stockItems.map((item) =>
      item.id === editId ? { ...item, ...data, id: editId } : item
    );
  } else {
    const newId = stockItems.length ? Math.max(...stockItems.map((i) => i.id)) + 1 : 1;
    stockItems.push({ id: newId, ...data });
  }

  saveToLocalStorage();
  renderAdminList();
  clearForm();
}

window.editTyre = function (id) {
  const item = stockItems.find((i) => i.id === id);
  if (!item) return;

  editId = id;
  document.getElementById("form-title").textContent = "Edit Tyre";
  document.getElementById("type").value = item.type;
  document.getElementById("brand").value = item.brand;
  document.getElementById("size").value = item.size;
  document.getElementById("quantity").value = item.quantity;
  document.getElementById("price").value = item.price;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.deleteTyre = function (id) {
  const confirmed = confirm("Delete this tyre?");
  if (!confirmed) return;

  stockItems = stockItems.filter((item) => item.id !== id);
  saveToLocalStorage();
  renderAdminList();

  if (editId === id) {
    clearForm();
  }
};

function exportJSON() {
  const jsonString = JSON.stringify(stockItems, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "stock.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function clearAllData() {
  const confirmed = confirm("This will remove all tyres from the admin list. Continue?");
  if (!confirmed) return;

  stockItems = [];
  saveToLocalStorage();
  renderAdminList();
  clearForm();
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderAdminList();

  document.getElementById("save-btn").addEventListener("click", addOrUpdateTyre);
  document.getElementById("cancel-edit-btn").addEventListener("click", clearForm);
  document.getElementById("export-btn").addEventListener("click", exportJSON);
  document.getElementById("clear-btn").addEventListener("click", clearAllData);
});
