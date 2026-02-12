import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="main-header">
            <div className="container header-content">
                <div className="logo-section">
                    <h1 className="logo">SciBrief <span>for Work</span></h1>
                    <p className="tagline">직장인을 위한 기술 트렌드 브리핑</p>
                </div>
                <div className="header-actions">
                    <span className="current-date">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
