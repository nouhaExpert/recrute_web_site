import axios from "axios";
import { useEffect, useState } from "react";


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** custom hook */
export default function useFetch(id){
   
  const [cv, setCV] = useState({
  })

  

  useEffect(() => {
    loadCV();
  }, []);

  const loadCV = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/CV/${id}`
    );
    setCV(result.data);
  };
  
    return [cv, setCV];
}