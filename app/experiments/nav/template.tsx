import React from "react";
import Counter from "./components/counter/Counter";

interface TemplateProps {
  children: React.ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return (
    <>
      <Counter label="template" />
      {children}
    </>
  );
};

export default Template;
