// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  const loadFromStorage = () => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    } else {
      setAppointmentData(null);
    }
  };

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    loadFromStorage();
    // Listen for storage changes (cross-tab and same-tab via custom event)
    window.addEventListener('storage', loadFromStorage);
    window.addEventListener('appointmentUpdated', loadFromStorage);
    return () => {
      window.removeEventListener('storage', loadFromStorage);
      window.removeEventListener('appointmentUpdated', loadFromStorage);
    };
  }, []);

  // Handler to dismiss notification when appointment is cancelled
  const handleCancel = () => {
    setShowNotification(false);
    setAppointmentData(null);
    if (doctorData) {
      localStorage.removeItem(doctorData.name);
    }
  };

  // Return JSX elements to display children components and appointment notification if user is logged in
  return (
    <div>
      {/* Render children components */}
      {children}
      {/* Display appointment notification if appointmentData is available and showNotification is true */}
      {appointmentData && showNotification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            {/* Display title for appointment details */}
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              {/* Display username who booked the appointment */}
              <strong>Booked by:</strong> {username}
            </p>
            <p className="appointment-card__message">
              {/* Display doctor's name from doctorData */}
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            <p className="appointment-card__message">
              {/* Display appointment date */}
              <strong>Date:</strong> {appointmentData?.appointmentDate}
            </p>
            <p className="appointment-card__message">
              {/* Display appointment time */}
              <strong>Time:</strong> {appointmentData?.appointmentTime}
            </p>
            <p className="appointment-card__message">
              <strong>Phone:</strong> {appointmentData?.phoneNumber}
            </p>
            {/* Cancel button to dismiss notification */}
            <button className="appointment-card__btn" onClick={handleCancel}>
              Cancel Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;
