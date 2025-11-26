import { isValidNumber } from '../utils/formatters';

export const useValidation = (
  inputValue: string,
  fromTokenBalance: number,
  fromTokenSymbol: string
) => {
  // Simple validation logic - no memoization needed for basic checks
  if (!inputValue || inputValue === '') {
    return {
      isValid: false,
      errorMessage: '',
    };
  }

  if (!isValidNumber(inputValue)) {
    return {
      isValid: false,
      errorMessage: 'Please enter a valid number',
    };
  }

  const numValue = parseFloat(inputValue);

  if (numValue > fromTokenBalance) {
    return {
      isValid: false,
      errorMessage: `Insufficient ${fromTokenSymbol} balance, please deposit funds`,
    };
  }

  if (fromTokenBalance === 0) {
    return {
      isValid: false,
      errorMessage: `Insufficient ${fromTokenSymbol} balance, please deposit funds`,
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

