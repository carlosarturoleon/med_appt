import React from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
    const name = sessionStorage.getItem('name') || '';
    const email = sessionStorage.getItem('email') || '';
    const phone = sessionStorage.getItem('phone') || '';

    return (
        <div className="profile-card">
            <div className="profile-card__avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#2190ff" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
            </div>
            <div className="profile-card__info">
                <h3 className="profile-card__name">{name || email.split('@')[0]}</h3>
                {email && <p className="profile-card__detail"><span>Email:</span> {email}</p>}
                {phone && <p className="profile-card__detail"><span>Phone:</span> {phone}</p>}
            </div>
        </div>
    );
};

export default ProfileCard;
