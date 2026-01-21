//Instruction On expense-tracker-code-explained.md

//1. Import data from file:
import theExpenses from "./expense-data.js";

//2. Get the container that will hold cards of all of our objects:
const expenseContainer = document.getElementById("expense-container");

//3. Render out the data as a grid of cards
function renderExpenses(expenses) {
    const expenseList = document.getElementById("expense-list");

    expenseContainer.innerHTML = ""; //clear container

    expenses.forEach((expense) => {
        expenseContainer.innerHTML += `
        <div class="card" id="${expense.id}">
            <div class="header">
                <div>
                    <div class="title">${expense.title}</div>
                    <div class="meta category">${expense.category}</div>
                </div>
                <div class="amount">${expense.amount}</div>
            </div>

            <div class="meta date">${expense.date}</div>
            <div class="actions">
                <button class="edit-btn" id=${expense.id}>Edit</button>
                <button class="delete-btn" id=${expense.id}>Delete</button>
            </div>
        </div>
        `
    })
}
//4. Render the cards
renderExpenses(theExpenses);

//5. Implement add and edit behavior

document.getElementById("expense-form-add").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const amount = document.getElementById("amount").value;

    if (document.getElementById("submitter").innerText === "Add Expense") {
        if (title && category && date &&!isNaN(amount)) {
            //Create a new expense object that we will add to the grid of cards
            const newExpense = {
                id: theExpenses.length + 1,
                title,
                category,
                date,
                amount
            };

            //To get this to show up, push it to the array of data and then re-render the page
            theExpenses.push(newExpense);

            renderExpenses(theExpenses);

            this.reset();
        } else {
        alert("Please fill in all fields correctly.");
        }
    } else {
        //If the text on the button isn't Add Expense...

            //I DON'T UNDERSTAND HOW THIS LINE WORKS:
        const expenseId = parseInt(document.getElementById("expense-id").value);

        //We are selecting the expense in our array, 
        const expenseToEdit = theExpenses.find((expense) => expense.id === expenseId);

        //Checking for null; did I find a matching element?
        if (expenseToEdit) {
            expenseToEdit.title = title;
            expenseToEdit.category = category;
            expenseToEdit.date = date;
            expenseToEdit.amount = amount;

            //Reset the form to show nothing
            this.reset();

            //Re-render the page
            renderExpenses(theExpenses);
        }
    }
});

//6. Implement live search function as you type

document.getElementById("searchbox").addEventListener("input", function (event) {
    //Target is the searchbox, and we want the value from the searchbox:
    const searchTerm = event.target.value.toLowerCase();
        //Need to make search non-case-sensitive, so we do not care how the user typed in their search

    //Filter: apply a conditional expression to every element and return the ones that evaluate true for that condition
    const filteredExpenses = theExpenses.filter((expense) => expense.title.toLowerCase().includes(searchTerm));

    renderExpenses(filteredExpenses);
});

//7. Add an eventListener to the entire container of items, then differentiate between click events to fire specific logic.

expenseContainer.addEventListener("click", function(event) {

    //Look for the Edit button click OR look for the Delete button click
    if (event.target.classList.contains("delete-btn")) {
        const expenseId = parseInt(event.target.id);

        const expenseIndex = theExpenses.findIndex((expense => expense.id === expenseId)) ;
    if (expenseIndex != -1) {

        theExpenses.splice(expenseIndex, 1);
        renderExpenses(theExpenses);
    }
    } else if (event.target.classList.contains("edit-btn")) {
        const expenseId = parseInt(event.target.id);
        const expenseToEdit = theExpenses.find((expense) => expense.id === expenseId);
        
        if (expenseToEdit) {
            document.getElementById("title").value = expenseToEdit.title;
            document.getElementById("category").value = expenseToEdit.category;
            document.getElementById("date").value = expenseToEdit.date;
            document.getElementById("amount").value = expenseToEdit.amount;
            document.getElementById("expense-id").value = expenseToEdit.id;

            document.getElementById("submitter").innerText = "Save Changes";
        }
    }
})