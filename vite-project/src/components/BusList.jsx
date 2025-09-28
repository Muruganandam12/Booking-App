import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/buses/");
        setBuses(response.data);
      } catch (error) {
        console.log('error in fetching buses', error);
      }
    };
    fetchBuses();
  }, []);

  const handleViewSeats = (id) => {
    navigate(`/bus/${id}`); // ✅ Navigate to seat view
  };

  return (
    <div>
      {buses.map((item) => {
        return (
          <div key={item.id}> {/* ✅ Unique key added */}
            <div>{item.bus_name}</div>
            <div>{item.number}</div>
            <div>{item.origin}</div>
            <div>{item.destination}</div>
            <div>{item.start_time}</div>
            <div>{item.reach_time}</div>
            <button onClick={() => handleViewSeats(item.id)}>View Seats</button>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default BusList;
