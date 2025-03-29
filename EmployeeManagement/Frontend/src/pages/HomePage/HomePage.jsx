import React from "react";
import { Helmet } from 'react-helmet';
import GitHubLink from '../../components/GitHubLink/GitHubLink';
import ResizableBackground from '../../components/ResizableBackground/ResizableBackground';
import '../../styles/global.css';
import "./HomePage.css"; // Optional custom styles

const HomePage = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Right Content */}
                <div className="col-md-9 main-content">
                    <div className="content-area">
                        <ResizableBackground />
                        <GitHubLink filePath="pages/HomePage/HomePage.js" />
                        <Helmet>
                            <title>Employee Management System</title>
                        </Helmet>
                        <h1>Welcome to the Employee Management System</h1>
                        <p>
                            Use the navigation menu on the left to manage employees, departments, and more.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;