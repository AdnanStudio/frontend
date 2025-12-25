import React from 'react';
import { Clock, BookOpen, User, MapPin } from 'lucide-react';
import './WeeklyRoutineView.css';

const WeeklyRoutineView = ({ routine, highlightTeacher = false, teacherId = null }) => {
  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getDaySchedule = (day) => {
    return routine?.schedule?.find(s => s.day === day);
  };

  return (
    <div className="weekly-routine-container">
      <div className="routine-header">
        <h2>Class Routine - {routine?.class?.className} (Section {routine?.class?.section})</h2>
        <span className="academic-year">Academic Year: {routine?.academicYear}</span>
      </div>

      <div className="routine-table-wrapper">
        <table className="routine-table">
          <thead>
            <tr>
              <th className="day-column">Day</th>
              <th className="periods-column">Class Schedule</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const daySchedule = getDaySchedule(day);
              
              return (
                <tr key={day}>
                  <td className="day-cell">
                    <div className="day-name">{day}</div>
                  </td>
                  <td className="periods-cell">
                    {daySchedule?.periods?.length > 0 ? (
                      <div className="periods-grid">
                        {daySchedule.periods.map((period) => {
                          const isTeacherClass = highlightTeacher && 
                            period.teacher?._id === teacherId;
                          
                          return (
                            <div
                              key={period._id}
                              className={`period-card ${isTeacherClass ? 'teacher-highlight' : ''}`}
                            >
                              <div className="period-header">
                                <span className="period-number">Period {period.periodNumber}</span>
                                <span className="period-time">
                                  <Clock size={14} />
                                  {period.startTime} - {period.endTime}
                                </span>
                              </div>
                              <div className="period-body">
                                <div className="period-info">
                                  <BookOpen size={16} />
                                  <span className="subject-name">
                                    {period.subject?.name || 'N/A'}
                                  </span>
                                </div>
                                <div className="period-info">
                                  <User size={16} />
                                  <span className="teacher-name">
                                    {period.teacher?.userId?.name || 'N/A'}
                                  </span>
                                </div>
                                {period.room && (
                                  <div className="period-info">
                                    <MapPin size={16} />
                                    <span className="room-name">{period.room}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="no-classes">No classes scheduled</div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyRoutineView;