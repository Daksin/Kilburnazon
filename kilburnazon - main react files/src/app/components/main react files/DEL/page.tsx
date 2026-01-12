'use client';

import { useState, useEffect } from "react";
import Sidebar from '../../Sidebar';
import styles from "./form.module.css"
type Item = {employee_id: string};







const Del = () => {
    const [message, setMessage] = useState<string>("");
    const [formData, setFormData] = useState({
      employee_id: "",
      reason: "",
      terminator_employee_id: ""
    });
    const[auditData, setAuditData]= useState<string[]>([]);
    const[deletedemp, setDeletedEmp]= useState<string[]>([]);

    const delData = async (empId: string) => {
      const employee_id = formData.employee_id;
      const reason = formData.reason;
      const terminator_employee_id = formData.terminator_employee_id;
      let response = await fetch(`http://localhost/api_calls_kilburnazon/T4/delete_employees.php?employee_id=${empId}`,{
        method: 'POST',
        body: JSON.stringify({employee_id,reason,terminator_employee_id}),
        headers: {'Content-type': 'application/json'}
      })
        const textResponse = await response.text();

        setMessage(textResponse);

      };

    // const auditDelData = async () => {
    //   let response = await fetch(`http://localhost/api_calls_kilburnazon/T4/audit_delete_old_employees.php`){
    //     method: 'GET',
    //     headers: {'Content-type': 'application/json'}
    // };
    const auditDelData = async () => {
  try {
    let response = await fetch(`http://localhost/api_calls_kilburnazon/T4/audit_delete_old_employees.php`);
    const data = await response.json();
    setAuditData(data);
     if (data.length === 0) {
      setMessage("No terminations older than 3 years found.");
      return;
    }
    setMessage(data.map((item: { id: string, name: string, date_deleted: string; }) => `Employee ID: ${item.id}, Name: ${item.name}, Date Terminated: ${item.date_deleted}`).join('\n') 
    + '\n terminated.');
  } catch (err) {
    console.error("Failed to load years:", err);
  }
};
const fetchdeltedemp = async () => {
  try {
    let response = await fetch(`http://localhost/api_calls_kilburnazon/T4/fetch_deleted.php`);
    const data = await response.json();
    setDeletedEmp(data);
     if (data.length === 0) {
      setMessage("No terminated employees found.");
      return;
    }
    setMessage("Terminations list:" + "\n"+"\n"+ data.map((item: { id: string, name: string, date_deleted: string; }) => `Terminated Employee ID: ${item.id}, Name: ${item.name}, Date Deleted: ${item.date_deleted}`).join("\n"));
  } catch (err) {
    console.error("Failed to load:", err);
  }
};
useEffect(() => {
  fetchdeltedemp();
}, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
      const {name,value} = e.target;
        setFormData({...formData,[name]: value});
    }

    const handleReset = () => {
        setFormData({
          employee_id:"",
          reason:"",
          terminator_employee_id: ""
      });
      fetchdeltedemp();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        await delData(formData.employee_id);
        setFormData({
          employee_id:"",
          reason:"",
          terminator_employee_id: ""
      });
        // handleReset();
        }
        catch(err){
          console.error(err);
          setMessage("fail");
        }
    };

      return(
        <div>
       
          <h1 style={{fontFamily: "monospace"}}>Terminate Employees</h1>
          <div className={styles.row}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <label htmlFor = "employee_id" className={styles.label} style={{fontFamily: "monospace"}}>
            Employee terminated ID:
          </label>
          <input
            type ="number"
            id = "employee_id"
            name = "employee_id"
            value = {formData.employee_id}
            min = "0"
            onChange={handleChange}
            className={styles.input}
            required/>

            <label htmlFor = "terminator_employee_id" className={styles.label} style={{fontFamily: "monospace"}}>
            Employee terminator ID:
          </label>
          <input
            type ="number"
            id = "terminator_employee_id"
            name = "terminator_employee_id"
            value = {formData.terminator_employee_id}
            min = "0"
            onChange={handleChange}
            className={styles.input}
            required/>


            <label htmlFor = "reason" className={styles.label} style={{fontFamily: "monospace"}}>
            Reason for termination:
          </label>
          <input
            type ="text"
            id = "reason"
            name = "reason"
            value = {formData.reason}
            onChange={handleChange}
            className={styles.input}
            required/>

            <button type ="submit" className={styles.button} style={{fontFamily: "monospace"}}>Submit</button>
            <button type="reset" className={styles.button} style={{fontFamily: "monospace"}}>Clear</button>        
        </form>
        <button type ="button" className={styles.auditbtn}
        style={{fontFamily: "monospace"}}  
        onClick={() => {
              auditDelData();
            }}>
              Delete employees terminated more than 3 years ago</button>
          
          </div>
          {message && <pre>{message}</pre>}
    </div>
      );
    };


export default Del;




  




