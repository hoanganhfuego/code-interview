import { useEffect } from 'react';
import { Check } from '../assets/icons';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 bg-accent text-accent-foreground px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
      <div className="flex items-center gap-2">
        <Check className="w-5 h-5" />
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;

