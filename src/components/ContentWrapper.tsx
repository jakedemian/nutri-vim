import React from "react";
import { Toaster } from "react-hot-toast";

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    {children}
    <Toaster position="bottom-center" reverseOrder={false} />
  </>
);

export default ContentWrapper;
