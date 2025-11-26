export const formatBalance = (balance: number): string => {
  return balance.toLocaleString('en-US', {
    maximumFractionDigits: 8,
  });
};

export const formatNumber = (value: string): string => {
  // Allow only numbers and decimal point
  return value.replace(/[^0-9.]/g, '');
};

export const isValidNumber = (value: string): boolean => {
  if (!value || value === '') return false;
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

