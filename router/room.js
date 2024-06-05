import express from "express";
import { bookings, customers, rooms } from "./local-variable.js";


const roomsRouter =express.Router();

roomsRouter.get("/" ,(req , res) => {
   res.send(rooms)
})

roomsRouter.get("/all-room", (req, res) => {
  const { customerId, roomId } = req.body;

  // Filter rooms based on roomId if provided
  let filteredRooms = rooms;
  if (roomId) {
    filteredRooms = filteredRooms.filter(room => room.id === roomId);
  }

  // Construct response for all rooms with their bookings
  const response = filteredRooms.map(room => {
    // Find bookings for the current room
    let roomBookings = bookings.filter(booking => booking.roomId === room.id);

    // Filter roomBookings based on customerId if provided
    if (customerId) {
      roomBookings = roomBookings.filter(booking => booking.customerId === customerId);
    }

    // If there are no bookings, return room with empty booking details
    if (roomBookings.length === 0) {
      return {
        roomName: room.name,
        customerName: null,
        date: null,
        status: null,
        startTime: null,
        endTime: null
      };
    }

    // Get the first booking (or handle multiple bookings as needed)
    const booking = roomBookings[0];
    const customer = customers.find(customer => customer.id === booking.customerId);

    return {
      roomName: room.name,
      customerName: customer ? customer.name : null,
      date: booking.date,
      status: booking.status,
      startTime: booking.startTime,
      endTime: booking.endTime
    };
  });

  res.send(response);
});

// create a new room

roomsRouter.post("/" ,(req , res) => {
    const {body} = req;
    const newRoom = { id: Date.now(), ...body }; 
    rooms.push(newRoom); 
    res.send({ msg: "Room created"})
})


// update a room

roomsRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const index = rooms.findIndex((room) => room.id == id);
    if (index!== -1) {
      rooms[index] = {...rooms[index],...body };
      res.send({ msg: "Room updated" });
    } else {
      res.status(404).send({ msg: "Room not found" });
    }
  });
//delete the room
roomsRouter.delete("/:roomId", (req, res) => {
    const { roomId } = req.params;
  
    const initialLength = rooms.length;
  
    rooms = rooms.filter((room) => room.id !== roomId); 
    if (rooms.length < initialLength) {
      console.log("Room deleted");
      res.send({ msg: "Room deleted" });
    } else {
      console.log("Room not found");
      res.status(404).send({ msg: "Room not found" });
    }
  });

export default  roomsRouter;
