//Sidebar.js
'use client'
// import React, { useState, useEffect } from 'react';
import styles from './styles/Sidebar.module.css';
import Link from 'next/link';

const Sidebar = () => {
  // State for managing sidebar open/close state and width
//   const [isOpen, setIsOpen] = useState(true);
//   const [sidebarWidth, setSidebarWidth] = useState(10);

  return (
    <div className={styles.container}>
        <nav className={styles.sidebar}>
        <ul className={styles.nav}>
            <li><Link href = "../../"><u>HOME</u></Link></li>
            <li style={{marginLeft:'15px',marginBottom: "15px",color: "white"}}><Link href = "../../components/Emp/FILTER">Search Employees</Link></li>
            <li style={{marginLeft:'15px',marginBottom: "15px", color: "white"}}><Link href = "../../components/Emp/POST">Add Employees</Link></li>
            <li style={{marginLeft:'15px', marginBottom: "15px",color: "white"}}><Link href = "../../components/Emp/PATCH">Edit Employees</Link></li>
              <li style={{marginLeft:'15px', marginBottom: "15px",color: "white"}}><Link href = "../../components/Emp/birthday">Birthday Cards</Link></li>
            <li style={{marginLeft:'15px', color: "white"}}><Link href = "../../components/Emp/DEL">Delete Employees</Link></li>


        </ul>
        </nav>
    </div>
  );
};

export default Sidebar;