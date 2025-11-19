export function LoadingGate({ stage, data, onConfirm }) {
    const dataSize = JSON.stringify(data).length;
    const memoryUsage = Math.min(100, (dataSize / 50));
    const cpuLoad = Math.floor(Math.random() * 40) + 30;
    
    return (
        <div className="loading-gate">
            <div className="scanline"></div>
            
            {/* Header */}
            <pre className="gate-header">
{`╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ PLAYBOY v1.0 - CODE REFERENCE SYSTEM                                                      [SYS/86]    19:45:12  EST                              ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣`}
            </pre>

            {/* Big Stage Name */}
            <div className="stage-display">
                <div className="stage-name">{stage}</div>
                <div className="stage-subtitle">LOADING DATA SEGMENT</div>
            </div>

            {/* Metrics and Grid */}
            <div className="metrics-container">
                {/* System Metrics */}
                <div className="metrics-panel">
                    <pre className="metrics-content">
{`┌─[ SYSTEM METRICS ]──────────────────────────┐
│                                              │
│  MEM [${('█'.repeat(Math.floor(memoryUsage/5)) + '░'.repeat(20 - Math.floor(memoryUsage/5)))}] ${Math.floor(memoryUsage).toString().padStart(3)}%        │
│  CPU [${('█'.repeat(Math.floor(cpuLoad/5)) + '░'.repeat(20 - Math.floor(cpuLoad/5)))}] ${cpuLoad.toString().padStart(3)}%        │
│  NET [${('█'.repeat(15) + '░'.repeat(5))}] STABLE      │
│                                              │
│  STATUS: `}<span className="pulse">OPERATIONAL</span>{`                     │
│                                              │
└──────────────────────────────────────────────┘`}
                    </pre>
                </div>

                {/* Signal Trace */}
                <div className="metrics-panel">
                    <pre className="metrics-content">
{`┌─[ SIGNAL TRACE ]────────────────────────────┐
│                                              │
│ 100 │${'.'.repeat(10)}▄▄▄${'.'.repeat(23)}│
│     │${'.'.repeat(8)}▄▄█${' '.repeat(3)}█▄${'.'.repeat(21)}│
│  75 │${'.'.repeat(6)}▄█${' '.repeat(9)}█▄${'.'.repeat(19)}│
│     │${'.'.repeat(5)}█${' '.repeat(11)}█${'.'.repeat(19)}│
│  50 │${'.'.repeat(4)}█${' '.repeat(13)}█${'.'.repeat(18)}│
│     │${'█'.repeat(4)}${' '.repeat(15)}${'█'.repeat(18)}│
│   0 └────────────────────────────────────────│
│       0      25      50      75     100      │
│                                              │
└──────────────────────────────────────────────┘`}
                    </pre>
                </div>
            </div>

            {/* Data Buffer */}
            <div className="data-buffer">
                <pre className="buffer-header">
{`┌─[ DATA BUFFER ]───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ BYTES: ${dataSize.toString().padStart(4, '0')}  │  CHECKSUM: ${(dataSize * 31 % 65536).toString(16).toUpperCase().padStart(4, '0')}  │  INTEGRITY: OK                                                                                 │`}
                </pre>
                
                <pre className="buffer-content">
{JSON.stringify(data, null, 2)}
                </pre>
                
                <pre className="buffer-footer">
{`└───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘`}
                </pre>
            </div>

            {/* Bottom Bar */}
            <div className="gate-controls">
                <button onClick={onConfirm} className="confirm-button">
                    {'>'} PRESS [ENTER] TO CONTINUE<span className="blink"> █</span>
                </button>

                <pre className="gate-footer">
{`[F1]HELP [F2]SETUP [F3]EXIT          SYS:READY [${new Date().toISOString().split('T')[0]}]`}
                </pre>
            </div>
        </div>
    );
}