import { useEffect, useState } from "react";
import type { Token } from "../types";
import { useSwapAction } from "../hooks/useSwapAction";
import { useValidation } from "../hooks/useValidation";
import TokenPicker from "./TokenPicker";
import SwapButton from "./SwapButton";
import { getTokenIconUrl } from "../utils/tokenIconUrl";
import { formatBalance } from "../utils/formatters";
import { ChevronDown, ArrowDownUp, Wallet } from "../assets/icons";

interface SwapFormProps {
  tokens: Token[];
  onSwapSuccess: () => void;
}

const SwapForm = ({ tokens, onSwapSuccess }: SwapFormProps) => {
  const {
    fromToken,
    toToken,
    inputValue,
    outputAmount,
    setFromToken,
    setToToken,
    handleInputChange,
    handleSwapDirection,
    handleSwap,
    initializeDefaultTokens,
  } = useSwapAction({ tokens, onSwapSuccess });

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  // Initialize default tokens
  useEffect(() => {
    initializeDefaultTokens();
  }, [initializeDefaultTokens]);

  const validation = useValidation(
    inputValue,
    fromToken?.balance || 0,
    fromToken?.symbol || ""
  );

  const handleSwapClick = () => {
    if (validation.isValid) {
      handleSwap();
    }
  };

  return (
    <div className="w-full max-w-md p-4 shadow-2xl rounded-2xl/30 shadow-white/10">
      <div className="mb-4">
        <span className="font-semibold text-xl text-white">Swap</span>
      </div>
      <div className="mb-2">
        <span className="text-muted-foreground text-sm">From</span>
      </div>

      {/* From Token Card */}
      <div className="bg-card border-border rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <button
            onClick={() => setShowFromPicker(true)}
            className="flex items-center gap-3 hover:bg-muted p-2 -ml-2 rounded-lg transition-colors"
          >
            {fromToken ? (
              <>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <img
                    src={getTokenIconUrl(fromToken.symbol)}
                    alt={`${fromToken.symbol} icon`}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-white">
                      {fromToken.symbol}
                    </span>
                    <ChevronDown className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {fromToken.symbol} Token
                  </span>
                </div>
              </>
            ) : (
              <span className="font-semibold text-white">Select Token</span>
            )}
          </button>

          <div className="text-right">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="0"
              className="bg-transparent text-4xl font-semibold text-right outline-none w-full text-white placeholder:text-muted-foreground"
            />
            {fromToken && (
              <span className="text-sm text-muted-foreground">
                ≈${(fromToken.priceInUSD * Number(inputValue)).toFixed(6)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">My Wallet</span>
          {fromToken && (
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {formatBalance(fromToken.balance)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className="flex justify-center -my-2 absolute m-auto left-0 right-0 z-10">
        <button
          onClick={handleSwapDirection}
          className="bg-background border-border relative bottom-1 rounded-full p-4 hover:bg-muted transition-colors"
        >
          <ArrowDownUp className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="mb-2">
        <span className="text-muted-foreground text-sm">To</span>
      </div>
      {/* To Token Card */}
      <div className="bg-card border-border rounded-2xl p-6 mb-6 mt-2">
        <div className="flex items-start justify-between mb-4">
          <button
            onClick={() => setShowToPicker(true)}
            className="flex items-center gap-3 hover:bg-muted p-2 -ml-2 rounded-lg transition-colors"
          >
            {toToken ? (
              <>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <img
                    src={getTokenIconUrl(toToken.symbol)}
                    alt={`${toToken.symbol} icon`}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-white">
                      {toToken.symbol}
                    </span>
                    <ChevronDown className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {toToken.symbol} Token
                  </span>
                </div>
              </>
            ) : (
              <span className="font-semibold text-white">Select Token</span>
            )}
          </button>

          <div className="text-right">
            <input
              type="text"
              value={outputAmount}
              readOnly
              placeholder="0"
              className="bg-transparent text-4xl font-semibold text-right outline-none w-full text-white placeholder:text-muted-foreground"
            />
            {toToken && (
              <span className="text-sm text-muted-foreground">
                ≈${(toToken.priceInUSD * Number(outputAmount)).toFixed(6)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">My Wallet</span>
          {toToken && (
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {formatBalance(toToken.balance)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Swap Button */}
      <SwapButton
        isValid={validation.isValid}
        errorMessage={validation.errorMessage}
        onClick={handleSwapClick}
      />

      {/* Token Pickers */}
      {showFromPicker && (
        <TokenPicker
          tokens={tokens}
          onSelect={setFromToken}
          onClose={() => setShowFromPicker(false)}
          currentToken={fromToken}
        />
      )}
      {showToPicker && (
        <TokenPicker
          tokens={tokens}
          onSelect={setToToken}
          onClose={() => setShowToPicker(false)}
          currentToken={toToken}
        />
      )}
    </div>
  );
};

export default SwapForm;
