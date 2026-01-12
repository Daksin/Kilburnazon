//Sidebar.js
'use client'
// import React, { useState, useEffect } from 'react';
import styles from 'Sidebar.module.css';
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
            <h1 style={{fontFamily: "monospace"}}>EMPLOYEES</h1>
            <li style={{marginLeft:'25px', color: "orange"}}><Link href = "../../components/Emp/GET"><u>GET</u></Link></li>
            <li style={{marginLeft:'25px', color: "orange"}}><Link href = "../../components/Emp/GETid"><u>GET/ID</u></Link></li>
            <li style={{marginLeft:'25px', color: "orange"}}><Link href = "../../components/Emp/POST"><u>POST</u></Link></li>
            <li style={{marginLeft:'25px', color: "orange"}}><Link href = "../../components/Emp/DEL"><u>DELETE</u></Link></li>
            <li style={{marginLeft:'25px', color: "orange"}}><Link href = "../../components/Emp/PATCH"><u>PATCH</u></Link></li>
            <h1 style={{fontFamily: "monospace"}}>QUALIFICATIONS</h1>
            <li style={{marginLeft:'25px', color: "orange"}}><Link href = "../../components/Quali/GET"><u>GET/ID</u></Link></li>
            <li style={{marginLeft:'25px', color: "orange"}}><Link href = "../../components/Quali/POST"><u>POST</u></Link></li>
            <li style={{marginLeft:'25px', color: "orange"}}><Link href = "../../components/Quali/PATCH"><u>PATCH</u></Link></li>

        </ul>
        </nav>
    </div>
  );
};

export default Sidebar;