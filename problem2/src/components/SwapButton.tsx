interface SwapButtonProps {
  isValid: boolean;
  errorMessage: string;
  onClick: () => void;
}

const SwapButton = ({ isValid, errorMessage, onClick }: SwapButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={!isValid}
      className={`w-full py-4 rounded-lg font-semibold transition-colors ${
        isValid
          ? 'bg-accent text-accent-foreground hover:bg-accent/90'
          : 'bg-muted text-muted-foreground cursor-not-allowed'
      }`}
    >
      {isValid ? 'Swap' : errorMessage || 'Enter amount'}
    </button>
  );
};

export default SwapButton;

