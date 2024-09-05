import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div >
            <h1 style={styles.header}>404</h1>
            <p style={styles.message}>Page Not Found</p>
            <Link to="/" style={styles.link}>
                Go back to Home
            </Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center' as 'center',
    },
    header: {
        fontSize: '10rem',
        margin: 0,
    },
    message: {
        fontSize: '2rem',
        marginBottom: '2rem',
    },
    link: {
        fontSize: '1.5rem',
        textDecoration: 'none',
        color: '#007bff',
    },
};

export default NotFound;
