// Cache DOM elements
const elements = {
  ExpName: document.getElementById("expenseInput"),
  CategoryInput: document.getElementById("categoryInput"),
  QtyInput: document.getElementById("quantityInput"),
  DateInput: document.getElementById("dateInput"),
  AmountInput: document.getElementById("amountInput"),
  formE1: document.getElementById("data-entries"),
  tbodyE1: document.getElementById("tbody"),
  Notify: document.getElementById("notify"),
  Progress: document.getElementById("progress"),
  Message: document.getElementById("notify-msg"),
  CloseNotify: document.getElementById("closeNotify")
};

let notifyTimer;
let progressTimer;

// Notification handlers - ORIGINAL notify behavior
elements.CloseNotify.addEventListener("click", () => {
  elements.Notify.style.display = "none";
  clearTimeout(notifyTimer);
  clearInterval(progressTimer);
});

elements.formE1.addEventListener("submit", function (event) {
  event.preventDefault();

  const expenseName = elements.ExpName.value.trim();
  if (!expenseName) {
    notify("Please enter an expense name");
    return;
  }

  const expense = {
    id: crypto.randomUUID(),
    exp: expenseName,
    Qty: +elements.QtyInput.value || 1,
    Amt: +elements.AmountInput.value || 0,
    cat: elements.CategoryInput.value || 'others',
    d: elements.DateInput.value || new Date().toISOString().split("T")[0],
    total: (+elements.QtyInput.value || 1) * (+elements.AmountInput.value || 0)
  };

  addExpense(expense);
  elements.formE1.reset();
});

function addExpense(expense) {
  const expenses = readExpense();
  expenses.push(expense);
  localStorage.setItem("expense", JSON.stringify(expenses));
  notify("Expense Added Successfully");
  ListExpenses();
}

function readExpense() {
  try {
    return JSON.parse(localStorage.getItem("expense")) || [];
  } catch {
    return [];
  }
}

function ListExpenses() {
  elements.tbodyE1.innerHTML = "";
  const expenses = readExpense();
  
  expenses.forEach(exp => {
    const row = document.createElement("tr");
    row.className = "row";
    row.innerHTML = `
      <td>${escapeHtml(exp.exp)}</td>
      <td>${exp.Qty}</td>
      <td>₹${exp.Amt.toLocaleString()}</td>
      <td>${escapeHtml(exp.cat)}</td>
      <td>${exp.d}</td>
      <td>₹${exp.total.toLocaleString()}</td>
      <td class="rowbtn">
        <button data-id="${exp.id}" class="edit-btn">Edit</button>
        <button data-id="${exp.id}" class="delete-btn">Delete</button>
      </td>
    `;
    elements.tbodyE1.appendChild(row);
  });
}

// Event delegation for table actions
elements.tbodyE1.addEventListener("click", (e) => {
  // Show edit modal
  if (e.target.classList.contains("edit-btn")) {
    const expenseId = e.target.dataset.id;
    showEditModal(expenseId);
    return;
  }

  // Show delete confirmation modal
  if (e.target.classList.contains("delete-btn")) {
    const expenseId = e.target.dataset.id;
    showDeleteModal(expenseId);
    return;
  }
});

// Global modal event handlers
document.addEventListener("click", (e) => {
  // Cancel edit / Close edit modal
  if (e.target.classList.contains("cancelSave") || e.target.classList.contains("modalClose")) {
    const updateModel = document.querySelector(".updateModel");
    if (updateModel) {
      updateModel.style.display = "none";
      updateModel.remove();
    }
  }

  // Save edit
  if (e.target.classList.contains("saveEdit")) {
    const updateModel = e.target.closest(".updateModel");
    const updateId = updateModel.dataset.updateid;
    const newItem = getUpdatedValues(updateModel);
    
    if (newItem && newItem.exp.trim()) {
      updateModel.style.display = "none";
      updateModel.remove();
      editExpense(updateId, newItem);
    } else {
      notify("Please fill all required fields");
    }
  }

  // Confirm delete
  if (e.target.classList.contains("confirmDelete")) {
    const deleteModal = e.target.closest(".deleteModal");
    const expenseId = deleteModal.dataset.deleteid;
    deleteModal.style.display = "none";
    deleteModal.remove();
    deleteExpense(expenseId);
  }

  // Cancel delete
  if (e.target.classList.contains("cancelDelete")) {
    const deleteModal = document.querySelector(".deleteModal");
    if (deleteModal) {
      deleteModal.style.display = "none";
      deleteModal.remove();
    }
  }
});

// Prevent modal close when clicking inside modal content
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("updateModel") || e.target.classList.contains("deleteModal")) {
    e.stopPropagation();
  }
});

// ESC key to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".updateModel, .deleteModal").forEach(modal => {
      modal.style.display = "none";
      modal.remove();
    });
  }
});

// Show centered edit modal
function showEditModal(expenseId) {
  const expenses = readExpense();
  const expense = expenses.find(exp => exp.id === expenseId);
  
  if (!expense) {
    notify("Expense not found");
    return;
  }

  // Remove existing modals
  document.querySelectorAll(".updateModel, .deleteModal").forEach(modal => modal.remove());

  // Create new modal
  const modal = document.createElement("div");
  modal.className = "updateModel";
  modal.dataset.updateid = expenseId;
  modal.innerHTML = `
    <div class="updateModalContent">
      <button class="modalClose" title="Close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <h3 style="grid-column: 1 / -1; text-align: center; margin-bottom: 1.5rem; color: #333; font-size: 1.5rem;">Edit Expense</h3>
      <div class="edit-form">
        <input type="text" value="${escapeHtml(expense.exp)}" data-field="exp" placeholder="Expense Name" required />
        <input type="number" value="${expense.Qty}" min="1" data-field="Qty" placeholder="Quantity" />
        <input type="number" value="${expense.Amt}" min="1" data-field="Amt" placeholder="Amount (₹)" required />
        <select data-field="cat">
          <option value="food" ${expense.cat === 'food' ? 'selected' : ''}>Food</option>
          <option value="transport" ${expense.cat === 'transport' ? 'selected' : ''}>Transport</option>
          <option value="health" ${expense.cat === 'health' ? 'selected' : ''}>Health</option>
          <option value="entertainment" ${expense.cat === 'entertainment' ? 'selected' : ''}>Entertainment</option>
          <option value="utilities" ${expense.cat === 'utilities' ? 'selected' : ''}>Utilities</option>
          <option value="savings" ${expense.cat === 'savings' ? 'selected' : ''}>Savings</option>
          <option value="others" ${expense.cat === 'others' ? 'selected' : ''}>Others</option>
        </select>
        <input type="date" value="${expense.d}" data-field="d" />
        <div class="edit-actions">
          <button class="saveEdit">Save Changes</button>
          <button class="cancelSave">Cancel</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display = "flex";

  // Focus first input
  const firstInput = modal.querySelector('input[data-field="exp"]');
  firstInput?.focus();
}

// Show delete confirmation modal
function showDeleteModal(expenseId) {
  // Remove existing modals
  document.querySelectorAll(".updateModel, .deleteModal").forEach(modal => modal.remove());

  const modal = document.createElement("div");
  modal.className = "deleteModal";
  modal.dataset.deleteid = expenseId;
  modal.innerHTML = `
    <div class="updateModalContent">
      <button class="modalClose" title="Close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div style="text-align: center; padding: 2rem 1rem;">
        <i class="fa-solid fa-exclamation-triangle" style="font-size: 4rem; color: #f39c12; margin-bottom: 1rem;"></i>
        <h3 style="color: #333; margin-bottom: 1rem;">Confirm Delete</h3>
        <p style="color: #666; font-size: 1.1rem; margin-bottom: 2rem;">Are you sure you want to delete this expense? This action cannot be undone.</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="confirmDelete">Yes, Delete</button>
          <button class="cancelDelete">Cancel</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display = "flex";
}

function getUpdatedValues(updateModel) {
  const inputs = updateModel.querySelectorAll("[data-field]");
  const newItem = {};
  
  inputs.forEach(input => {
    const field = input.dataset.field;
    let value = input.value.trim();
    
    if (field === 'Qty' || field === 'Amt') {
      value = +value || 0;
    }
    
    newItem[field] = value;
  });
  
  newItem.total = newItem.Qty * newItem.Amt;
  return newItem;
}

// ORIGINAL notify function - unchanged
function notify(msg) {
  let progressWidth = 100;
  progressTimer = setInterval(() => {
    progressWidth -= 0.33;
    elements.Progress.style.width = progressWidth + "%";
  }, 10);

  notifyTimer = setTimeout(() => {
    console.log("timer cleared");
    elements.Notify.style.display = "none";
    clearInterval(progressTimer);
  }, 3000);
  elements.Notify.style.display = "block";
  elements.Message.innerText = msg;
}

function deleteExpense(id) {
  const expenses = readExpense();
  const filtered = expenses.filter(item => item.id !== id);
  localStorage.setItem("expense", JSON.stringify(filtered));
  notify("Expense Deleted Successfully");
  ListExpenses();
}

function editExpense(id, obj) {
  const expenses = readExpense();
  const updatedExpenses = expenses.map(item => 
    item.id === id ? { ...item, ...obj, id } : item
  );
  
  localStorage.setItem("expense", JSON.stringify(updatedExpenses));
  notify("Expense Updated Successfully");
  ListExpenses();
}

// XSS protection
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize
ListExpenses();
