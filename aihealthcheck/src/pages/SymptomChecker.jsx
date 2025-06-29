import { useState, useMemo,useEffect } from 'react';
import bodySymptoms from '../assets/data/body_symp.json';
import { transformSymptoms } from '../utils/symptomUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMars, 
  faVenus, 
  faHeartbeat, 
  faCheckCircle,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import conditionsList from '../assets/data/conditions.json';
import { analyzeSymptoms } from '../services/api';
import { getDiseaseInfo } from '../services/info';
import { motion } from 'framer-motion';
// Inside your SymptomChecker component, add these states:

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [conditionsSearchTerm, setConditionsSearchTerm] = useState('');
  // Removed top-level await code. If you need to call the API, define an async function and call it from an event handler or useEffect.
  // Example:
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState('');
useEffect(() => {
  if (currentStep === 4 && selectedSymptoms.length > 0) {
    fetchAnalysisResults();
  }
}, [currentStep, selectedSymptoms, selectedConditions]);

// Modify analyzeSymptoms function to update analysisResult
const fetchAnalysisResults = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    const symptoms = selectedSymptoms.map(s => s.name);
    const result = await analyzeSymptoms(symptoms, selectedConditions,age,gender);
    setAnalysisResult(result.diagnoses);
  } catch (err) {
    setError(err.message);
    console.error('Analysis failed:', err);
  } finally {
    setIsLoading(false);
  }
};

  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  useEffect(() => {
    const fetchDiseaseInfo = async () => {
      if (selectedDisease) {
        setLoadingInfo(true);
        setErrorInfo(null);
        try {
          const info = await getDiseaseInfo(selectedDisease);
          setDiseaseInfo(info.infos);
          setTimeout(() => setIsLoaded(true), 100);
        } catch (err) {
          setErrorInfo(err.message || 'Failed to fetch disease information');
          console.error('Error fetching disease info:', err);
        } finally {
          setLoadingInfo(false);
        }
      }
    };

    fetchDiseaseInfo();
    return () => setIsLoaded(false);
  }, [selectedDisease]);

  // Removed unused handleDownloadReport function to fix the compile error and avoid duplicate logic.
  
    // Steps configuration
    const steps = [
      { id: 1, name: 'Info', completed: currentStep > 1, canNavigate: true },
      { id: 2, name: 'Symptoms', completed: currentStep > 2, canNavigate: currentStep > 2 },
      { id: 3, name: 'Conditions', completed: currentStep > 3, canNavigate: currentStep > 3 },
      { id: 4, name: 'Result', completed: currentStep > 4, canNavigate: currentStep > 4 },
      { id: 5, name: 'Report', completed: currentStep > 5, canNavigate: currentStep > 5 }
    ];

    const handleStepClick = (stepId) => {
      const targetStep = steps.find(step => step.id === stepId);
      if (targetStep && (targetStep.canNavigate || stepId === 1)) {
        setCurrentStep(stepId);
      }
    };

    // Transform JSON data only once
    const symptoms = useMemo(() => transformSymptoms(bodySymptoms), []);

    // Get unique categories and subcategories for filtering
    const categories = useMemo(() => {
      const uniqueCategories = new Set();
      symptoms.forEach(symptom => uniqueCategories.add(symptom.category));
      return Array.from(uniqueCategories);
    }, [symptoms]);

    const subcategories = useMemo(() => {
      if (!selectedCategory) return [];
      const uniqueSubCategories = new Set();
      symptoms.forEach(symptom => {
        if (symptom.category === selectedCategory && symptom.subCategory) {
          uniqueSubCategories.add(symptom.subCategory);
        }
      });
      return Array.from(uniqueSubCategories);
    }, [symptoms, selectedCategory]);

    // Filter symptoms based on selected category, subcategory and search term
    const filteredSymptoms = useMemo(() => {
      return symptoms.filter(symptom => {
        const matchesCategory = !selectedCategory || symptom.category === selectedCategory;
        const matchesSubCategory = !selectedSubCategory || symptom.subCategory === selectedSubCategory;
        const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSubCategory && matchesSearch;
      });
    }, [symptoms, selectedCategory, selectedSubCategory, searchTerm]);

    const toggleSymptom = (symptom) => {
      setSelectedSymptoms(prev => prev.some(s => s.id === symptom.id)
        ? prev.filter(s => s.id !== symptom.id)
        : [...prev, symptom]
      );
    };

    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
    };

    const handleSubCategorySelect = (subCategory) => {
      setSelectedSubCategory(subCategory);
    };

    const navigateBack = () => {
      if (selectedSubCategory) {
        setSelectedSubCategory(null);
      } else if (selectedCategory) {
        setSelectedCategory(null);
      }
    };

    const handleDemographicsSubmit = (e) => {
      e.preventDefault();
      if (gender && age) {
        setCurrentStep(2);
      }
    };

    const handleSymptomsSubmit = () => {
      if (selectedSymptoms.length > 0) {
        setCurrentStep(3);
      }
    };

    const filteredConditions = useMemo(() => {
      return conditionsList.filter(condition => condition.toLowerCase().includes(conditionsSearchTerm.toLowerCase())
      );
    }, [conditionsSearchTerm]);

    const toggleCondition = (condition) => {
      setSelectedConditions(prev => prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
      );
    };

    const renderStepProgress = () => (
      <div className="step-progress">
        <div className="step-progress-bar">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step-item ${currentStep === step.id ? 'active' : ''} ${step.completed ? 'completed' : ''} ${step.canNavigate ? 'clickable' : ''}`}
              onClick={() => handleStepClick(step.id)}
            >
              <div className="step-icon">
                {step.completed ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <div className="step-name">{step.name}</div>
              {index < steps.length - 1 && (
                <div className={`step-connector ${currentStep > step.id ? 'completed' : ''}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );

    const renderInfoStep = () => (
      <div className="wizard-step demographics-step">
        {renderStepProgress()}
        <div className="banner">
          <FontAwesomeIcon icon={faHeartbeat} className="banner-icon" />
          <span className="banner-text">AIHealthCheck</span>
        </div>
        <h2 className="hero-subtitle">
          Find out what conditions your symptoms might indicate and explore treatment options.
        </h2>
        <p className="disclaimer-text">
          This tool is not a substitute for professional medical advice, diagnosis, or treatment.
          Always consult a healthcare provider for medical concerns, read medication labels carefully,
          and seek emergency help when needed. Use of this tool and its information is at your own risk.
        </p>
        <form onSubmit={handleDemographicsSubmit} className="demographics-form">
          <div className="form-row">
            <div className="form-group gender-group">
              <label className='gender_text'>Gender</label>
              <div className="gender-options">
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    required />
                  <FontAwesomeIcon icon={faMars} className="gender-icon" />
                  <span>Male</span>
                </label>
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    required />
                  <FontAwesomeIcon icon={faVenus} className="gender-icon" />
                  <span>Female</span>
                </label>
              </div>
            </div>

            <div className="form-group age-group">
              <label className="age">Age</label><br></br>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="0"
                max="120"
                required
                className="age-input" />
            </div>
          </div>

          <div className="form-submit">
            <button type="submit" className="next-button">
              Continue to Symptoms
            </button>
          </div>
        </form>
      </div>
    );

    const renderSymptomsStep = () => (
      <div className="wizard-step">
        {renderStepProgress()}
        <div className="wizard-header">
          <h2>What symptoms are you experiencing?</h2>
        </div>

        <div className="navigation-header">
          {(selectedCategory || selectedSubCategory) && (
            <button className="back-button" onClick={navigateBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
              Back
            </button>
          )}
          <h3>
            {selectedSubCategory
              ? `${selectedCategory} > ${selectedSubCategory}`
              : selectedCategory || 'All Body Parts'}
          </h3>
        </div>

        {!selectedCategory ? (
          <div className="category-filter">

            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={selectedCategory === category ? 'active' : ''}
              >
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </div>
        ) : subcategories.length > 0 && !selectedSubCategory ? (
          <div className="subcategory-filter">
            <button
              onClick={() => handleSubCategorySelect(null)}
              className={!selectedSubCategory ? 'active' : ''}
            >
              All
            </button>
            {subcategories.map(subCategory => (
              <button
                key={subCategory}
                onClick={() => handleSubCategorySelect(subCategory)}
                className={selectedSubCategory === subCategory ? 'active' : ''}
              >
                {subCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </div>
        ) : null}

        <div className="search-symptoms">
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <ul className="symptom-list">
          {filteredSymptoms.length > 0 ? (
            filteredSymptoms.map(symptom => (
              <li
                key={symptom.id}
                className={`symptom-item ${selectedSymptoms.some(s => s.id === symptom.id) ? 'selected' : ''}`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom.name}
              </li>
            ))
          ) : (
            <li className="no-symptoms">No symptoms found matching your criteria.</li>
          )}
        </ul>


        {selectedSymptoms.length > 0 && (
          <div className="selected-symptoms">
            <h3>Selected Symptoms:</h3>
            <div className="selected-list">
              {selectedSymptoms.map(symptom => (
                <span key={symptom.id} className="selected-tag">
                  {symptom.name}
                  <button onClick={() => toggleSymptom(symptom)}>×</button>
                </span>
              ))}
            </div>
            <button className="submit-symptoms" onClick={handleSymptomsSubmit}>
              Analyze Symptoms
            </button>
          </div>
        )}
      </div>
    );
    const renderConditionsStep = () => (
      <div className="wizard-step">
        {renderStepProgress()}
        <h2>Do you have any of these existing health conditions?</h2>

        <div className="search-dropdown">
          <input
            type="text"
            placeholder="Search conditions..."
            value={conditionsSearchTerm}
            onChange={(e) => setConditionsSearchTerm(e.target.value)}
            className="search-input" />

          {conditionsSearchTerm.trim() && (
            <div className="dropdown-panel">
              {filteredConditions.length > 0 ? (
                <ul className="conditions-list">
                  {filteredConditions.map(condition => (
                    <li
                      key={condition}
                      className={`condition-item ${selectedConditions.includes(condition) ? 'selected' : ''}`}
                      onClick={() => toggleCondition(condition)}
                      tabIndex={0}
                      role="checkbox"
                      aria-checked={selectedConditions.includes(condition)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleCondition(condition);
                        }
                      } }
                    >
                      {condition}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-results">No conditions found.</p>
              )}
            </div>
          )}
        </div>

        {selectedConditions.length > 0 && (
          <div className="selected-conditions">
            <h3>Selected Conditions:</h3>
            <div className="selected-list">
              {selectedConditions.map(condition => (
                <span key={condition} className="selected-tag">
                  {condition}
                  <button onClick={() => toggleCondition(condition)}>×</button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="form-submit">
          <button
            className="next-button"
            onClick={() => setCurrentStep(4)}
          >
            View Detailed Results
          </button>
        </div>
      </div>
    );


const renderResultStep = () => {
  const res = selectedSymptoms.map(symptom => symptom.name).join(', ');
  const conditions = selectedConditions.map(condition => condition).join(',');

  const handleDiagnosisClick = (disease) => {
    setSelectedDisease(disease);
    setCurrentStep(5);
  };

  return (
    <div className="wizard-step">
      {renderStepProgress()}
      <h2>Your Health Assessment</h2>
      <div className="results-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="input-summary">
          <h3>Your General Infos:</h3>
          <p><strong>Symptoms:</strong> {res}</p>
          {conditions && <p><strong>Conditions:</strong> {conditions}</p>}
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Gender:</strong> {gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
        </div>

        <div className="diagnosis-results" style={{ flex: 2, minWidth: 0 }}>
          {isLoading ? (
            <div className="loading-indicator">
              <p>Analyzing your symptoms...</p>
              {/* Add a spinner or loading animation here */}
            </div>
          ) : error ? (
            <div className="error-message">
              <p>Error: {error}</p>
              <button className="retry" onClick={fetchAnalysisResults}>Retry</button>
            </div>
          ) : analysisResult ? (
            <>
              <h3>Possible Conditions:</h3>
              <ul className="diagnosis-list">
                {Object.entries(analysisResult)
                  .sort(([, a], [, b]) => b - a)
                  .map(([disease, probability]) => (
                    <li
                      key={disease}
                      className="diagnosis-item clickables"
                      onClick={() => handleDiagnosisClick(disease)}
                    >
                      <span className="disease-name">{disease}</span>
                      <span className="probability">
                        {Math.round(probability * 100)}% 
                      </span>
                    </li>
                  ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
const infoSectionsOrder = [
  { key: 'Overview', label: 'Overview' },
  { key: 'Symptoms', label: 'Symptoms' },
  { key: 'Causes', label: 'Causes' },
  { key: 'Risk factors', label: 'Risk Factors' },
  { key: 'Complications', label: 'Complications' },
  { key: 'Prevention', label: 'Prevention' },
  { key: 'When to see a doctor', label: 'When to See a Doctor' },
  { key: 'Diagnosis', label: 'Diagnosis' },
  { key: 'Treatment', label: 'Treatment' },
  { key: 'Lifestyle and home remedies', label: 'Lifestyle and Home Remedies' }
];

const loadingVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear"
    }
  }
};
const [activeSection, setActiveSection] = useState('Overview');
const renderReportStep = () => (
  <div className="wizard-step">
    {renderStepProgress()}
    <h2>Health Report for {selectedDisease}</h2>
    <div
      className="report-container super-powered"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "2rem",
        minHeight: 400,
      }}
    >
      {loadingInfo ? (
        <div className="loading-indicator dynamic-motion" style={{ width: "100%" }}>
          <motion.div
            className="spinner"
            style={{
              width: 60,
              height: 60,
              border: "6px solid #eee",
              borderTop: "6px solid #0078d4",
              borderRadius: "50%",
              margin: "2rem auto",
            }}
            variants={loadingVariants}
            animate="animate"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Loading disease information...
          </motion.p>
        </div>
      ) : errorInfo ? (
        <div className="error-message" style={{ width: "100%" }}>
          <p>Error: {errorInfo}</p>
          <button className="retry" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : diseaseInfo ? (
        <>
          <div
            className="info-sections-list"
            style={{
              minWidth: 220,
              maxWidth: 260,
              flexShrink: 0,
              background: "#f7fafd",
              borderRadius: 10,
              boxShadow: "0 2px 8px #0078d410",
              padding: "1.5rem 1rem",
              marginRight: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              height: "100%",
              position: "sticky",
              top: 0,
            }}
          >
            {infoSectionsOrder
              .filter((sec) => diseaseInfo[sec.key])
              .map((sec) => (
                <motion.h4
                  key={sec.key}
                  className={`info-section-title${activeSection === sec.key ? " active" : ""}`}
                  onClick={() => setActiveSection(sec.key)}
                  whileHover={{ scale: 1.05, color: "#0078d4" }}
                  whileTap={{ scale: 0.98 }}
                  initial={false}
                  animate={activeSection === sec.key ? { color: "#0078d4" } : { color: "#222" }}
                  style={{
                    cursor: "pointer",
                    margin: 0,
                    padding: "0.6rem 1rem",
                    borderRadius: 6,
                    background: activeSection === sec.key ? "#eaf3ff" : "transparent",
                    fontWeight: activeSection === sec.key ? 700 : 400,
                    boxShadow: activeSection === sec.key ? "0 2px 8px #0078d420" : "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {sec.label}
                </motion.h4>
              ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <motion.div
              className="info-section-content"
              key={activeSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                minHeight: 200,
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 2px 16px #0078d410",
                padding: "2rem",
                marginLeft: 0,
                overflow: "auto",
              }}
            >
              <h3 style={{ marginTop: 0 }}>
                {infoSectionsOrder.find((sec) => sec.key === activeSection)?.label}
              </h3>
              <div style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                {Array.isArray(diseaseInfo[activeSection]) ? (
                  <ul style={{ paddingLeft: 24, textAlign: "left", listStyleType: "disc" }}>
                    {diseaseInfo[activeSection].map((item, idx) => (
                      <li key={idx} style={{ textAlign: "left" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  diseaseInfo[activeSection] || (
                    <span>No information available for this section.</span>
                  )
                )}
              </div>
            </motion.div>
            <div
              className='recommend'
              style={{
                marginTop: "2rem",
                minWidth: 0,
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 2px 16px #0078d410",
                padding: "2rem",
                overflow: "auto"
              }}
            >
              <h3 style={{ marginTop: 0 }}>Medical Recommendation</h3>
              <div style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                {diseaseInfo['Medical Recommendation']
                  ? (Array.isArray(diseaseInfo['Medical Recommendation'])
                      ? (
                          <ul style={{ paddingLeft: 24, textAlign: "left", listStyleType: "disc" }}>
                            {diseaseInfo['Medical Recommendation'].map((item, idx) => (
                              <li key={idx} style={{ textAlign: "left" }}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )
                      : diseaseInfo['Medical Recommendation']
                    )
                  : <span>No medical recommendation available.</span>
                }
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No information available for this disease.</p>
      )}
    </div>
    <div className="report-actions" style={{ /* your existing styles */ }}>
      <button className="back-button" onClick={() => setCurrentStep(4)}>
        Back to Results
      </button>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%',
        marginTop: '32px'
      }}>
        <button
          className="next-button"
          onClick={async () => {
            if (!selectedDisease) return;
            setDownloading(true);
            try {
              const fetchPromise = fetch(`http://localhost:8000/api/reports/report`);
              const response = await fetchPromise;
              if (!response.ok) throw new Error('Failed to download report');
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);

              const newTab = window.open('about:blank');
              if (newTab) {
                newTab.document.write(
                  `<html><head><title>Health Report</title></head><body style="margin:0"><iframe src="${url}" style="width:100vw;height:100vh;border:none"></iframe></body></html>`
                );
                newTab.document.close();
              } else {
                const link = document.createElement('a');
                link.href = url;
                link.download = `Report.pdf`;
                document.body.appendChild(link);
                link.click();
                link.remove();
              }
              setTimeout(() => window.URL.revokeObjectURL(url), 10000);
            } catch (error) {
              console.error('Download error:', error);
              alert('Failed to open report. Please try again.');
            } finally {
              setDownloading(false);
            }
          }}
          disabled={loadingInfo || !diseaseInfo || downloading}
        >
          {downloading ? 'Opening...' : 'Open Report'}
        </button>
      </div>
    </div>
  </div>
);

    const renderCurrentStep = () => {
      switch (currentStep) {
        case 1:
          return renderInfoStep();
        case 2:
          return renderSymptomsStep();
        case 3:
          return renderConditionsStep();
        case 4:
          return renderResultStep();
        case 5:
          return renderReportStep();
        default:
          return renderInfoStep();
      }
    };

    return (
      <div className="symptom-checker">
        <div className="wizard-container">
          {renderCurrentStep()}
        </div>
      </div>
    );
  }