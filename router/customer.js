import express from 'express';
import { bookings, customers, rooms } from './local-variable.js'; 

const customerRouter= express.Router();

// GET ALL CUSTOMER
customerRouter.get('/', (req, res)=>{
    res.send(customers)
})

// List all customers with booked Data with
customerRouter.get("/all-booking-customer", (req, res) => {
    const response = customers.map((customer) => {
        const booking = bookings.find((booking) => booking.customerId === customer.id);
        const room = rooms.find((room) => room.id === booking.roomId);

        return {
            customerName: customer.name,
            roomName: room ? room.name : null,
            date: booking ? booking.date : null,
            startTime: booking ? booking.startTime : null,
            endTime: booking ? booking.endTime : null
        };
    });

    res.send(response);
});






// CREATE  A NEW    CUSTOMER
customerRouter.post('/', (req, res)=>{
    const {body} = req;
    const newCustomer =  { id: `cust${Date.now()}`, ...body };
    customers.push(newCustomer);
    res.send({msg: "Customer created"})
})

// UPDATE A CUSTOMER
customerRouter.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {body} = req;
    const index = customers.findIndex((customer) => customer.id == id);
    customers[index] = {...customers[index],...body};
    res.send({msg: "Customer updated"})
})

// DELETE A CUSTOMER
customerRouter.delete("/:id", (req ,res)=>{
    const {id } =req.params;
    const index = customers.findIndex((customer) => customer.id == id);

if(index !==-1){
    customers.splice(index, 1);
    res.send({msg: "Customer deleted"})
}
 else{
     res.status(404).send({msg: "Customer not found"})
 }
})
export default  customerRouter;