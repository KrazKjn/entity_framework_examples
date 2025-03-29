import React from 'react';
import Header from './Header/Header';
//import Sidebar from './Sidebar/Sidebar';
import NavMenu from './NavMenu/NavMenu';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="page">
            <div className="sidebar">
                <NavMenu />
            </div>

            <main>
                <div className="top-row px-4">
                    <a href="https://react.dev/" target="_blank">About React</a>
                </div>
                <Header />

                <article className="content px-4">
                    {children}
                </article>
            </main>
        </div>
    );
};

export default Layout;