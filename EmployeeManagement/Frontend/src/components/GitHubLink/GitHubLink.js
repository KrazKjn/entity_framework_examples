import React from "react";
import "./GitHubLink.css"; // Import your CSS file for styling

const GitHubLink = ({ filePath }) => {
    const baseURL = "https://github.com/KrazKjn/my-personal-react-website/blob/main/src";
    const fullURL = `${baseURL}/${filePath}`;

    return (
        <div className="git-hub-link">
            <a href={`${fullURL}`} target="_blank" rel="noopener noreferrer">
                View this page on GitHub
            </a>
        </div>
    );
};

export default GitHubLink;
