import React, { useState, useEffect } from 'react';
import classService from '../services/classService';
import attendanceService from '../services/attendanceService';
import toast from 'react-hot-toast';
import { 
  FileText, 
  Calendar,
  Download,
  Users,
  TrendingUp,
  Search
} from 'lucide-react';
import './AttendanceReport.css';

const AttendanceReport = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
    
    // Set start date to 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await classService.getAllClasses();
      setClasses(data.data);
    } catch (error) {
      toast.error('Failed to fetch classes');
    }
  };

  const handleGenerateReport = async () => {
    if (!selectedClass || !selectedSection) {
      toast.error('Please select class and section');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select date range');
      return;
    }

    try {
      setLoading(true);

      const classData = classes.find(
        c => c.name === selectedClass && c.section === selectedSection
      );

      if (!classData) {
        toast.error('Class not found');
        return;
      }

      const data = await attendanceService.getAttendanceReport(
        classData._id,
        startDate,
        endDate
      );

      setReport(data.data);
      toast.success('Report generated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate report');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    if (!report) return;

    // Create CSV content
    let csvContent = 'Roll No,Student Name,Student ID,Total Days,Present,Absent,Late,Leave,Attendance %\n';
    
    report.report.forEach(item => {
      csvContent += `${item.student.rollNumber},${item.student.name},${item.student.studentId},${item.statistics.total},${item.statistics.present},${item.statistics.absent},${item.statistics.late},${item.statistics.leave},${item.statistics.percentage}\n`;
    });

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${report.class.name}_${report.class.section}_${startDate}_to_${endDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success('Report downloaded');
  };

  const getOverallStats = () => {
    if (!report || !report.report.length) return null;

    const totalPresent = report.report.reduce((sum, item) => sum + item.statistics.present, 0);
    const totalAbsent = report.report.reduce((sum, item) => sum + item.statistics.absent, 0);
    const totalLate = report.report.reduce((sum, item) => sum + item.statistics.late, 0);
    const totalLeave = report.report.reduce((sum, item) => sum + item.statistics.leave, 0);
    const totalDays = totalPresent + totalAbsent + totalLate + totalLeave;
    
    const avgPercentage = totalDays > 0 
      ? ((totalPresent / totalDays) * 100).toFixed(2) 
      : 0;

    return {
      totalPresent,
      totalAbsent,
      totalLate,
      totalLeave,
      avgPercentage
    };
  };

  const overallStats = getOverallStats();

  return (
    <div className="attendance-report-page">
      <div className="page-header">
        <div className="header-left">
          <FileText size={32} />
          <div>
            <h1>Attendance Report</h1>
            <p>Generate and view attendance reports</p>
          </div>
        </div>
      </div>

      <div className="report-filters">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Class</label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSection('');
              }}
            >
              <option value="">Select Class</option>
              {[...new Set(classes.map(c => c.name))].map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedClass}
            >
              <option value="">Select Section</option>
              {classes
                .filter(c => c.name === selectedClass)
                .map(c => (
                  <option key={c._id} value={c.section}>{c.section}</option>
                ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate}
            />
          </div>

          <div className="filter-group">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="filter-actions">
          <button 
            className="btn-primary" 
            onClick={handleGenerateReport}
            disabled={loading}
          >
            <Search size={20} />
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
          
          {report && (
            <button 
              className="btn-secondary" 
              onClick={handleDownloadCSV}
            >
              <Download size={20} />
              Download CSV
            </button>
          )}
        </div>
      </div>

      {report && overallStats && (
        <>
          <div className="report-info">
            <div className="info-card">
              <Calendar size={24} />
              <div>
                <h3>{report.class.name} - {report.class.section}</h3>
                <p>From {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="info-card">
              <Users size={24} />
              <div>
                <h3>{report.report.length} Students</h3>
                <p>Total students in class</p>
              </div>
            </div>

            <div className="info-card">
              <TrendingUp size={24} />
              <div>
                <h3>{overallStats.avgPercentage}%</h3>
                <p>Average attendance</p>
              </div>
            </div>
          </div>

          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Roll</th>
                  <th>Photo</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Total Days</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Leave</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {report.report.map((item) => (
                  <tr key={item.student._id}>
                    <td>{item.student.rollNumber}</td>
                    <td>
                      <img
                        src={item.student.profileImage || 'https://via.placeholder.com/40'}
                        alt={item.student.name}
                        className="student-photo-small"
                      />
                    </td>
                    <td className="student-name">{item.student.name}</td>
                    <td>{item.student.studentId}</td>
                    <td>{item.statistics.total}</td>
                    <td className="present-cell">{item.statistics.present}</td>
                    <td className="absent-cell">{item.statistics.absent}</td>
                    <td className="late-cell">{item.statistics.late}</td>
                    <td className="leave-cell">{item.statistics.leave}</td>
                    <td>
                      <span className={`percentage-badge ${
                        parseFloat(item.statistics.percentage) >= 75 ? 'good' : 
                        parseFloat(item.statistics.percentage) >= 60 ? 'medium' : 'poor'
                      }`}>
                        {item.statistics.percentage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Generating report...</p>
        </div>
      )}

      {!loading && !report && (
        <div className="no-data-message">
          <FileText size={60} />
          <h3>No Report Generated</h3>
          <p>Select class, section and date range, then click Generate Report</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;