import React from 'react'
import styles from './ServerError.module.scss';
import { Link } from "react-router-dom";

function  ServerErrorBlock(){
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Server Error 🤕</h1>
        <h2>Check your API</h2>
      </div>
      <Link to='/home'>
        <button onClick={() => window.location.reload()} className={styles.button}>
          Try again
        </button>
      </Link>
    </div>
  )
}

export default ServerErrorBlock