import { useState, useMemo, useRef } from 'react';
import type { Token } from '../types';
import TokenRow from './TokenRow';

interface TokenPickerProps {
  tokens: Token[];
  onSelect: (token: Token) => void;
  onClose: () => void;
  currentToken?: Token | null;
}

const ITEMS_PER_PAGE = 10;

const TokenPicker = ({ tokens, onSelect, onClose, currentToken }: TokenPickerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter tokens by search query
  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokens;
    return tokens.filter(token =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tokens, searchQuery]);

  const displayedTokens = filteredTokens.slice(0, displayCount);

  // Handle scroll for infinite loading
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (displayCount < filteredTokens.length) {
        setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredTokens.length));
      }
    }
  };

  const handleSelect = (token: Token) => {
    onSelect(token);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-popover border border-color rounded-xl w-full max-w-md mx-4 max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-color">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-white">Select Token</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:color text-2xl leading-none"
            >
              ×
            </button>
          </div>
          {/* Search */}
          <input
            type="text"
            placeholder="Search by token name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-input border border-color text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            autoFocus
          />
        </div>

        {/* Token List */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto"
        >
          {displayedTokens.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No tokens found
            </div>
          ) : (
            displayedTokens.map((token) => (
              <TokenRow
                key={token.symbol}
                token={token}
                onClick={handleSelect}
                disabled={token.symbol === currentToken?.symbol}
              />
            ))
          )}
          {displayCount < filteredTokens.length && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              Scroll for more...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenPicker;

