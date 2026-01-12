'use client';

import { useState } from "react";
import Sidebar from '../../Sidebar';
import styles from "./form.module.css"
type Item = {id: string};






const Birthdays = () => {
    const [message, setMessage] = useState<string>("");
    // const [formData, setFormData] = useState({
    //   id: ""
    // });
    const [birthdays, setBirthdays] = useState<string[]>([]);

const fetchBirthdays = async () => {
  try {
    const res = await fetch("http://localhost/api_calls_kilburnazon/T3/get_birthdays.php");
    const data = await res.json();
    setBirthdays(data);
     if (data.length === 0) {
      setMessage("No birthdays this month.");
      return;
    }
    setMessage(data.map((item: { id: string, name: string; dob: string }) => `Employee ID: ${item.id}, Name: ${item.name}, DOB: ${item.dob}`).join('\n'));
  } catch (err) {
    console.error("Failed to load years:", err);
  }
};
      return(
        <div>

        <button type ="button" 
        className={styles.button} 
        style={{fontFamily: "monospace"}}
        onClick={fetchBirthdays}>
          Get Birthday for current month</button>
          {message && <pre>{message}</pre>}
    </div>

      );
    };


export default Birthdays;



    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    //   const {name,value} = e.target;
    //     setFormData({...formData,[name]: value});
    // }
    // const handleReset = () => {
    //     setFormData({
    //       id:""
    //   });
    // };
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   try{
    //     await delData();
    //     handleReset();
    //     }
    //     catch(err){
    //       console.error(err);
    //       setMessage("fail");
    //     }
    // };

            {/* <h1 style={{fontFamily: "monospace"}}>Delete Employees</h1>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <label htmlFor = "id" className={styles.label} style={{fontFamily: "monospace"}}>
            ID:
          </label>
          <input
            type ="text"
            id = "id"
            name = "id"
            value = {formData.id}
            onChange={handleChange}
            className={styles.input}
            required/>

            <button type ="submit" className={styles.button} style={{fontFamily: "monospace"}}>Submit</button>
            {/* <button type="reset" className={styles.button} style={{fontFamily: "monospace"}}>Clear</button>         */}
        {/* </form> */} 




