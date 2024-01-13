import React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const TimeComponent: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Fetch server time
    const fetchServerTime = async () => {
      try {
        const response = await fetch("/api/getServerTime"); // Replace with your server endpoint
        const serverTime = await response.json();

        setCurrentDateTime(new Date(serverTime));
      } catch (error) {
        console.error("Error fetching server time:", error);
      }
    };

    fetchServerTime();
  }, []);

  return <>{format(currentDateTime, " hh:mm a")}</>;
};

export default TimeComponent;
