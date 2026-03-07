import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App';

// 카카오 SDK 초기세팅
if (!window.Kakao.isInitialized()) {
  window.Kakao.init('9b66f362b64d428e807a5d70a2b2b443');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
