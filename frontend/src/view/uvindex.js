import React, { useState, useEffect } from 'react';
import styles from './uvindex.module.css'

const Uvindex = () => {
    const [location, setLocation] = useState('');
    const [uvData, setUvData] = useState(null);
    const [skinType, setSkinType] = useState(null);
    const [showAdvice, setShowAdvice] = useState(false);
    const [reminder, setReminder] = useState(localStorage.getItem("reminder") === "true");
    const [reminderTimer, setReminderTimer] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const [reminderInterval, setReminderInterval] = useState(localStorage.getItem("reminderInterval") || "2");

    //Get uv index
    const fetchUVIndex = async () => {
        if (!location) {
            alert("Please enter a city name");
            return;
        }
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/api/uv?location=${location}`);
            const data = await response.json();
            if (data.error) {
                alert(`Error: ${data.error}`);
                return;
            }
            setUvData(data);
        } catch (error) {
            console.error("Error fetching UV index:", error);
        }
    };

    //Set different color of different uv levels
    const getUVColor = (index) => {
        if (index <= 2) return '#4CAF50';
        if (index <= 5) return '#FFD700';
        if (index <= 7) return '#FF8C00';
        if (index <= 10) return '#FF8C00';
        return '#800080';
    };

    //Get skin color
    const getSkinColor = (type) => {
        const skinColors = {
            fair: "#FCE5CD",
            yellow: "#EED484",
            brown: "#B07B5C",
            black: "#4A3629"
        };
        return skinColors[type];
    };

    // Compute sun exposure time & sunscreen recommendation
    const getSunProtectionAdvice = (uvIndex, skinType) => {
        let advice = {};
        
        const exposureTime = {
            fair: 10,
            yellow: 15,
            brown: 25,
            black: 35
        };
        
        let safeTime = exposureTime[skinType];
        if (uvIndex > 6) safeTime /= 2;
        let sunscreenSPF = skinType === 'fair' ? 50 : skinType === 'yellow' ? 30 : 15;
        let sunscreenType = skinType === 'fair' ? 'Physical sunscreen' : 'Chemical sunscreen';
        let reapplyTime = uvIndex > 7 ? 'every 1 hour' : 'every 2 hours';
        let clothing = uvIndex > 7 ? 'Wear UPF 50+ long sleeves, hat, and sunglasses' : 'Light breathable clothing is fine';

        advice.exposureTime = `Safe sun exposure time: ~${safeTime} minutes`;
        advice.sunscreen = `Use SPF ${sunscreenSPF} sunscreen (${sunscreenType}), reapply ${reapplyTime}`;
        advice.clothing = clothing;
        return advice;
    };

    //Request browser notification permission
    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            alert("Your browser does not support notifications.");
            return false;
        }
        
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            alert("You need to allow notifications for reminders.");
            return false;
        }
        return true;
    };

    //Send notification
    const sendNotification = (message) => {
        if (Notification.permission === "granted") {
            new Notification("Sunscreen Reminder", { body: message });
            console.log("Notification sent:", message);
        } else {
            console.log("Notification permission not granted");
            requestNotificationPermission().then(granted => {
                if (granted) {
                    sendNotification(message);
                }
            });
        }
    };
    
    // Set timer start
    const handleStartReminder = async () => {
        const permissionGranted = await requestNotificationPermission();
        if (!permissionGranted) return;
        if (reminderTimer) {
            clearInterval(reminderTimer);
            setReminderTimer(null);
        }
    
        const isTestMode = Number(reminderInterval) === 1;
        const intervalInSeconds = isTestMode ? 60 : Number(reminderInterval) * 60;
        console.log(`Starting reminder with ${intervalInSeconds} seconds`);
        
        setRemainingTime(intervalInSeconds);
        let notificationSent = false;
        const newTimer = setInterval(() => {
            setRemainingTime(prev => {
                if (prev <= 1) {
                    if (!notificationSent) { 
                        sendNotification("Time to reapply sunscreen!");
                        notificationSent = true;
                    }
                    clearInterval(newTimer);
                    setReminderTimer(null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        setReminderTimer(newTimer);
    };

    const formatRemainingTime = (seconds) => {
        if (seconds === null) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Set timer reset
    const handleResetReminder = () => {
        if (reminderTimer) {
            clearInterval(reminderTimer);
            setReminderTimer(null);
        }
        setReminder(false); 
        setReminderInterval("2"); 
        setRemainingTime(null);
    };

    //Set local storage reminder
    useEffect(() => {
        localStorage.setItem("reminder", reminder);
        localStorage.setItem("reminderInterval", reminderInterval);
    }, [reminder, reminderInterval]);

    return (
        <main className={styles.container}>
            <section className={styles.uvSection}>
                <h2>Get sun protection advice </h2>
                <label>Select your city: </label>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Please input your location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button onClick={fetchUVIndex}>Check UV Index</button>
                </div>

                {uvData && (
                    <div className={styles.uvResult} style={{ borderColor: getUVColor(uvData.uv_index) }}>
                        <p><strong>{uvData.location}</strong></p>
                        <p style={{ color: getUVColor(uvData.uv_index), fontWeight: 'bold'  }}>UV Index: {uvData.uv_index.toFixed(1)}</p>
                        <p>{uvData.advice}</p>
                    </div>
                )}

                <div className={styles.skinTypeSelection}>
                    <label>Select your skin type: </label>
                    <div className={styles.inputContainer}>
                        <div className={styles.skinTypeOptions}>
                            {['fair', 'yellow', 'brown', 'black'].map((type) => (
                                <div 
                                key={type} 
                                className={`${styles.skinTypeBox} ${skinType === type ? styles.selected : ''}`}
                                onClick={() => setSkinType(type)}
                                style={{ backgroundColor: getSkinColor(type), border: skinType === type ? "2px solid black" : "2px solid transparent" }}
                                >
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowAdvice(true)}>Get More Advice</button>
                    </div>
                </div>

                {uvData && showAdvice && (
                    <div className={styles.uvResult} style={{ borderColor: getUVColor(uvData.uv_index) }}>
                        <h3>Sun Protection Advice</h3>
                        <p><strong>{getSunProtectionAdvice(uvData.uv_index, skinType).exposureTime}</strong></p>
                        <p>{getSunProtectionAdvice(uvData.uv_index, skinType).sunscreen}</p>
                        <p>{getSunProtectionAdvice(uvData.uv_index, skinType).clothing}</p>
                    </div>
                )}

                <div className={styles.reminderBox}>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={reminder}
                            onChange={() => setReminder(!reminder)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                    <span>Enable Sunscreen Reminders</span>
                </div>

                {reminder && (
                    <div className={styles.intervalSelect}>
                        <label>Reminder Interval: </label>
                        <div className={styles.intervalWrapper}>
                            <div className={styles.selectContainer}>
                            <select value={reminderInterval} onChange={(e) => setReminderInterval(e.target.value)}>
                                <option value="1">Every 1 minutes (test)</option>
                                <option value="60">Every 1 hour</option>
                                <option value="90">Every 1.5 hours</option>
                                <option value="120">Every 2 hours</option>
                                <option value="180">Every 3 hours</option>
                            </select>
                            </div>

                            <div className={styles.intervalActions}>
                                <button className={styles.startBtn} onClick={handleStartReminder}>Start</button>
                                <button className={styles.resetBtn} onClick={handleResetReminder}>Reset</button>
                            </div>
                        </div>
                        {remainingTime !== null && (
                                <div className={styles.timerDisplay}>
                                    <p>Time remaining: {formatRemainingTime(remainingTime)}</p>
                                </div>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Uvindex;