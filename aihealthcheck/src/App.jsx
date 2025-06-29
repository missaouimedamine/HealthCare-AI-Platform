import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import HealthAssistant from './pages/HealthAssistant';
import FindDoctor from './pages/FindDoctor';
import HowItWorks from './components/HowItWorks';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/more" element={<HowItWorks />} />
            
            {/* Protected Routes */}
            <Route
              path="/symptom-checker"
              element={
                <ProtectedRoute>
                  <SymptomChecker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/health-assistant"
              element={
                <ProtectedRoute>
                  <HealthAssistant />
                </ProtectedRoute>
              }
            />
            <Route
              path="/find-doctor"
              element={
                <ProtectedRoute>
                  <FindDoctor />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
