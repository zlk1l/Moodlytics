import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ChartSection.css';

function ChartSection({ data }) {
  const canvasRefLine = useRef(null);
  const canvasRefBar = useRef(null);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;

    const dates = Object.keys(data);
    const sleepData = dates.map(date => Number(data[date].sleep || 0));
    const waterData = dates.map(date => Number(data[date].water || 0));
    const moodCounts = {};

    dates.forEach(date => {
      const mood = data[date].mood;
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    // Line chart
    const lineChart = new Chart(canvasRefLine.current, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Sleep (hrs)',
            data: sleepData,
            borderColor: '#00f',
            tension: 0.3,
          },
          {
            label: 'Water (cups)',
            data: waterData,
            borderColor: '#0f0',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: 'white' } },
        },
        scales: {
          x: { ticks: { color: 'white' } },
          y: { ticks: { color: 'white' } },
        },
      },
    });

    // Bar chart for mood
    const barChart = new Chart(canvasRefBar.current, {
      type: 'bar',
      data: {
        labels: Object.keys(moodCounts),
        datasets: [
          {
            label: 'Mood Count',
            data: Object.values(moodCounts),
            backgroundColor: ['#f39c12', '#2ecc71', '#3498db', '#e74c3c'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: 'white' } },
        },
        scales: {
          x: { ticks: { color: 'white' } },
          y: { ticks: { color: 'white' } },
        },
      },
    });

    return () => {
      lineChart.destroy();
      barChart.destroy();
    };
  }, [data]);

  return (
    <div className="chart-section">
      <div className="chart-box">
        <h2>📈 Sleep & Water</h2>
        <canvas ref={canvasRefLine}></canvas>
      </div>
      <div className="chart-box">
        <h2>📊 Mood Tracker</h2>
        <canvas ref={canvasRefBar}></canvas>
      </div>
    </div>
  );
}

export default ChartSection;