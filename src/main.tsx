import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ScheduleProvider } from './contexts/ScheduleContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScheduleProvider>
      <App />
    </ScheduleProvider>
  </React.StrictMode>
)
