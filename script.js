const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("add-btn");
const expenseTableBody = document.querySelector("#expense-table tbody");
const totalDisplay = document.getElementById("total");
const expenseChartCanvas = document
  .getElementById("expense-chart")
  .getContext("2d");

const incomeDescriptionInput = document.getElementById("income-description");
const incomeAmountInput = document.getElementById("income-amount");
const addIncomeBtn = document.getElementById("add-income-btn");
const incomeTableBody = document.querySelector("#income-table tbody");
const totalIncomeDisplay = document.getElementById("total-income");
const incomeChartCanvas = document
  .getElementById("income-chart")
  .getContext("2d");

let expenses = [];
let totalExpenses = 0;

let incomes = [];
let totalIncome = 0;

function addExpense() {
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (description.trim().length === 0 || amount <= 0 || isNaN(amount)) {
    alert("Please enter valid description and amount");
    return;
  }

  const newExpense = { description, amount };
  expenses.push(newExpense);

  displayExpenses();
  updateCharts();
  clearInputFields();
}

function displayExpenses() {
  expenseTableBody.innerHTML = "";

  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = expense.description;

    const amountCell = document.createElement("td");
    amountCell.textContent = `LKR ${expense.amount.toFixed(2)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    const actionsCell = document.createElement("td");
    actionsCell.appendChild(deleteButton);

    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(actionsCell);

    expenseTableBody.appendChild(row);

    deleteButton.addEventListener("click", () => {
      deleteExpense(index);
    });
  });

  updateTotalExpenses();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
  updateCharts();
}

function updateTotalExpenses() {
  totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalDisplay.textContent = `LKR ${totalExpenses.toFixed(2)}`;
}

function clearInputFields() {
  descriptionInput.value = "";
  amountInput.value = "";
}

function addIncome() {
  const description = incomeDescriptionInput.value;
  const amount = parseFloat(incomeAmountInput.value);

  if (description.trim().length === 0 || amount <= 0 || isNaN(amount)) {
    alert("Please enter valid description and amount");
    return;
  }

  const newIncome = { description, amount };
  incomes.push(newIncome);

  displayIncomes();
  updateCharts();
  clearIncomeInputFields();
}

function displayIncomes() {
  incomeTableBody.innerHTML = "";

  incomes.forEach((income, index) => {
    const row = document.createElement("tr");

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = income.description;

    const amountCell = document.createElement("td");
    amountCell.textContent = `LKR ${income.amount.toFixed(2)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    const actionsCell = document.createElement("td");
    actionsCell.appendChild(deleteButton);

    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(actionsCell);

    incomeTableBody.appendChild(row);

    deleteButton.addEventListener("click", () => {
      deleteIncome(index);
    });
  });

  updateTotalIncome();
}

function deleteIncome(index) {
  incomes.splice(index, 1);
  displayIncomes();
  updateCharts();
}

function updateTotalIncome() {
  totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  totalIncomeDisplay.textContent = `LKR ${totalIncome.toFixed(2)}`;
}

function clearIncomeInputFields() {
  incomeDescriptionInput.value = "";
  incomeAmountInput.value = "";
}

function updateCharts() {
  updateExpenseChart();
  updateIncomeChart();
}

function updateExpenseChart() {
  const expenseData = expenses.map((expense) => expense.amount);
  updateChart(expenseChartCanvas, expenseData, "Expense Chart", "#FF6384");
}

function updateIncomeChart() {
  const incomeData = incomes.map((income) => income.amount);
  updateChart(incomeChartCanvas, incomeData, "Income Chart", "#36A2EB");
}

function updateChart(canvas, data, label, color) {
  new Chart(canvas, {
    type: "pie",
    data: {
      labels: data.map((item, index) => index + 1), // Use index as labels
      datasets: [
        {
          data: data,
          backgroundColor: color,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: label,
      },
    },
  });
}

addBtn.addEventListener("click", addExpense);
addIncomeBtn.addEventListener("click", addIncome);
