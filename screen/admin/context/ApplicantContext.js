import React, { createContext, useState, useContext } from "react";

const ApplicantContext = createContext();

export const ApplicantProvider = ({ children }) => {
  const [submittedData, setSubmittedData] = useState([]);

  const addApplicant = (applicant) => {
    setSubmittedData((prev) => [...prev, applicant]);
  };

  return (
    <ApplicantContext.Provider value={{ submittedData, addApplicant }}>
      {children}
    </ApplicantContext.Provider>
  );
};

export const useApplicantContext = () => useContext(ApplicantContext);
