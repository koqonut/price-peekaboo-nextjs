// components/ConsoleLogger.tsx
import React, { useEffect, useState } from 'react';

const ConsoleLogger = () => {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const originalConsoleLog = console.log; // Save the original console.log function

        // Create a new function for console.log
        console.log = (...args) => {
            originalConsoleLog(...args); // Call the original console.log function
            // Update state to render the log on the screen
            setLogs(prevLogs => [...prevLogs, ...args.map(arg => JSON.stringify(arg))]);
        };

        return () => {
            console.log = originalConsoleLog; // Restore original console.log on cleanup
        };
    }, []);

    return (
        <div style={{ position: 'fixed', top: '0', left: '150', right: '0', zIndex: 9999, backgroundColor: 'white', color: 'black', maxHeight: '200px', overflowY: 'auto', padding: '10px' }}>
            {logs.map((log, index) => (
                <pre key={index}>{log}</pre>
            ))}
        </div>
    );
};

export default ConsoleLogger;
