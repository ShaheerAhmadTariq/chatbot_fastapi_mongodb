import { useState } from "react";
import { useRouter } from "next/router";
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="phoneNo">Phone No:</label>
      <input
        type="text"
        id="phoneNo"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <label htmlFor="projectDetails">Project Details:</label>
      <textarea
        id="projectDetails"
        value={projectDetails}
        onChange={(e) => setProjectDetails(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateLead;
