import type { Token } from "../types";
import { getTokenIconUrl } from "../utils/tokenIconUrl";
import { formatBalance } from "../utils/formatters";

interface TokenRowProps {
  token: Token;
  onClick: (token: Token) => void;
  disabled?: boolean;
}

const TokenRow = ({ token, onClick, disabled = false }: TokenRowProps) => {
  return (
    <button
      onClick={() => !disabled && onClick(token)}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <img
        src={getTokenIconUrl(token.symbol)}
        alt={`${token.symbol} icon`}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 text-left">
        <div className="font-semibold text-white">{token.symbol}</div>
        <div className="text-sm text-muted-foreground">
          Balance: {formatBalance(token.balance)}
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        ${token.priceInUSD.toFixed(6)}
      </div>
    </button>
  );
};

export default TokenRow;
