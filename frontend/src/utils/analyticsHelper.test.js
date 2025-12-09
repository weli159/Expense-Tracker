// You might need to extract the math logic from Analytics.js into a helper function first
const calculateTurnover = (transactions) => {
    return transactions.reduce((acc, t) => acc + t.amount, 0);
};

test('Calculates total turnover correctly', () => {
    const mockData = [
        { amount: 100, transactionType: 'credit' },
        { amount: 50, transactionType: 'expense' }
    ];
    expect(calculateTurnover(mockData)).toBe(150);
});