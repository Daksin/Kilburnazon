'use client';

import { useState, useEffect } from "react";
import Sidebar from '../../Sidebar';
import styles from "./form.module.css"
import { Checkbox } from '@mui/material';
type Item = {employee_id: string, department_id:string,name:string, office_id:string, job_title:string, salary:string, dob:string, contract_type:string, nin:string, email:string, date_joined:string};
type deptTitle = {
  id: string;
  title: string;
};

type Emp = {
  id: string;
  name: string;
  job_id: string;
  office_id: string;
  department_id : string;
  department_name: string;
  building_name: string;
  city: string,
  emergency_contact_name: string,
  emergency_contact_number: string,
  emergency_contact_relationship: string,
  country: string,
  address:string,
  postcode:string
};

const patch = () => {
    const [message, setMessage] = useState<string>("");
    const [empDetails, setEmpDetails] = useState<Emp | null>(null);
    const [deptTitles, setdeptTitles] = useState<deptTitle[]>([]);
    const [titles, setTitles] = useState<{ job_id: string; job_title: string }[]>([]);
    const [contracts, setContracts] = useState<{ contract_type: string; }[]>([]);
    const [offices, setOffices] = useState<{ office_id: string; office_name: string }[]>([]);
    const [formData, setFormData] = useState({
      employee_id: "",
      name: "",
      office_id: "",
      job_id: "",
      contract_type: "",  
      department_id: "",
      pay_rise: "",
      city: "",
      emergency_contact_name: "",
      emergency_contact_number: "",
      emergency_contact_relationship:"",
      country : "",
      address : "",
      postcode : ""
    });

    const patchData = async (empId: string) => {
      const employee_id = formData.employee_id;
      const name = formData.name;
      const job_id = formData.job_id;
      const office_id = formData.office_id;
      const contract_type = formData.contract_type;
      const pay_rise = formData.pay_rise;
      const emergency_contact_name = formData.emergency_contact_name;
      const emergency_contact_number = formData.emergency_contact_number;
      const emergency_contact_relationship = formData.emergency_contact_relationship;
      const postcode = formData.postcode;
      const address = formData.address;
      const country = formData.country;
      const city = formData.city;
      const department_id = formData.department_id;
      let response = await fetch(`http://localhost/api_calls_kilburnazon/T2/patch_employees.php?employee_id=${empId}`,{
        method: 'POST',
        body: JSON.stringify({employee_id, name, office_id,city,emergency_contact_name, emergency_contact_number,emergency_contact_relationship,country,address,postcode, job_id, contract_type, department_id,pay_rise}),
        headers: {'Content-type': 'application/json'}
      })
        const textResponse = await response.text();
        // alert(textResponse);
        setMessage(textResponse);
        if(!response.ok){
            const text = await response.text();
        };
      };

        const fetchdeptTitles = async () => {
            try {
            const res = await fetch("http://localhost/api_calls_kilburnazon/T2/get_dept.php");
            const data = await res.json()
            setdeptTitles(data);
            } catch (error) {
            console.error("Failed to load dept titles:", error);
            }
            };
      
          useEffect(() => {
            fetchdeptTitles();
          }, []);

const fetchJobTitles = async () => {
  try {
    const res = await fetch("http://localhost/api_calls_kilburnazon/T2/get_job_titles.php");
    const data = await res.json();
    setTitles(data);
  } catch (err) {
    console.error("Failed to load job titles:", err);
  }
};

useEffect(() => {
  fetchJobTitles();
}, []);

const fetchOffices = async () => {
  try {
    const res = await fetch("http://localhost/api_calls_kilburnazon/T2/get_office_names.php");
    const data = await res.json();
    setOffices(data);
  } catch (err) {
    console.error("Failed to load office locations:", err);
  }
};
useEffect(() => {
  fetchOffices();
}, []);
    
const handleRetrieveDatabutton = () => { 
    setMessage("");
      const empId = formData.employee_id;
      fetchEmpData(empId);
      // setFormData({...formData,[name]: value});
        
    }
const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => { 
      const {name,value} = e.target;
        setFormData({...formData,[name]: value});
    }
    
 const fetchEmpData = async (empId: string)=>{
    try{
    const res = await fetch(`http://localhost/api_calls_kilburnazon/get_employees_data_patch.php?id=${empId}`);
     const data = await res.json();

     if ("error" in data) {
        setMessage(data.error);
        setEmpDetails(null);
        handleReset();
        return;
      }

      setEmpDetails(data);
      setFormData(prev => ({
      ...prev,
      name: data.name || "",
      job_id: data.job_id || "",
      office_id: data.office_id || "",
      department_id: data.department_id || "",
      contract_type: data.contract_type || "",
      address: data.address || "",
      country: data.country || "",
      city: data.city_name || "",
      postcode: data.postcode || "",
      emergency_contact_name: data.emergency_contact_name || "",
      emergency_contact_number: data.emergency_contact_number || "",
      emergency_contact_relationship: data.emergency_contact_relationship || "",
    }));
    } catch (error) {
      console.error("Failed to load employee details:", error);
      setMessage("Error retrieving employee data");
    }
  }

    const handleReset = () => {
        setFormData({
          employee_id:"",
          name:"",
          office_id: "",
          job_id: "",
          contract_type: "", 
          department_id: "",
          pay_rise:"",
          city: "",
          emergency_contact_name: "",
          emergency_contact_number: "",
          emergency_contact_relationship:"",
          country : "",
          address : "",
          postcode : ""
      });
    };
const fetchContracts = async () => {
  try {
    const res = await fetch("http://localhost/api_calls_kilburnazon/T2/get_contract_names.php");
    const data = await res.json();
    setContracts(data);
  } catch (err) {
    console.error("Failed to load office locations:", err);
  }
};
useEffect(() => {
  fetchContracts();
}, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        await patchData(formData.employee_id);

        handleReset();
        }
        catch(err){
          console.error(err);
          setMessage("fail");
        }
    };
      return(
        <div>
          {/* <h1 style={{fontFamily: "monospace"}}>Change employee details</h1> */}
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>

          <div className={styles.field}>
          <label htmlFor = "employee_id" className={styles.label} style={{fontFamily: "monospace"}}>
            Employee ID:
          </label>
          <input
            type ="number"
            id = "employee_id"
            name = "employee_id"
            value = {formData.employee_id}
            min="0"
            onChange={handleChange}
            className={styles.input}
            required/>
          </div>
          
          <div className={styles.buttonContainer}>
            <button
                        type="button"
                        className={styles.button}
                        style={{ fontFamily: "monospace" }}
                        onClick={() => handleRetrieveDatabutton()}
                      >
                        Retrieve Data
                      </button>
          </div>

          <div className={styles.field}>
          <label htmlFor = "name" className={styles.label} style={{fontFamily: "monospace"}}>
              Full Name:
          </label>
          <input
            type ="text"
            id = "name"
            name = "name"
            value = {formData.name}
            onChange={handleChange}
            pattern="^[A-Za-z\s]+$"
            title="Letters only"
            className={styles.input}
            required/>
          </div>

          <div className={styles.field}>
             <label htmlFor = "job_id" className={styles.label} style={{fontFamily: "monospace"}}>
                  Job Titles:
              </label>
              <select
                      id="job_id"
                      name="job_id"
                      value={formData.job_id}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    >
                      <option value="">-- Select Job Title --</option>
    
                      {titles.map((o) => (
                        <option key={o.job_id} value={o.job_id}>
                          {o.job_title} 
                        </option>
                      ))}
                    </select>
                    </div>

          <div className={styles.field}>
            <label htmlFor = "office_id" className={styles.label} style={{fontFamily: "monospace"}}>
                          Offices:
                  </label>
                      <select
                      id="office_id"
                      name="office_id"
                      value={formData.office_id}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    >
                      <option value="">-- Select Office --</option>
    
                      {offices.map((o) => (
                        <option key={o.office_id} value={o.office_id}>
                          {o.office_name} 
                        </option>
                      ))}
                    </select>
                    </div>

          <div className={styles.field}>

            <label htmlFor = "department_id" className={styles.label} style={{fontFamily: "monospace"}}>
              Department:
          </label>
          <select
                  id="department_id"
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="">-- Select Department --</option>

                  {deptTitles.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
            
          </div>
            <div className={styles.field}>
            <label htmlFor = "contract_type" className={styles.label} style={{fontFamily: "monospace"}}>
              Contract Type:
          </label>
          <select
                  id="contract_type"
                  name="contract_type"
                  value={formData.contract_type}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="">-- Select Contract Type --</option>

                  {contracts.map((o) => (
                    <option key={o.contract_type} value={o.contract_type}>
                      {o.contract_type} 
                    </option>
                  ))}
                </select>
                </div>
          <div className={styles.field}>
                    <label htmlFor = "emergency_contact_name" className={styles.label} style={{fontFamily: "monospace"}}>
                        Emergency Contact Name:
                    </label>
                    <input
                      type ="text"
                      id = "emergency_contact_name"
                      name = "emergency_contact_name"
                      value = {formData.emergency_contact_name}
                      onChange={handleChange}
                        pattern="^[A-Za-z\s]+$"
                      title="Letters only"
                       placeholder="Can be left blank"
                      className={styles.input}
                      />
                      </div>
          
                <div className={styles.field}>
                      <label htmlFor = "emergency_contact_number" className={styles.label} style={{fontFamily: "monospace"}}>
                        Emergency Contact Number:
                    </label>
                    <input
                      type ="text"
                      id = "emergency_contact_number"
                      name = "emergency_contact_number"
                      value = {formData.emergency_contact_number}
                        pattern="^[0-9]{11}$"
                        title="11 digits only"
                      onChange={handleChange}
                      placeholder="Can be left blank"
                      className={styles.input}
                      />
                      </div>
          
                <div className={styles.field}>
                      <label htmlFor = "country" className={styles.label} style={{fontFamily: "monospace"}}>
                        Address country:
                    </label>
                    <input
                      type ="text"
                      id = "country"
                      name = "country"
                      value = {formData.country}
                      onChange={handleChange}
                      pattern="^[A-Za-z\s]+$"
                      title="Letters only"
                      className={styles.input}
                      required
                      />
                      </div>
          
                <div className={styles.field}>
                      <label htmlFor = "city" className={styles.label} style={{fontFamily: "monospace"}}>
                        Address city:
                    </label>
                    <input
                      type ="text"
                      id = "city"
                      name = "city"
                      value = {formData.city}
                      onChange={handleChange}
                      pattern="^[A-Za-z\s]+$"
                      title="Letters only"
                      className={styles.input}
                      required
                      />
                      </div>
          
                <div className={styles.field}>
                      <label htmlFor = "postcode" className={styles.label} style={{fontFamily: "monospace"}}>
                        Address Postcode:
                    </label>
                    <input
                      type ="text"
                      id = "postcode"
                      name = "postcode"
                      value = {formData.postcode}
                      onChange={handleChange}
                      className={styles.input}
                      required
                      />
                      </div>
          
                <div className={styles.field}>
          
                    <label htmlFor = "address" className={styles.label} style={{fontFamily: "monospace"}}>
                        Address line:
                    </label>
                    <input
                      type ="text"
                      id = "address"
                      name = "address"
                      value = {formData.address}
                      onChange={handleChange}
                      className={styles.input}
                      required
                      />
                      </div>
          
                <div className={styles.field}>
                      <label htmlFor = "emergency_contact_relationship" className={styles.label} style={{fontFamily: "monospace"}}>
                        Emergency Contact Relationship:
                    </label>
                    <input
                      type ="text"
                      id = "emergency_contact_relationship"
                      name = "emergency_contact_relationship"
                      value = {formData.emergency_contact_relationship}
                      pattern="^[A-Za-z\s]+$"
                      title="Letters only"
                      onChange={handleChange}
                      placeholder="Can be left blank"
                      className={styles.input}
                      />
                      
                      </div>  
                <div className={styles.field}></div>
          <div className={styles.field}>
            <label htmlFor = "pay_rise" className={styles.label} style={{fontFamily: "monospace"}}>
              Please enter the pay rise percentage if applicable (enter 0 if not):
          </label>
          <input
            type ="number"
            id = "pay_rise"
            name = "pay_rise"
            value = {formData.pay_rise}
            onChange={handleChange}
            className={styles.input}
            min ="0"
            step="0.01"
            required/>
          </div>
            <button type ="submit" className={styles.button} style={{fontFamily: "monospace"}}>Submit</button>
            <button type="reset" className={styles.button} style={{fontFamily: "monospace"}}>Clear</button>        
        </form>
          {message && <pre>{message}</pre>}
    </div>

      );
    };


export default patch;
