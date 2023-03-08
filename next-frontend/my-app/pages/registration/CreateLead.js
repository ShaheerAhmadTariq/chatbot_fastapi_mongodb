import { useState } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/CreateLeadStyle.module.css'
// import { Link } from 'next/link'
// import axios from "axios";

const CreateLead = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("sending request")
      const response = await fetch("http://127.0.0.1:8000/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          phoneNo: phoneNo,
          country: country,
          projectDetails: projectDetails,
        }),
      });
      const data = await response.json();
      console.log(data.message);
      if (data.message !== "correct") {
        alert(data.message);
      } else {
        router.push("/chatbot");
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <>
    
    <form onSubmit={handleSubmit} className={styles.form}>
    <p>Welcome To Kryptomind</p>
      <label htmlFor="name" className={styles.label}>Name:</label>
      <input
        className={styles.input}
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email" className={styles.label}>Email:</label>
      <input
        className={styles.input}
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="phoneNo" className={styles.label}>Phone No:</label>
      <input
        className={styles.input}
        type="text"
        id="phoneNo"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <label htmlFor="country" className={styles.label}>Country:</label>
      <input
        className={styles.input}
        type="text"
        id="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <label htmlFor="projectDetails" className={styles.label}>Project Details:</label>
      <textarea
        className={styles.input}
        id="projectDetails"
        value={projectDetails}
        onChange={(e) => setProjectDetails(e.target.value)}
      />
      {/* <label htmlFor="name" className={styles.label}>Name</label>
      <input 
        className={styles.input}
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="email"className={styles.label}>Email</label>
      <input
        className={styles.input}
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="email"className={styles.label}>Phone Number</label>
      <input
        className={styles.input}
        id="email"
        type="Number"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="email"className={styles.label}>Country</label>
      <input
        className={styles.input}
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="email"className={styles.label}>Project Details</label>
      <input
        className={styles.input}
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /> */}

      <button type="submit" className={styles.button}>Submit</button>
    </form>
    </>
  );
}

export default CreateLead;
