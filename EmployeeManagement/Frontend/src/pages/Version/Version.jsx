import React from 'react';
import { Helmet } from 'react-helmet';
import GitHubLink from '../../components/GitHubLink/GitHubLink';
import ResizableBackground from '../../components/ResizableBackground/ResizableBackground';
import DependenciesList from '../../components/DependenciesList/DependenciesList';
import '../../styles/global.css';

const Version = () => {

    return (
        <div className="container">
            <ResizableBackground />
            <GitHubLink filePath="pages/Version/Version.js" />
            <Helmet>
                <title>Employee Management System - Web Site Information</title>
            </Helmet>
            <h1>Web Site Information</h1>
            <DependenciesList />
            <div>
                <a href="https://github.com/KrazKjn/my-personal-react-website" target="_blank" rel="noopener noreferrer">
                    View this project on GitHub
                </a>
            </div>
            <div>
                <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
                    About React
                </a>
            </div>
        </div>
    );
};

export default Version;