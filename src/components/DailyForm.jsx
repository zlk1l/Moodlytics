import { useState } from 'react';
import './DailyForm.css';

function DailyForm({ onSave }) {
  const [form, setForm] = useState({
    mood: '🙂',
    sleep: '',
    water: '',
    workout: false,
  });

  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(date, form);
    setForm({ mood: '🙂', sleep: '', water: '', workout: false });
  };

  return (
    <form onSubmit={handleSubmit} className="daily-form animate">
      <h2>Log Your Day</h2>

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label>
        Mood:
        <select name="mood" value={form.mood} onChange={handleChange}>
          <option>😄</option>
          <option>🙂</option>
          <option>😐</option>
          <option>😔</option>
        </select>
      </label>

      <label>
        Sleep (hrs):
        <input
          type="number"
          name="sleep"
          value={form.sleep}
          onChange={handleChange}
        />
      </label>

      <label>
        Water (cups):
        <input
          type="number"
          name="water"
          value={form.water}
          onChange={handleChange}
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          name="workout"
          checked={form.workout}
          onChange={handleChange}
        />
        Workout today?
      </label>

      <button type="submit">Save Entry</button>
    </form>
  );
}

export default DailyForm;