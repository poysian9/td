import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import sui from "../images/gvee.jpeg";


const GoBack = () => {
  const history = useHistory();

  useEffect(() => {
    // Set a timeout to go back to the previous page after 3 seconds (3000 milliseconds)
    const timeoutId = setTimeout(() => {
      history.goBack(); // Go back to the previous page
    }, 5000);

    // Clear the timeout if the component unmounts (optional)
    return () => clearTimeout(timeoutId);
  }, [history]);

  return (
    <div className="coin-status-container" style={{paddingLeft: "80px"}}>
        <div className="general-container">
            <img src={sui} alt="sui"/>
            <h1 className="whoops" style={{ position: "absolute", top: "80%", left: "20%", transform: "translate(-50%, -50%)" }}>
                Uh, oh!
            </h1>
            <p className="wrong" style={{ position: "absolute", top: "90%", left: "20%", transform: "translate(-50%, -50%)" }}>
                Wrong ID entered
            </p>
        </div>
    </div>
  );
};

export default GoBack;





