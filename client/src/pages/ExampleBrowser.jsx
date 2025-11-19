import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function ExampleBrowser() {
  const { userLanguages, userCommands, userExamples } = useContext(AuthContext);
  
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCommand, setSelectedCommand] = useState('all');
  const [selectedPractice, setSelectedPractice] = useState('all');
  
  const filteredExamples = userExamples.filter(ex => {
    if (selectedLanguage !== 'all' && ex.language_id !== Number(selectedLanguage)) return false;
    if (selectedCommand !== 'all' && ex.command_id !== Number(selectedCommand)) return false;
    if (selectedPractice !== 'all' && ex.practice_type !== selectedPractice) return false;
    return true;
  });
  
  const getPracticeIcon = (type) => {
    switch(type) {
      case 'best': return '🏆';
      case 'beginner': return '📚';
      case 'archaic': return '📜';
      case 'worst': return '☠️';
      default: return '•';
    }
  };

  return (
    <div className="example-browser">
      {/* Header */}
      <pre className="page-header">
{`╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║                          EXAMPLE BROWSER v1.0                                 ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`}
      </pre>

      {/* Filter Panel */}
      <div className="filter-panel">
        <div className="filter-title">FILTERS</div>

        <div className="filter-grid">
          {/* Language Filter */}
          <div className="filter-group">
            <label className="filter-label">LANGUAGE</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="filter-select"
            >
              <option value="all">ALL LANGUAGES</option>
              {userLanguages.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>

          {/* Command Filter */}
          <div className="filter-group">
            <label className="filter-label">COMMAND</label>
            <select
              value={selectedCommand}
              onChange={(e) => setSelectedCommand(e.target.value)}
              className="filter-select"
            >
              <option value="all">ALL COMMANDS</option>
              {userCommands.map(cmd => (
                <option key={cmd.id} value={cmd.id}>{cmd.name}</option>
              ))}
            </select>
          </div>

          {/* Practice Type Filter */}
          <div className="filter-group">
            <label className="filter-label">PRACTICE TYPE</label>
            <select
              value={selectedPractice}
              onChange={(e) => setSelectedPractice(e.target.value)}
              className="filter-select"
            >
              <option value="all">ALL TYPES</option>
              <option value="best">🏆 BEST</option>
              <option value="beginner">📚 BEGINNER</option>
              <option value="archaic">📜 ARCHAIC</option>
              <option value="worst">☠️ WORST</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          SHOWING {filteredExamples.length} OF {userExamples.length} EXAMPLES
        </div>
      </div>

      {/* Results Grid */}
      <div className="examples-grid">
        {filteredExamples.map(example => {
          const command = userCommands.find(c => c.id === example.command_id);
          const language = userLanguages.find(l => l.id === example.language_id);
          
          return (
            <div key={example.id} className="example-card">
              {/* Header */}
              <div className="card-header">
                <div>
                  <div className="card-title">
                    {command?.name || 'Unknown Command'}
                  </div>
                  <div className="card-subtitle">
                    {language?.name || 'Unknown Language'}
                  </div>
                </div>
                <div className="practice-icon">
                  {getPracticeIcon(example.practice_type)}
                </div>
              </div>

              {/* Practice Type & Style */}
              <div className="card-badges">
                <div className={`badge badge-${example.practice_type}`}>
                  {example.practice_type}
                </div>
                {example.style_name && (
                  <div className="badge badge-style">
                    {example.style_name}
                  </div>
                )}
              </div>

              {/* Code Block */}
              <pre className="code-block">
                <code>{example.code_block}</code>
              </pre>

              {/* Notes */}
              {example.notes && (
                <div className="card-notes">
                  {example.notes}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results Message */}
      {filteredExamples.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">∅</div>
          <div className="no-results-text">NO EXAMPLES FOUND</div>
          <div className="no-results-hint">
            TRY ADJUSTING YOUR FILTERS OR FETCH MORE DATA
          </div>
        </div>
      )}
    </div>
  );
}