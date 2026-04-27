import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import './ReviewPage.css';

// ReviewFormApp integrates the ReviewForm component with doctor data
const ReviewFormApp = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="review-page">
            <h2 className="review-page-title">Doctor Reviews</h2>
            {/* Render a ReviewForm for each doctor with their name and speciality */}
            {doctors.map(doctor => (
                <ReviewForm
                    key={doctor.name}
                    doctorName={doctor.name}
                    speciality={doctor.speciality}
                />
            ))}
        </div>
    );
};

export default ReviewFormApp;
