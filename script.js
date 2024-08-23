document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const convertedAmount = document.getElementById('convertedAmount');
    const historyList = document.getElementById('historyList');

    const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD';

    // Fetch available currencies and set up the select options
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });

            // Set default currencies
            fromCurrency.value = 'USD';
            toCurrency.value = 'EUR';
        });

    convertBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const result = amount * rate;
                convertedAmount.textContent = `${result.toFixed(2)} ${to}`;
                addToHistory(`${amount} ${from} = ${result.toFixed(2)} ${to}`);
            });
    });

    function addToHistory(conversion) {
        const li = document.createElement('li');
        li.textContent = conversion;
        historyList.appendChild(li);
    }
});
