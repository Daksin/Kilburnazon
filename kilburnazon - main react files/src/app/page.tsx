'use client';

import { useState } from "react";
import Sidebar from './components/Sidebar';

type Item = {id: string, name:string};
import logo from "@/assets/logo.png";




export default function HomePage(){
  return(
    <div>
     
      <h6 style={{fontSize: '64px', fontFamily: "initial", marginLeft:'00px'}}><u>Kilburnazon</u>
      </h6>
      <p style={{fontFamily: "monospace"}}>Technologies used: </p>
      <p style={{fontFamily: "monospace"}}>1: React library in Typescipt for client-side processing to recieve end-user input and display the data recieved from the backend</p>
      <p style={{fontFamily: "monospace"}}>2: Embedded HTML for the forms and CSS for the styling in Typescipt </p>
      <p style={{fontFamily: "monospace"}}>3: PHP for server-side processing including querying the database and returning the data to the frontend </p>
      <br/>
      <p style={{fontSize: '14px', fontFamily: "monospace"}}>Made by Dakshit Singhal</p>
       <img
  src="/arch.jpg"
  alt="Architecture"
  style={{ width: "700px", height: "auto", marginLeft:'00px' }}
/>
      <Sidebar/>
  </div>
  );
}