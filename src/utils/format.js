export const formatCurrency = (amount) => `Rs. ${Number(amount ?? 0).toFixed(2)}`;

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
