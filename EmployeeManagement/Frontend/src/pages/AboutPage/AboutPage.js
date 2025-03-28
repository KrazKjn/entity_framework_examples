import React from 'react';
import { Helmet } from 'react-helmet';
import ResizableBackground from '../../components/ResizableBackground/ResizableBackground';
import GitHubLink from '../../components/GitHubLink/GitHubLink';

const AboutPage = () => {
    return (
        <div className="container">
            <ResizableBackground />
            <GitHubLink filePath="pages/AboutPage/AboutPage.js" />
            <Helmet>
                <title>Employee Management System</title>
            </Helmet>
            <h1>Employee Management System</h1>
            <p>The Employee Manager Solution is a example application designed to efficiently manage employees and departments. The backend leverages Entity Framework, an object-relational mapper (ORM) for .NET, to streamline database operations. It provides robust services for CRUD (Create, Read, Update, Delete) operations on employee and department entities, ensuring data integrity and scalability.
            </p>
            <p>On the frontend, the solution utilizes React, a modern JavaScript library, to deliver a responsive and dynamic user interface. React components are employed to create intuitive pages where users can manage employees and departments. These components interact seamlessly with the backend services through RESTful APIs, enabling data-driven functionality.
            </p>
            <p>The integration between Entity Framework and React ensures that data flows smoothly between the backend and frontend, supporting features like real-time updates, error handling, and user-friendly interactions. This architecture promotes modularity, maintainability, and scalability, making it ideal for businesses looking to optimize their employee and department management processes. Let me know if you’d like a more detailed breakdown!
            </p>
        </div>
    );
};

export default AboutPage;