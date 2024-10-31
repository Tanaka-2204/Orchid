import { useEffect, useState } from "react";

export const useOrchid = () => {
  const [orchidList, setOrchidList] = useState([]);
  const baseURL = `https://670c68177e5a228ec1d03b5e.mockapi.io/orchids`;

  const fetchAPI = async () => {

      const response = await fetch(baseURL);
      
      const data = await response.json();
      setOrchidList(data);
    
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return orchidList;
};
