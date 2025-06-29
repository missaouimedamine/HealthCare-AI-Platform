import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserInjured,
  faCalendarCheck,
  faExclamationTriangle,
  faChartLine,
  faPills,
  faPlusCircle,
  faCalendarPlus,
  faFilePrescription,
  faVial,
  faFileMedicalAlt,
  faCommentMedical
} from '@fortawesome/free-solid-svg-icons';

const DashboardWidget = ({ widget }) => {
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'patients-summary':
        return (
          <div className="patients-summary-widget">
            <div className="summary-item">
              <div className="summary-value">{widget.data.total}</div>
              <div className="summary-label">Total Patients</div>
            </div>
            <div className="summary-item">
              <div className="summary-value">{widget.data.new}</div>
              <div className="summary-label">New Patients</div>
            </div>
            <div className="summary-item">
              <div className="summary-value">{widget.data.followups}</div>
              <div className="summary-label">Follow-ups</div>
            </div>
          </div>
        );
      
      case 'appointments':
        return (
          <div className="appointments-widget">
            {widget.data.map((appointment, index) => (
              <div key={index} className="appointment-item">
                <div className="appointment-time">{appointment.time}</div>
                <div className="appointment-details">
                  <h4>{appointment.patient}</h4>
                  <p>{appointment.type}</p>
                </div>
                <span className={`status-badge ${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        );
      
      case 'health-alerts':
        return (
          <div className="alerts-widget">
            {widget.data.map((alert, index) => (
              <div key={index} className={`alert-item ${alert.severity}`}>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <div className="alert-content">
                  <h4>{alert.severity}</h4>
                  <p>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'quick-actions':
        return (
          <div className="quick-actions-widget">
            <div className="action-grid">
              <button className="action-card">
                <FontAwesomeIcon icon={faPlusCircle} />
                <span>New Patient</span>
              </button>
              <button className="action-card">
                <FontAwesomeIcon icon={faCalendarPlus} />
                <span>Schedule Appointment</span>
              </button>
              <button className="action-card">
                <FontAwesomeIcon icon={faFilePrescription} />
                <span>Write Prescription</span>
              </button>
              <button className="action-card">
                <FontAwesomeIcon icon={faVial} />
                <span>Order Test</span>
              </button>
              <button className="action-card">
                <FontAwesomeIcon icon={faFileMedicalAlt} />
                <span>Create Report</span>
              </button>
              <button className="action-card">
                <FontAwesomeIcon icon={faCommentMedical} />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        );
      
      default:
        return <div>Widget type not supported</div>;
    }
  };

  return (
    <div className={`dashboard-widget ${widget.type}`}>
      <div className="widget-header">
        <h3>{widget.title}</h3>
        {widget.action && <button className="widget-action">{widget.action}</button>}
      </div>
      <div className="widget-body">
        {renderWidgetContent()}
      </div>
    </div>
  );
};

export default DashboardWidget;