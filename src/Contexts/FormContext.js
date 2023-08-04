import React, { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  return (
    <FormContext.Provider value={{ isFormSubmitted, handleFormSubmit }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };