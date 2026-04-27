import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ doctorName, speciality }) => {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('5');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setShowForm(false);
        setName('');
        setReview('');
        setRating('5');
    };

    return (
        <div className="review-form-container">
            <div className="review-info">
                <h3>Consultation with {doctorName}</h3>
                <p>Speciality: {speciality}</p>
                {submitted && (
                    <p className="review-success">Thank you for your feedback!</p>
                )}
                <button className="review-btn" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Close' : 'Give Feedback'}
                </button>
            </div>

            {showForm && (
                <form className="review-form" onSubmit={handleSubmit}>
                    <h4>Leave a Review</h4>
                    <div className="form-group">
                        <label htmlFor="reviewName">Your Name</label>
                        <input
                            type="text"
                            id="reviewName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Very Poor</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="review">Your Review</label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Share your experience..."
                            rows="4"
                            required
                        />
                    </div>
                    <button type="submit" className="review-submit-btn">Submit Review</button>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;
