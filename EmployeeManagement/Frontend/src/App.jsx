/*
import logo from './logo.svg';
import './App.css';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from './components/Navigation/NavigationBar';
import EmployeesPage from './pages/EmployeesPage';
import EmployeeForm from './components/EmployeeForm';
import DepartmentsPage from './components/DepartmentPage';
import DepartmentForm from './components/DepartmentForm';
import HomePage from './pages/HomePage';
import ParentComponent from './components/ParentComponent';

const handleSuccess = (typeName) => {
  //alert(`${typeName} was successfully saved!`);
  // Add navigation or other actions here
};

function App() {
    return (
      <Router>
      <NavigationBar />
      <Routes>
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/add-employee" element={<EmployeeForm onSubmitSuccess={handleSuccess('Employee')} />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/add-department" element={<DepartmentForm onSubmitSuccess={handleSuccess('Department')} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/manage" element={<ParentComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
*/

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from "./pages/HomePage/HomePage"; // Home page with navigation
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage"; // Page for listing employees
import DepartmentsPage from "./pages/DepartmentsPage/DepartmentsPage"; // Page for listing departments
import EmployeeForm from "./components/EmployeeForm"; // Form for creating/updating employees
import DepartmentForm from "./components/DepartmentForm"; // Form for creating/updating departments
import ParentComponent from "./components/ParentComponent"; // Component for managing both Employees and Departments
import AboutPage from "./pages/AboutPage/AboutPage"; // About page
import Version from "./pages/Version/Version"; // Version page
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for styling
import './App.css'; // Custom CSS for the application

const App = () => {
    return (
        // my-ef-react-website
        <BrowserRouter basename="/"> {/* Base URL for the app */}
          <Layout>
            <Routes>
                {/* Define routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/add-employee" element={<EmployeeForm />} />
                <Route path="/add-department" element={<DepartmentForm />} />
                <Route path="/manage" element={<ParentComponent />} /> {/* Manage route */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/version" element={<Version />} />
            </Routes>
          </Layout>
        </BrowserRouter>
    );
};

export default App;