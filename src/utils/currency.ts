/**
 * Helper to format monetary values in Indian Rupees (₹)
 */
export const formatCurrency = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  
  // Format with standard Indian numbering format (e.g. ₹1,499.00 or ₹14,999)
  const isWhole = Number.isInteger(amount) || amount % 1 === 0;
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2
  })}`;
};

export const formatRupees = formatCurrency;
