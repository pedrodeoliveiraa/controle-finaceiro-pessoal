let transactions = loadTransactions();
let salary = loadSalary();
let expenseChart; // Variável para armazenar o gráfico

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value) || 0;

    if (!description || amount <= 0) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    const transaction = {
        description: description,
        amount: amount
    };

    transactions.push(transaction);
    saveTransactions();
    displayTransactions();
    updateBalance();
    clearFields();
}

function displayTransactions() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${transaction.description} - R$ ${transaction.amount.toFixed(2)}
            <button onclick="deleteTransaction(${index})">X</button>
        `;
        transactionList.appendChild(listItem);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveTransactions();
    displayTransactions();
    updateBalance();
}

function updateBalance() {
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const balance = salary - total;
    const usagePercentage = salary > 0 ? ((total / salary) * 100).toFixed(2) : 0;

    const totalBalanceElement = document.getElementById("total-balance");
    const salaryUsageElement = document.getElementById("salary-usage");

    totalBalanceElement.textContent = `R$ ${balance.toFixed(2)}`;
    salaryUsageElement.textContent = `${usagePercentage}%`;

    totalBalanceElement.classList.remove("balance-positive", "balance-negative", "balance-warning");

    if (balance < 0) {
        totalBalanceElement.classList.add("balance-negative");
    } else if (usagePercentage > 70) {
        totalBalanceElement.classList.add("balance-warning");
    } else {
        totalBalanceElement.classList.add("balance-positive");
    }

    renderExpenseChart();
}

function clearFields() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
}

function saveSalary() {
    salary = parseFloat(document.getElementById("salary").value) || 0;
    localStorage.setItem("salary", salary);
    updateBalance();
}

function loadSalary() {
    const savedSalary = localStorage.getItem("salary");
    return savedSalary ? parseFloat(savedSalary) : 0;
}

function initializeSystem() {
    document.getElementById("salary").value = salary || '';
    displayTransactions();
    updateBalance();
}

// Função para renderizar o gráfico de despesas
function renderExpenseChart() {
    const ctx = document.getElementById("expenseChart").getContext("2d");

    // Extrair categorias e valores das transações
    const labels = transactions.map(transaction => transaction.description);
    const data = transactions.map(transaction => transaction.amount);

    // Verifica se o gráfico já existe e o destrói antes de criar um novo
    if (expenseChart) {
        expenseChart.destroy();
    }

    // Cria o gráfico de pizza
    expenseChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                label: "Despesas",
                data: data,
                backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3", "#9c27b0"],
                borderColor: "#fff",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: R$ ${context.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

initializeSystem();
