import React from "react";
import { createUseStyles } from "react-jss";

import CalorieDisplay from "src/pages/Today/CalorieDisplay";

const useStyles = createUseStyles({
  pageContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

const Today: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.pageContent}>
        <CalorieDisplay />
      </div>
    </>
  );
};

export default Today;
