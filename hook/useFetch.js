import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
  
    try {
      const response = await axios.get('http://192.168.100.51:3000/api/products');
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error('Request URL:', error.config.url);
      setError(error);
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.get('http://192.168.100.51:3000/api/products'); // Update the URL
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
