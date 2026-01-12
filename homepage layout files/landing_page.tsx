'use client';

import { useState } from "react";
import Sidebar from 'C:/Gitlabs/db_cwk/cwk2 - Copy/frontend/Sidebar.tsx';

type Item = {id: string, name:string};

export default function HomePage(){
  return(
    <div>
      <h6 style={{fontSize: '64px', fontFamily: "initial", marginLeft:'00px'}}>CW2_Database Systems: Dakshit Singhal</h6>
      <p style={{fontFamily: "monospace"}}>This web app can be used to manage employees and their qualifications.</p>
      <br/>
      <p style={{fontSize: '14px', fontFamily: "monospace", marginLeft:'00px'}}>Made by Dakshit Singhal</p>
      <Sidebar/>
  </div>
  );
}