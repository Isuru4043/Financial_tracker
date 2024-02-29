document.addEventListener("DOMContentLoaded", function () {
  // Selecting elements from the DOM
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const addButton = document.getElementById("add-btn");
  const expenseTableBody = document.querySelector(".expense-list tbody");
  const totalExpensesSpan = document.getElementById("total");

  // Event listener for the "Add Expense" button
  addButton.addEventListener("click", function () {
    // Get the values from the input fields
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    // Validate the inputs
    if (!description || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid description and amount.");
      return;
    }

    // Create a new row in the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${description}</td>
      <td>${amount.toFixed(2)}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    // Append the new row to the table
    expenseTableBody.appendChild(newRow);

    // Clear the input fields
    descriptionInput.value = "";
    amountInput.value = "";

    // Update the total expenses
    updateTotalExpenses();
  });

  // Event delegation for handling delete button clicks
  expenseTableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const row = event.target.closest("tr");
      row.remove();

      // Update the total expenses after deleting a row
      updateTotalExpenses();
    }
  });

  // Function to update the total expenses
  function updateTotalExpenses() {
    const expenseRows = document.querySelectorAll(".expense-list tbody tr");
    let totalExpenses = 0;

    // Calculate the total from the table rows
    expenseRows.forEach((row) => {
      const amountCell = row.querySelector("td:nth-child(2)");
      const amount = parseFloat(amountCell.textContent);
      totalExpenses += amount;
    });

    // Update the total expenses in the span
    totalExpensesSpan.textContent = totalExpenses.toFixed(2);
  }
});
