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

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

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
      {/* Display appointment notification if user is logged in, appointmentData is available, and showNotification is true */}
      {isLoggedIn && appointmentData && showNotification && (
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
