import { useState } from 'react';
import DashboardWidget from '../components/DashboardWidget';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const widgets = [
    {
      type: 'patients-summary',
      title: 'Patients Summary',
      data: {
        total: 24,
        new: 8,
        followups: 16
      }
    },
    // ... other widgets
  ];

  return (
    <div className="dashboard">
      <div className="sidebar">
        {/* Sidebar navigation */}
      </div>
      
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          {/* Header actions */}
        </header>
        
        <div className="dashboard-widgets">
          {widgets.map((widget, index) => (
            <DashboardWidget key={index} widget={widget} />
          ))}
        </div>
      </div>
    </div>
  );
}