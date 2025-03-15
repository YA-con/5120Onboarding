import React, { useState, useEffect } from 'react';
import styles from './about.module.css'

const About = () => {
    const [location, setLocation] = useState('');
    const [uvData, setUvData] = useState(null);
    const [reminder, setReminder] = useState(localStorage.getItem("reminder") === "true");
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

    //Request browser notification permission
    const requestNotificationPermission = () => {
        if (!("Notification" in window)) {
            alert("Your browser does not support notifications.");
            return;
        }
        Notification.requestPermission().then((permission) => {
            if (permission !== "granted") {
                alert("You need to allow notifications for reminders.");
            }
        });
    };

    //Send notification
    const sendNotification = (message) => {
        if (Notification.permission === "granted") {
            new Notification("Sunscreen Reminder", {
                body: message,
                icon: "/sun_notification.png"
            });
        }
    };

    //Set local storage reminder
    useEffect(() => {
        localStorage.setItem("reminder", reminder);
        localStorage.setItem("reminderInterval", reminderInterval);
    }, [reminder, reminderInterval]);

    //Regular reminder
    useEffect(() => {
        if (reminder) {
            requestNotificationPermission(); 
            const interval = setInterval(() => {
                sendNotification("Time to reapply sunscreen!");
            }, reminderInterval * 60 * 60 * 1000); 
            return () => clearInterval(interval);
        }
    }, [reminder, reminderInterval]);

    //Alert high uv index
    useEffect(() => {
        if (uvData && uvData.uv_index >= 8) {
            alert("High UV index detected! Apply sunscreen and seek shade.");
        }
    }, [uvData]);
   
    return (
        <main className={styles.container}>
            <section className={styles.infoSection}>
                <h1 className={styles.title}>What do we do ?</h1>
                <p className={styles.desc}>
                    At Uv Protection, we are a team focused on the collection and analysis of
                    ultraviolet index in Australia, committed to providing users with accurate UV
                    intensity information and scientific outdoor skin protection recommendations.
                    By monitoring UV data across Australia in real time, we help users understand
                    current UV intensity levels and provide personalized sun protection guidelines.
                    We are well aware of the potential damage of UV rays to skin health, so we
                    hope to help every user better protect themselves and enjoy outdoor activities
                    while protecting themselves from UV rays through professional data and
                    practical advice.
                </p>
            </section>

            <section className={styles.uvSection}>
                <h2>Know the UV index in your location</h2>
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
                        <select value={reminderInterval} onChange={(e) => setReminderInterval(e.target.value)}>
                            <option value="1">Every 1 hour</option>
                            <option value="2">Every 2 hours</option>
                            <option value="3">Every 3 hours</option>
                        </select>
                    </div>
                )}
            </section>
        </main>
    );
};

export default About;