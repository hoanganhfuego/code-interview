import { useState } from 'react';
import './index.css';
import { useFakeBalancesPrices } from './services/useFakeBalancesPrices';
import LoadingScreen from './components/LoadingScreen';
import SwapForm from './components/SwapForm';
import Toast from './components/Toast';

function App() {
  const { tokens, loading } = useFakeBalancesPrices();
  const [showToast, setShowToast] = useState(false);

  const handleSwapSuccess = () => {
    setShowToast(true);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <SwapForm tokens={tokens} onSwapSuccess={handleSwapSuccess} />
      {showToast && (
        <Toast
          message="Swap successful!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App;
