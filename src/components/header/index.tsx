import React from 'react'
import './style.sass'
import { Link } from 'react-router-dom';

interface HeaderProps {
    path: {
        label: string;
        path: string;
    }[];
}

export const Header: React.FC<HeaderProps> = ({ path }) => {
    if (path.length > 1) {
        return (
            <div className="header-container">
                {path.map((item, index) => (
                    <span key={index}>
                        <Link className="text" style={{ textDecoration: 'inherit'}} to={item.path}>{item.label}</Link>
                    </span>
                ))}
            </div>
        )
    } else {
        return (
            <div className="header-container">
                <span className="text">
                    {path[0].label}
                </span>
            </div>
        )
    }
}
