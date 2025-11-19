import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function DataControlPanel() {
    const { 
        userLanguages, 
        userCommands, 
        userExamples,
        fetchLanguagesManual,
        fetchCommandsManual,
        fetchExamplesManual
    } = useContext(AuthContext);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: '#1a1a1a',
            borderBottom: '2px solid #33aa33',
            padding: '15px 30px',
            zIndex: 1000,
            fontFamily: '"Courier New", monospace',
            color: '#33aa33'
        }}>
            <div style={{
                display: 'flex',
                gap: '30px',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    PLAYBOY DATA CONTROL
                </div>

                {/* Languages */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>LANGUAGES</div>
                    <div style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold',
                        minWidth: '40px',
                        textAlign: 'center'
                    }}>
                        {userLanguages.length}
                    </div>
                    <button
                        onClick={fetchLanguagesManual}
                        style={{
                            background: userLanguages.length > 0 ? '#1a1a1a' : '#33aa33',
                            color: userLanguages.length > 0 ? '#33aa33' : '#000',
                            border: '1px solid #33aa33',
                            padding: '5px 15px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            fontFamily: '"Courier New", monospace',
                            letterSpacing: '1px'
                        }}
                    >
                        FETCH
                    </button>
                </div>

                {/* Commands */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>COMMANDS</div>
                    <div style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold',
                        minWidth: '40px',
                        textAlign: 'center'
                    }}>
                        {userCommands.length}
                    </div>
                    <button
                        onClick={fetchCommandsManual}
                        style={{
                            background: userCommands.length > 0 ? '#1a1a1a' : '#33aa33',
                            color: userCommands.length > 0 ? '#33aa33' : '#000',
                            border: '1px solid #33aa33',
                            padding: '5px 15px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            fontFamily: '"Courier New", monospace',
                            letterSpacing: '1px'
                        }}
                    >
                        FETCH
                    </button>
                </div>

                {/* Examples */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>EXAMPLES</div>
                    <div style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold',
                        minWidth: '40px',
                        textAlign: 'center'
                    }}>
                        {userExamples.length}
                    </div>
                    <button
                        onClick={fetchExamplesManual}
                        style={{
                            background: userExamples.length > 0 ? '#1a1a1a' : '#33aa33',
                            color: userExamples.length > 0 ? '#33aa33' : '#000',
                            border: '1px solid #33aa33',
                            padding: '5px 15px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            fontFamily: '"Courier New", monospace',
                            letterSpacing: '1px'
                        }}
                    >
                        FETCH
                    </button>
                </div>
            </div>
        </div>
    );
}