import React from 'react';
import packageJson from '../../../package.json'; // Adjust the path as needed
import appVersion from "../../version"; // Import the version number

const DependenciesList = () => {
  // Combine dependencies and devDependencies
  const dependencies = { 
    ...packageJson.dependencies, 
    ...packageJson.devDependencies 
  };

  return (
    <div>
      <h1>Dependencies and Versions</h1>
      <ul>
          <li key="Version">
            Version: {appVersion}
          </li>
          {Object.entries(dependencies).map(([name, version]) => (
          <li key={name}>
            {name}: {version.replace(/^[^0-9]*/, '')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DependenciesList;