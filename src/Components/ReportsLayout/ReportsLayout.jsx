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

    const handleView = (report) => {
        alert(`Viewing report for consultation with ${report.doctor} (${report.speciality})`);
    };

    const handleDownload = (report) => {
        const content = `Consultation Report\n\nDoctor: ${report.doctor}\nSpeciality: ${report.speciality}\nPatient: ${name}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${report.id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

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
                                <button className="report-btn report-btn--view" onClick={() => handleView(report)}>View</button>
                                <button className="report-btn report-btn--download" onClick={() => handleDownload(report)}>Download</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsLayout;
