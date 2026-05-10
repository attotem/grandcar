import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface BackProps {
  onBack?: () => void;
}

const Back = ({ onBack }: BackProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Telegram?.WebApp) return;

    const backButton = window.Telegram.WebApp.BackButton;

    backButton.show();

    const handleClick = () => {
      if (onBack) onBack();
      else navigate(-1);
    };

    backButton.onClick(handleClick);

    return () => {
      backButton.offClick(handleClick);
      backButton.hide();
    };
  }, [navigate, onBack]);

  return null;
};

export default Back;
