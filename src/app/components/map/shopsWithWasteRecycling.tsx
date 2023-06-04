import axios from 'axios';
import { useState, useEffect } from 'react';

export const useShopsWithWasteRecycling = () => {
  const [shopsWithWasteRecycling, setShopsWithWasteRecycling] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/ShopsWithWasteRecycling', {
          city: 'Gdańsk',
          shops: [],
        });
        setShopsWithWasteRecycling(response.data.filter((point) => point && point.lat));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { shopsWithWasteRecycling };
};
