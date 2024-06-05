Hall Booking API
This API is designed to facilitate the management of room bookings for a hall booking application. It provides endpoints for creating rooms, booking rooms, and retrieving booking-related information.

Endpoints
1. Creating a Room
Method: POST
Endpoint: /rooms
Description: Creates a new room with the specified details.

Request Body:

json
Copy code
{
  "name": "Conference Room A",
  "numberOfSeats": 100,
  "amenities": ["Projector", "Whiteboard", "WiFi"],
  "pricePerHour": 50
}
2. Booking a Room
Method: POST
Endpoint: /bookings
Description: Books a room for a customer with the specified details.

Request Body:

json
Copy code
{
  "customerId": "cust123",
  "roomId": "room123",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "12:00"
}
3. List all Rooms with Booked Data
Method: GET
Endpoint: /rooms/all-bookings
Description: Lists all rooms with their booked data, including room name, booking status, customer name, date, start time, and end time.

4. List all Customers with Booked Data
Method: GET
Endpoint: /customers/all-bookings
Description: Lists all customers with their booked data, including customer name, room name, date, start time, and end time.

5. List Customer Booking Details
Method: GET
Endpoint: /bookings/customer-booking-details
Description: Lists how many times a customer has booked a room along with booking details.

Running the API
Install dependencies: npm install
Start the server: npm start
By default, the server runs on http://localhost:8000.
