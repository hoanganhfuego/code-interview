import { useState, useEffect } from 'react';
import type { Token, TokenPrice } from '../types';
import balancesData from '../data/balances.json';

const PRICES_API = 'https://interview.switcheo.com/prices.json';

export const useFakeBalancesPrices = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate 3s loading
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Fetch prices
        const response = await fetch(PRICES_API);
        const prices: TokenPrice[] = await response.json();

        // Combine balances with prices
        const tokenList: Token[] = Object.entries(balancesData).map(([symbol, balance]) => {
          const tokenPrice = prices.find(p => p.currency === symbol);
          return {
            symbol,
            balance,
            priceInUSD: tokenPrice?.price || 0,
          };
        });

        // Sort by balance (descending)
        tokenList.sort((a, b) => b.balance - a.balance);

        setTokens(tokenList);
        setLoading(false);
      } catch {
        setError('Failed to load tokens');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tokens, loading, error };
};

