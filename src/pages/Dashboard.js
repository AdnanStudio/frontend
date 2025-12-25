import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import DashboardHome from '../components/DashboardHome';
import Students from './Students';
import AddStudent from './AddStudent';
import Teachers from './Teachers';
import AddTeacher from './AddTeacher';
import Classes from './Classes';
import AddClass from './AddClass';
import EditClass from './EditClass';
import Attendance from './Attendance';
import AttendanceReport from './AttendanceReport';
import Payments from './Payments';
import Marks from './Marks';
import Notifications from './Notifications';
import WebsiteSettings from './WebsiteSettings';
import Notices from './Notices';
import ManageSettings from './ManageSettings';
import ManageUsers from './ManageUsers';
import AddUser from './AddUser';
import EditUser from './EditUser';
import StaffDashboard from './StaffDashboard';
import LibrarianDashboard from './LibrarianDashboard';
import AccountantDashboard from './AccountantDashboard';
import Subjects from './Subjects';
import ClassRoutine from './ClassRoutine';
import ClassRoutineView from './ClassRoutineView';
import StudentRoutineView from '../components/StudentRoutineView';
import TeacherRoutineView from '../components/TeacherRoutineView';
import Assignments from './Assignments';
import AddAssignment from './AddAssignment';
import StudentAssignments from './StudentAssignments';
import LeaveRequest from './LeaveRequest';
import MyLeaves from './MyLeaves';
import LeaveManagement from './LeaveManagement';

import './Dashboard.css';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const getDashboardHome = () => {
    switch (user?.role) {
      case 'staff':
        return <StaffDashboard />;
      case 'librarian':
        return <LibrarianDashboard />;
      case 'accountant':
        return <AccountantDashboard />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-content-area">
        <Routes>
          <Route path="/" element={getDashboardHome()} />

          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <>
              <Route path="/students" element={<Students />} />
              <Route path="/students/add" element={<AddStudent />} />
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/teachers/add" element={<AddTeacher />} />
            </>
          )}

          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <>
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/add" element={<AddClass />} />
              <Route path="/classes/edit/:id" element={<EditClass />} />
            </>
          )}

          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <>
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/attendance-report" element={<AttendanceReport />} />
            </>
          )}

          {(user?.role === 'admin' || user?.role === 'accountant' || user?.role === 'teacher' || user?.role === 'student') && (
            <Route path="/payments" element={<Payments />} />
          )}

          {(user?.role === 'admin' || user?.role === 'teacher' || user?.role === 'student') && (
            <Route path="/marks" element={<Marks />} />
          )}

          <Route path="/notifications" element={<Notifications />} />

          {user?.role === 'admin' && (
            <>
              <Route path="/website-settings" element={<WebsiteSettings />} />
              <Route path="/manage-settings" element={<ManageSettings />} />
            </>
          )}

          {(user?.role === 'admin' || user?.role === 'teacher' || user?.role === 'staff' || user?.role === 'librarian' || user?.role === 'accountant') && (
            <Route path="/notices" element={<Notices />} />
          )}

          {user?.role === 'admin' && (
            <Route path="/subjects" element={<Subjects />} />
          )}

          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <>
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/assignments/add" element={<AddAssignment />} />
            </>
          )}

          {user?.role === 'student' && (
            <Route path="/assignments" element={<StudentAssignments />} />
          )}

          {user?.role !== 'admin' && (
            <>
              <Route path="/leave-request" element={<LeaveRequest />} />
              <Route path="/my-leaves" element={<MyLeaves />} />
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Route path="/leave-management" element={<LeaveManagement />} />
              <Route path="/admissions" element={<Students />} />
            </>
          )}

          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <Route path="/admissions" element={<Students />} />
          )}

          {user?.role === 'admin' && (
            <>
              <Route path="/class-routine" element={<ClassRoutine />} />
              <Route path="/class-routine/:id" element={<ClassRoutineView />} />
            </>
          )}

          {user?.role === 'teacher' && (
            <Route path="/class-routine" element={<TeacherRoutineView />} />
          )}

          {user?.role === 'student' && (
            <Route path="/class-routine" element={<StudentRoutineView />} />
          )}

          {user?.role === 'admin' && (
            <>
              <Route path="/users" element={<ManageUsers />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import DashboardHome from '../components/DashboardHome';
// import Students from './Students';
// import AddStudent from './AddStudent';
// import Teachers from './Teachers';
// import AddTeacher from './AddTeacher';
// import Classes from './Classes';
// import AddClass from './AddClass';
// import EditClass from './EditClass';

// // Attendance pages
// import Attendance from './Attendance';
// import AttendanceReport from './AttendanceReport';

// import Payments from './Payments';
// import Marks from './Marks';
// import Notifications from './Notifications';
// import WebsiteSettings from './WebsiteSettings';
// import Notices from './Notices';
// import ManageSettings from './ManageSettings';

// // User management pages
// import ManageUsers from './ManageUsers';
// import AddUser from './AddUser';
// import EditUser from './EditUser';

// // Role-based dashboards
// import StaffDashboard from './StaffDashboard';
// import LibrarianDashboard from './LibrarianDashboard';
// import AccountantDashboard from './AccountantDashboard';

// // Subjects
// import Subjects from './Subjects';

// // ✅ Class Routine imports
// import ClassRoutine from './ClassRoutine';
// import ClassRoutineView from './ClassRoutineView';
// import StudentRoutineView from '../components/StudentRoutineView';
// import TeacherRoutineView from '../components/TeacherRoutineView';

// // ✅ Assignments imports
// import Assignments from './Assignments';
// import AddAssignment from './AddAssignment';
// import StudentAssignments from './StudentAssignments';

// import './Dashboard.css';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 1024) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   // Role-based dashboard home
//   const getDashboardHome = () => {
//     switch (user?.role) {
//       case 'staff':
//         return <StaffDashboard />;
//       case 'librarian':
//         return <LibrarianDashboard />;
//       case 'accountant':
//         return <AccountantDashboard />;
//       case 'admin':
//       case 'teacher':
//       case 'student':
//       default:
//         return <DashboardHome />;
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//       {sidebarOpen && (
//         <div className="sidebar-overlay" onClick={toggleSidebar} />
//       )}

//       <div
//         className={`dashboard-main ${
//           sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
//         }`}
//       >
//         <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

//         <div className="dashboard-content">
//           <Routes>
//             {/* Home */}
//             <Route path="/" element={getDashboardHome()} />

//             {/* Students - Admin & Teacher */}
//             {(user?.role === 'admin' || user?.role === 'teacher') && (
//               <>
//                 <Route path="/students" element={<Students />} />
//                 <Route path="/students/add" element={<AddStudent />} />
//               </>
//             )}

//             {/* Teachers - Admin only */}
//             {user?.role === 'admin' && (
//               <>
//                 <Route path="/teachers" element={<Teachers />} />
//                 <Route path="/teachers/add" element={<AddTeacher />} />
//               </>
//             )}

//             {/* Classes - Admin & Teacher */}
//             {(user?.role === 'admin' || user?.role === 'teacher') && (
//               <>
//                 <Route path="/classes" element={<Classes />} />
//                 <Route path="/classes/add" element={<AddClass />} />
//                 <Route path="/classes/edit/:id" element={<EditClass />} />
//               </>
//             )}

//             {/* Attendance - Admin & Teacher */}
//             {(user?.role === 'admin' || user?.role === 'teacher') && (
//               <>
//                 <Route path="/attendance" element={<Attendance />} />
//                 <Route
//                   path="/attendance-report"
//                   element={<AttendanceReport />}
//                 />
//               </>
//             )}

//             {/* Payments - Admin & Accountant */}
//             {(user?.role === 'admin' || user?.role === 'accountant') && (
//               <Route path="/payments" element={<Payments />} />
//             )}

//             {/* Marks - Admin & Teacher */}
//             {(user?.role === 'admin' || user?.role === 'teacher') && (
//               <Route path="/marks" element={<Marks />} />
//             )}

//             {/* Notifications - All roles */}
//             <Route path="/notifications" element={<Notifications />} />

//             {/* Website Settings - Admin only */}
//             {user?.role === 'admin' && (
//               <>
//                 <Route
//                   path="/website-settings"
//                   element={<WebsiteSettings />}
//                 />
//                 <Route
//                   path="/manage-settings"
//                   element={<ManageSettings />}
//                 />
//               </>
//             )}

//             {/* Notices - Admin & Teacher */}
//             {(user?.role === 'admin' || user?.role === 'teacher') && (
//               <Route path="/notices" element={<Notices />} />
//             )}

//             {/* Subjects - Admin only */}
//             {user?.role === 'admin' && (
//               <Route path="/subjects" element={<Subjects />} />
//             )}

//             {/* ✅ Assignments - Admin & Teacher */}
//             {(user?.role === 'admin' || user?.role === 'teacher') && (
//               <>
//                 <Route path="/assignments" element={<Assignments />} />
//                 <Route
//                   path="/assignments/add"
//                   element={<AddAssignment />}
//                 />
//               </>
//             )}

//             {/* ✅ Assignments - Student */}
//             {user?.role === 'student' && (
//               <Route
//                 path="/assignments"
//                 element={<StudentAssignments />}
//               />
//             )}

//             {/* ✅ Class Routine - Admin */}
//             {user?.role === 'admin' && (
//               <>
//                 <Route
//                   path="/class-routine"
//                   element={<ClassRoutine />}
//                 />
//                 <Route
//                   path="/class-routine/:id"
//                   element={<ClassRoutineView />}
//                 />
//               </>
//             )}

//             {/* ✅ Class Routine - Teacher */}
//             {user?.role === 'teacher' && (
//               <Route
//                 path="/class-routine"
//                 element={<TeacherRoutineView />}
//               />
//             )}

//             {/* ✅ Class Routine - Student */}
//             {user?.role === 'student' && (
//               <Route
//                 path="/class-routine"
//                 element={<StudentRoutineView />}
//               />
//             )}

//             {/* User Management - Admin only */}
//             {user?.role === 'admin' && (
//               <>
//                 <Route path="/users" element={<ManageUsers />} />
//                 <Route path="/users/add" element={<AddUser />} />
//                 <Route
//                   path="/users/edit/:id"
//                   element={<EditUser />}
//                 />
//               </>
//             )}
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
