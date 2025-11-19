import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect, useMemo } from "react";
import { LoadingGate } from "../components/LoadingGate";

export function AuthProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const [userLanguages, setUserLanguages] = useState([]);
    const [userCommands, setUserCommands] = useState([]);
    const [userExamples, setUserExamples] = useState([]);
    
    const [loadingStage, setLoadingStage] = useState('INITIAL'); 
    const [stageData, setStageData] = useState({});
    const [throttleDelay, setThrottleDelay] = useState(0); // Throttle control

    const loggedIn = Boolean(userInfo);
    const API_URL = "http://localhost:5555";

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const response = await fetch(`${API_URL}/check_session`, {
                credentials: 'include'
            });
            
            if (response.ok) {
                const userData = await response.json();
                
                setStageData({
                    sessionCheck: {
                        logged_in: userData.logged_in,
                        rawData: userData
                    }
                });
                setLoadingStage('SESSION_CHECK');
            }
        } catch (error) {
            console.error("Error checking session:", error);
            setLoadingStage('ERROR');
        }
    }
    
    const confirmSessionCheck = () => {
        if (stageData.sessionCheck?.logged_in) {
            setLoadingStage('USER_DATA');
            const user = stageData.sessionCheck.rawData.user;
            setUserInfo({
                id: user.id,
                name: user.name,
                email: user.email
            });
            
            setStageData(prev => ({
                ...prev,
                userData: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }));
        } else {
            setLoadingStage('READY');
            setUserInfo(null);
        }
    };

    const confirmUserData = () => {
        setLoadingStage('READY');
    };

    // Manual fetch with throttle
    const fetchLanguagesManual = async () => {
        try {
            setLoadingStage('FETCHING_LANGUAGES');
            
            // Apply throttle delay
            if (throttleDelay > 0) {
                await new Promise(resolve => setTimeout(resolve, throttleDelay));
            }
            
            const response = await fetch(`${API_URL}/languages`, {
                credentials: 'include'
            });
            const languages = await response.json();
            setUserLanguages(languages);
            setLoadingStage('READY');
        } catch (error) {
            console.error("Error fetching languages:", error);
            setLoadingStage('READY');
        }
    };

    const fetchCommandsManual = async () => {
        try {
            setLoadingStage('FETCHING_COMMANDS');
            
            // Apply throttle delay
            if (throttleDelay > 0) {
                await new Promise(resolve => setTimeout(resolve, throttleDelay));
            }
            
            const response = await fetch(`${API_URL}/commands`, {
                credentials: 'include'
            });
            const commands = await response.json();
            setUserCommands(commands);
            setLoadingStage('READY');
        } catch (error) {
            console.error("Error fetching commands:", error);
            setLoadingStage('READY');
        }
    };

    const fetchExamplesManual = async () => {
        try {
            setLoadingStage('FETCHING_EXAMPLES');
            
            // Apply throttle delay
            if (throttleDelay > 0) {
                await new Promise(resolve => setTimeout(resolve, throttleDelay));
            }
            
            const response = await fetch(`${API_URL}/examples`, {
                credentials: 'include'
            });
            const examples = await response.json();
            setUserExamples(examples);
            setLoadingStage('READY');
        } catch (error) {
            console.error("Error fetching examples:", error);
            setLoadingStage('READY');
        }
    };

    const value = useMemo(() => ({ 
        loggedIn,
        userInfo,
        userLanguages,
        userCommands,
        userExamples,
        loadingStage,
        stageData,
        confirmSessionCheck,
        confirmUserData,
        fetchLanguagesManual,
        fetchCommandsManual,
        fetchExamplesManual,
        throttleDelay,
        setThrottleDelay
    }), 
    [userInfo, userLanguages, userCommands, userExamples, loggedIn, loadingStage, stageData, throttleDelay]);

    // Render loading gates
    if (loadingStage === 'SESSION_CHECK' && stageData.sessionCheck) {
        return (
            <AuthContext.Provider value={value}>
                <LoadingGate stage="SESSION_CHECK" data={stageData.sessionCheck} onConfirm={confirmSessionCheck} />
            </AuthContext.Provider>
        );
    }

    if (loadingStage === 'USER_DATA' && stageData.userData) {
        return (
            <AuthContext.Provider value={value}>
                <LoadingGate stage="USER_DATA" data={stageData.userData} onConfirm={confirmUserData} />
            </AuthContext.Provider>
        );
    }

    // Once READY, render children
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}