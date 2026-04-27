import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
    const email = sessionStorage.getItem('email') || '';
    const name = sessionStorage.getItem('name') || email.split('@')[0];

    // Sample report data for display
    const reports = [
        { id: 1, doctor: 'Dr. John Smith', speciality: 'General Physician' },
        { id: 2, doctor: 'Dr. Sarah Lee', speciality: 'Dermatologist' },
        { id: 3, doctor: 'Dr. Mark Davis', speciality: 'Dentist' },
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.doctor}</td>
                            <td>{report.speciality}</td>
                            <td>
                                {/* View: opens the PDF in a new tab */}
                                <a
                                    href="/patient_report.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="report-btn report-btn--view"
                                >
                                    View
                                </a>
                                {/* Download: uses download attribute on anchor tag */}
                                <a
                                    href="/patient_report.pdf"
                                    download="patient_report.pdf"
                                    className="report-btn report-btn--download"
                                >
                                    Download
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsLayout;
