import { useState, useEffect } from 'react';
import DailyForm from './components/DailyForm';
import ChartSection from './components/ChartSection';
import './App.css';

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('lifeData');
    return saved ? JSON.parse(saved) : {};
  });
  const [theme, setTheme] = useState('dark');
  const [message, setMessage] = useState('');

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayEntry = data[todayKey];

  const handleSave = (date, entry) => {
    const updated = { ...data, [date]: entry };
    setData(updated);
    localStorage.setItem('lifeData', JSON.stringify(updated));
    setMessage('✅ Entry Saved!');
    setTimeout(() => setMessage(''), 2000);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'my-life-data.json';
    link.click();
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const renderSummary = () => {
    if (!todayEntry) return <div className="summary-card">No entry logged today yet.</div>;
    return (
      <div className="summary-card">
        {todayEntry.mood} Mood • {todayEntry.sleep || 0} hrs Sleep • {todayEntry.water || 0} cups Water • {todayEntry.workout ? '✅' : '❌'} Workout
      </div>
    );
  };

  return (
    <div className="app-container">
      <header>
        <h1>📊 Moodlytics</h1>
        <div className="toolbar">
          <button onClick={toggleTheme}>🌓 Toggle Theme</button>
          <button onClick={exportData}>⬇️ Export Data</button>
        </div>
      </header>

      <p className="entry-count">📅 Logged Entries: {Object.keys(data).length}</p>

      {renderSummary()}

      <DailyForm onSave={handleSave} />

      {message && <div className="toast">{message}</div>}

      <ChartSection data={data} />
    </div>
  );
}

export default App;