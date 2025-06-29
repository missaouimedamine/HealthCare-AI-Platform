import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SymptomItem({ symptom, selected, onToggle }) {
  return (
    <div 
      className={`symptom-item ${selected ? 'selected' : ''}`}
      onClick={() => onToggle(symptom)}
    >
      
      <ul className="symptom-details">
        <h3>{symptom.name}</h3>
        
      </ul>
 
    </div>
  );
}