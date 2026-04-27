import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { v4 as uuidv4 } from 'uuid';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';

const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const [appointments, setAppointments] = useState([]);

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    // Save to localStorage so Notification component can read it
    localStorage.setItem('doctorData', JSON.stringify({ name, speciality }));
    localStorage.setItem(name, JSON.stringify(newAppointment));
    window.dispatchEvent(new Event('appointmentUpdated'));
  };

  const handleCancel = (appointmentId) => {
    setAppointments(appointments.filter((a) => a.id !== appointmentId));
    // Clear from localStorage
    localStorage.removeItem('doctorData');
    localStorage.removeItem(name);
    window.dispatchEvent(new Event('appointmentUpdated'));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
        <div>
          <Popup
            trigger={
              <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
                <div>{appointments.length > 0 ? 'Cancel Appointment' : 'Book Appointment'}</div>
                <div>No Booking Fee</div>
              </button>
            }
            modal
          >
            {(close) => (
              <div style={{ padding: '20px' }}>
                <div className="doctor-card-profile-image-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
                {appointments.length > 0 ? (
                  <>
                    <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                    {appointments.map((appointment) => (
                      <div className="bookedInfo" key={appointment.id}>
                        <p>Name: {appointment.name}</p>
                        <p>Phone: {appointment.phoneNumber}</p>
                        <p>Date: {appointment.appointmentDate}</p>
                        <p>Time: {appointment.appointmentTime}</p>
                        <button onClick={() => { handleCancel(appointment.id); close(); }}>Cancel Appointment</button>
                      </div>
                    ))}
                  </>
                ) : (
                  <AppointmentForm
                    doctorName={name}
                    doctorSpeciality={speciality}
                    onSubmit={(data) => { handleFormSubmit(data); setTimeout(close, 0); }}
                  />
                )}
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
