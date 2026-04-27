// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './ReviewForm.css';

// Function component for giving reviews
const ReviewForm = ({ doctorName, speciality }) => {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  // Function to handle button click event
  const handleButtonClick = () => {
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all required fields are filled before submission
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedMessage(formData);
      setShowWarning(false);
      setShowForm(false);
      setFormData({ name: '', review: '', rating: 0 });
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-form-container">
      <div className="review-info">
        <h3>Consultation with {doctorName}</h3>
        <p>Speciality: {speciality}</p>
      </div>

      {/* Display button to open the form, disabled after submission */}
      {!showForm && (
        <button
          className="review-btn"
          onClick={handleButtonClick}
          disabled={!!submittedMessage}
        >
          Give Feedback
        </button>
      )}

      {/* Display form for giving feedback */}
      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h4>Give Your Feedback</h4>
          {/* Display warning message if not all fields are filled */}
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${parseInt(formData.rating) >= star ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, rating: star })}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          {/* Submit button for form submission */}
          <button type="submit" className="review-submit-btn">Submit</button>
        </form>
      )}

      {/* Display the submitted message if available */}
      {submittedMessage && (
        <div className="submitted-review">
          <h3>Submitted Message:</h3>
          <p><strong>Name:</strong> {submittedMessage.name}</p>
          <p><strong>Rating:</strong> {'★'.repeat(submittedMessage.rating)}{'☆'.repeat(5 - submittedMessage.rating)}</p>
          <p><strong>Review:</strong> {submittedMessage.review}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
