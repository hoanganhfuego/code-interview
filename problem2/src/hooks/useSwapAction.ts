import { useState } from 'react';
import type { Token } from '../types';

interface UseSwapActionProps {
  tokens: Token[];
  onSwapSuccess: () => void;
}

export const useSwapAction = ({ tokens, onSwapSuccess }: UseSwapActionProps) => {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [inputValue, setInputValue] = useState('');

  // Initialize default tokens (top 2 by balance)
  const initializeDefaultTokens = () => {
    if (tokens.length >= 2 && !fromToken && !toToken) {
      setFromToken(tokens[0]);
      setToToken(tokens[1]);
    }
  };

  // Calculate output amount - simple arithmetic, no memoization needed
  const calculateOutputAmount = () => {
    if (!inputValue || !fromToken || !toToken || !fromToken.priceInUSD || !toToken.priceInUSD) {
      return '';
    }

    const inputNum = parseFloat(inputValue);
    if (isNaN(inputNum) || inputNum <= 0) return '';

    const result = (inputNum * fromToken.priceInUSD) / toToken.priceInUSD;
    return result.toString();
  };

  const handleInputChange = (value: string) => {
    // Allow only numbers and one decimal point
    const sanitized = value.replace(/[^0-9.]/g, '');
    const parts = sanitized.split('.');
    if (parts.length > 2) return; // Prevent multiple decimals
    setInputValue(sanitized);
  };

  const handleSwapDirection = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleSwap = () => {
    // Trigger success callback
    onSwapSuccess();
    // Reset only input value, keep selected tokens
    setInputValue('');
  };

  const resetInput = () => {
    setInputValue('');
  };

  return {
    fromToken,
    toToken,
    inputValue,
    outputAmount: calculateOutputAmount(),
    setFromToken,
    setToToken,
    handleInputChange,
    handleSwapDirection,
    handleSwap,
    resetInput,
    initializeDefaultTokens,
  };
};

