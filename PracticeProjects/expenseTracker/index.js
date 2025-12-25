// target elements
const ExpName = document.getElementById("expenseInput");
const CategoryInput = document.getElementById("categoryInput");
const QtyInput = document.getElementById("quantityInput");
const DateInput = document.getElementById("dateInput");
const AmountInput = document.getElementById("amountInput");
const formE1 = document.getElementById("data-entries");
const tbodyE1 = document.getElementById("tbody");
const Notify = document.getElementById("notify");
const Progress = document.getElementById("progress");
const Message = document.getElementById("notify-msg");
const CloseNotify = document.getElementById("closeNotify");

let notifyTimer;
let progressTimer;
CloseNotify.addEventListener("click", () => {
  Notify.style.display = "none";
  clearTimeout(notifyTimer);
  clearInterval(progressTimer);
});

formE1.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get values from inputs
  const expenseName = ExpName.value;
  const quantity = +QtyInput.value || 1;
  const amount = +AmountInput.value;
  const category = CategoryInput.value;
  const date = DateInput.value || new Date().toISOString().split("T")[0];
  addExpense({
    id: crypto.randomUUID(),
    exp: expenseName,
    Qty: quantity,
    Amt: amount,
    cat: category,
    d: date,
    total: quantity * amount,
  });
  formE1.reset();
});

function addExpense(expense) {
  const exp = readExpense();
  exp.push(expense);
  localStorage.setItem("expense", JSON.stringify(exp));
  notify("Expense Added Successfully");
  ListExpenses();
}

function readExpense() {
  return JSON.parse(localStorage.getItem("expense")) || [];
}

function ListExpenses() {
  tbodyE1.innerHTML = "";
  const exp = readExpense();
  for (let i = 0; i < exp.length; i++) {
    tbodyE1.innerHTML += `
<tr>
  <td>${exp[i].exp}</td>
  <td>${exp[i].Qty}</td>
  <td>${exp[i].Amt}</td>
  <td>${exp[i].cat}</td>
  <td>${exp[i].d}</td>
  <td>${exp[i].total}</td>
  <td class="rowbtn">
    <button data-id="${exp[i].id}" class="edit-btn">Edit</button>
    <button data-id="${exp[i].id}" class="delete-btn">Delete</button>
  </td>
</tr>
`;
  }
}

tbodyE1.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteExpense(e.target.dataset.id);
  }

  if (e.target.classList.contains("edit-btn")) {
    editExpense(e.target.dataset.id);
  }
});

function notify(msg) {
  let progressWidth = 100;
  progressTimer = setInterval(() => {
  progressWidth-=0.33;
  Progress.style.width = progressWidth+"%";
  }, 10);

  notifyTimer = setTimeout(() => {
    console.log("timer cleared");
    Notify.style.display = "none";
    clearInterval(progressTimer);
  }, 3000);
  Notify.style.display = "block";
  Message.innerText = msg;
}

function deleteExpense(id) {
  const exp = readExpense();
  const filtered = exp.filter((item) => item.id !== id);
  localStorage.setItem("expense", JSON.stringify(filtered));
  notify("Expense Deleted Successfully");
  ListExpenses();
}

function editExpense(id) {
  console.log("edit item", id);
}

ListExpenses();
