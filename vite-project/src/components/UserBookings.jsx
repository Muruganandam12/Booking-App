import React, { useState, useEffect } from "react";
import axios from "axios";

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId) {
        return;
      }
      try {
        const response = await axios.get(
  `http://localhost:8000/api/user/${userId}/bookings/`,

          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log("Booking data = ", response.data);
        setBookings(response.data);
      } catch (error) {
        console.log("fetching details failed", error);
        setBookingError(
          error.response?.data?.error || "Failed to fetch bookings"
        );
      }
    };

    fetchBookings();
  }, [userId, token]);

  return (
    <div>
      
      {bookingError && <p style={{ color: "red" }}>{bookingError}</p>}

      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking, index) => (
            <li key={booking.id || index}>
              <strong>Bus:</strong>{" "}
              {booking.bus?.bus_name} ({booking.bus?.number}) |{" "}
              <strong>From:</strong> {booking.bus?.origin} →{" "}
              {booking.bus?.destination} |{" "}
              <strong>Seat:</strong> {booking.seat?.seat_number} |{" "}
              <strong>User ID:</strong> {booking.user} | {""}
              <strong>Booking Time:</strong> {booking.booking_time}

            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserBookings;
