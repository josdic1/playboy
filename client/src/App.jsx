import { useContext, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthContext } from './contexts/AuthContext';

function AppContent() {
  const { 
    userLanguages, 
    userCommands, 
    userExamples, 
    fetchLanguagesManual, 
    fetchCommandsManual, 
    fetchExamplesManual,
    throttleDelay,
    setThrottleDelay,
    loadingStage
  } = useContext(AuthContext);

  const [currentTheme, setCurrentTheme] = useState('wargames');

useEffect(() => {
  document.documentElement.setAttribute('data-theme', currentTheme);
}, [currentTheme]);

  // Expose to window for debugging
  useEffect(() => {
    window.playboy = {
      languages: userLanguages,
      commands: userCommands,
      examples: userExamples,
      switchTheme: (theme) => setCurrentTheme(theme)
    };
  }, [userLanguages, userCommands, userExamples]);

  // Load the appropriate stylesheet
  useEffect(() => {
    const link = document.getElementById('theme-stylesheet');
    if (link) {
      link.href = `/styles/${currentTheme}.css`;
    }
  }, [currentTheme]);

  return (
    <div className="app-container">
      <div className="scanline"></div>

      {/* Header - Control Panel */}
      <div className="control-panel">
        <pre className="ascii-header">
{`╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ PLAYBOY v1.0 - CODE REFERENCE SYSTEM                                                      [SYS/86]    ${new Date().toLocaleTimeString('en-US', { hour12: false })}  EST                              ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣`}
        </pre>

        {/* Theme Switcher */}
        <div className="theme-switcher">
          <button 
            onClick={() => setCurrentTheme('wargames')}
            className={`theme-button ${currentTheme === 'wargames' ? 'active' : ''}`}
          >
            WARGAMES
          </button>
          <button 
            onClick={() => setCurrentTheme('boutique')}
            className={`theme-button ${currentTheme === 'boutique' ? 'active' : ''}`}
          >
            BOUTIQUE
          </button>
        </div>

        {/* Throttle Control */}
        <div className="throttle-control">
          <div className="throttle-label">NETWORK THROTTLE</div>
          <div className="throttle-inputs">
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="100"
              value={throttleDelay}
              onChange={(e) => setThrottleDelay(Number(e.target.value))}
              className="throttle-slider"
            />
            <div className="throttle-value">{throttleDelay}ms</div>
            <div className="throttle-status">
              {throttleDelay === 0 && '[INSTANT]'}
              {throttleDelay > 0 && throttleDelay <= 1000 && '[FAST]'}
              {throttleDelay > 1000 && throttleDelay <= 3000 && '[SLOW]'}
              {throttleDelay > 3000 && '[CRAWL]'}
            </div>
          </div>
        </div>

        {/* Data Control Panel */}
        <div className="data-controls">
          {/* Languages */}
          <div className="data-control-item">
            <div className="control-label">LANGUAGES</div>
            <div className="control-count">
              {userLanguages.length.toString().padStart(2, '0')}
            </div>
            <button
              onClick={fetchLanguagesManual}
              disabled={loadingStage === 'FETCHING_LANGUAGES'}
              className={`fetch-button ${userLanguages.length > 0 ? 'loaded' : 'empty'} ${loadingStage === 'FETCHING_LANGUAGES' ? 'loading' : ''}`}
            >
              {loadingStage === 'FETCHING_LANGUAGES' ? '[LOADING...]' : '[FETCH]'}
            </button>
            <div className="control-status">
              {loadingStage === 'FETCHING_LANGUAGES' && 'FETCHING...'}
              {loadingStage !== 'FETCHING_LANGUAGES' && userLanguages.length > 0 && 'LOADED'}
              {loadingStage !== 'FETCHING_LANGUAGES' && userLanguages.length === 0 && 'EMPTY'}
            </div>
          </div>

          {/* Commands */}
          <div className="data-control-item">
            <div className="control-label">COMMANDS</div>
            <div className="control-count">
              {userCommands.length.toString().padStart(2, '0')}
            </div>
            <button
              onClick={fetchCommandsManual}
              disabled={loadingStage === 'FETCHING_COMMANDS'}
              className={`fetch-button ${userCommands.length > 0 ? 'loaded' : 'empty'} ${loadingStage === 'FETCHING_COMMANDS' ? 'loading' : ''}`}
            >
              {loadingStage === 'FETCHING_COMMANDS' ? '[LOADING...]' : '[FETCH]'}
            </button>
            <div className="control-status">
              {loadingStage === 'FETCHING_COMMANDS' && 'FETCHING...'}
              {loadingStage !== 'FETCHING_COMMANDS' && userCommands.length > 0 && 'LOADED'}
              {loadingStage !== 'FETCHING_COMMANDS' && userCommands.length === 0 && 'EMPTY'}
            </div>
          </div>

          {/* Examples */}
          <div className="data-control-item">
            <div className="control-label">EXAMPLES</div>
            <div className="control-count">
              {userExamples.length.toString().padStart(2, '0')}
            </div>
            <button
              onClick={fetchExamplesManual}
              disabled={loadingStage === 'FETCHING_EXAMPLES'}
              className={`fetch-button ${userExamples.length > 0 ? 'loaded' : 'empty'} ${loadingStage === 'FETCHING_EXAMPLES' ? 'loading' : ''}`}
            >
              {loadingStage === 'FETCHING_EXAMPLES' ? '[LOADING...]' : '[FETCH]'}
            </button>
            <div className="control-status">
              {loadingStage === 'FETCHING_EXAMPLES' && 'FETCHING...'}
              {loadingStage !== 'FETCHING_EXAMPLES' && userExamples.length > 0 && 'LOADED'}
              {loadingStage !== 'FETCHING_EXAMPLES' && userExamples.length === 0 && 'EMPTY'}
            </div>
          </div>
        </div>

        <pre className="ascii-footer">
{`╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`}
        </pre>
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <pre className="app-footer">
{`[F1]HELP [F2]SETUP [F3]EXIT                               SYS:READY [${new Date().toISOString().split('T')[0]}]`}
      </pre>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;