import express from "express";
import { bookings, customers, rooms } from "./local-variable.js";
const bookingRouter = express.Router();

bookingRouter.get("/", (req, res) => {
  res.send(bookings);
});
bookingRouter.get("/all-room", (req, res) => {
  const { customerId, roomId, selectedFields } = req.body;


  // Filter bookings based on roomId and customerId if provided
  let filteredBookings = bookings;
  if (roomId) {
    filteredBookings = filteredBookings.filter(booking => booking.roomId === roomId);
  }
  if (customerId) {
    filteredBookings = filteredBookings.filter(booking => booking.customerId === customerId);
  }


  console.log("Filtered Bookings:", filteredBookings);

  const response = filteredBookings.map(booking => {
    let result = {};
    const room = rooms.find(room => room.id === booking.roomId);
      result.roomName = room ? room.name : null;
      result.status = booking.status;
      const customer = customers.find(customer => customer.id === booking.customerId);
      result.customerName = customer ? customer.name : null;
      result.date = booking.date;
      result.status = booking.status;
      result.startTime = booking.startTime;
      result.endTime = booking.endTime;
    

    return result;
  });

  res.send(response);
});


bookingRouter.post("/", (req, res) => {
  const { body } = req;
  const newBooking = { id: `booking${Date.now()}`, ...body };
  bookings.push(newBooking);
  res.send({ msg: "Booking created" });
});


//List how many times a customer has booked the room with below details

bookingRouter.get("/customer-booking-details", (req, res) => {
  const customerBookingDetails = [];

  customers.forEach((customer) => {
      const customerBookings = bookings.filter((booking) => booking.customerId === customer.id);

      customerBookings.forEach((booking) => {
          const room = rooms.find((room) => room.id === booking.roomId);
          customerBookingDetails.push({
              customerName: customer.name,
              roomName: room ? room.name : null,
              date: booking.date,
              startTime: booking.startTime,
              endTime: booking.endTime,
              bookingId: booking.id,
              bookingDate: booking.date,
              bookingStatus: booking.status
          });
      });
  });

  res.send(customerBookingDetails);
});
bookingRouter.put("/:id", (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const index = bookings.findIndex((booking) => booking.id == id);

  bookings[index] = { ...bookings[index], ...body };

  res.send({ msg: "Booking updated" });
});

bookingRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = bookings.findIndex((booking) => booking.id == id);
  if (index !== -1) {
    bookings.splice(index, 1);
    res.send({ msg: "Booking deleted" });
  } else {
    res.status(404).send({ msg: "Booking not found" });
  }
});

bookingRouter.patch("/assign-booking/:id", (req, res) => {
  const { body } = req;
  const { customerId, roomId } = body;
  const bookingId = req.params.id;


  const bookingObj = bookings.find((booking) => booking.id === bookingId);
  const customerObj = customers.find((customer) => customer.id === customerId);
  const roomObj = rooms.find((room) => room.id === roomId);


  if (bookingObj && customerObj && roomObj) {

    bookingObj.customerId = customerId;
    bookingObj.roomId = roomId;
    bookingObj.status = "Complete";
    
    if (!customerObj.rooms) {
      customerObj.roomId = [];
    }
    customerObj.roomId.push(roomId);

   
   
    console.log("Booking Assignment Success!");
    res.send({ msg: "Booking Assignment Success!" });
  } else {
    
    console.log("Booking, customer, or room not found");
    res
      .status(400)
      .send({ msg: "Please check booking, customer, and room ids" });
  }
});

export default bookingRouter;
