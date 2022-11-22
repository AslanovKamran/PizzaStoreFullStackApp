import React from 'react';
import styles from './NotFound.module.scss';
import { Link } from "react-router-dom";
import Header from '../Header';



function NotFoundBlock ()  {
    return (
        <>
        <Header/>
        <div className={styles.root}>

            <h1>
                <span>🙄</span>
                <br />
               Wrong Route
            </h1>
            <p>This page does <b>not</b> exist.</p>
            <Link to='/home'>
                <button className={styles.button}>
                   Back to the store
                </button>
            </Link>
        </div>
        </>
    )
}

export default NotFoundBlock