import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
    const email = sessionStorage.getItem('email') || '';
    const name = sessionStorage.getItem('name') || email.split('@')[0];

    // Sample report data for display
    const reports = [
        { id: 1, doctor: 'Dr. John Smith', speciality: 'General Physician', date: '2024-01-15', status: 'Completed' },
        { id: 2, doctor: 'Dr. Sarah Lee', speciality: 'Dermatologist', date: '2024-02-20', status: 'Completed' },
        { id: 3, doctor: 'Dr. Mark Davis', speciality: 'Dentist', date: '2024-03-10', status: 'Pending' },
    ];

    return (
        <div className="reports-container">
            <h1>Your Reports</h1>
            <p className="reports-subtitle">Consultation history for <strong>{name}</strong></p>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Doctor</th>
                        <th>Speciality</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.doctor}</td>
                            <td>{report.speciality}</td>
                            <td>{report.date}</td>
                            <td>
                                <span className={`status-badge status-badge--${report.status.toLowerCase()}`}>
                                    {report.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsLayout;
