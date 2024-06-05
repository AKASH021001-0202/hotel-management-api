import express from "express";
import roomsRouter from './router/room.js'; 
import customerRouter from "./router/customer.js";
import bookingRouter from "./router/booking.js";

const server = express();
const port = 8000;

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.use("/rooms", roomsRouter);
server.use("/customers", customerRouter);
server.use("/bookings", bookingRouter);

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
