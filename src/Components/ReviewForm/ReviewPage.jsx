import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import './ReviewPage.css';

const ReviewPage = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('email');
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="review-page">
            <h2 className="review-page-title">Doctor Reviews</h2>
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

export default ReviewPage;
