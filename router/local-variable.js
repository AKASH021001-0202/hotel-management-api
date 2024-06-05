// Initial Data for Rooms
let rooms = [
    {
        id: "room123",
        name: "Conference Room A",
        numberOfSeats: 100,
        amenities: ["Projector", "Whiteboard", "WiFi"],
        pricePerHour: 50,
     
    },
    {
        id: "room124",
        name: "Conference Room B",
        numberOfSeats: 50,
        amenities: ["TV", "WiFi"],
        pricePerHour: 30,
      
    }
];

// Initial Data for Customers
let customers = [
    {
        id: "cust123",
        name: "John Doe",
        email: "info@example.com",
      
       
    },
    {
        id: "cust124",
        name: "wasim",
        email: "enquiry@example.com",
      
     
    },
    {
        id: "cust125",
        name: " Smith",
        email: "enquiry@example.com",
      
    }
];

// Initial Data for Bookings
let bookings = [
    {
        id: "booking123",
        customerId: "cust123",
        roomId: "room123",
        date: "2024-06-15",
        startTime: "10:00",
        endTime: "12:00",
        status: "pending"
    },
    {
        id: "booking124",
        customerId: "cust124",
        roomId: "room124",
        date: "2024-06-15",
        startTime: "10:00",
        endTime: "12:00",
        status: "pending"
    },
    {
        id: "booking125",
        customerId: "cust125",
        roomId: "room124",
        date: "2024-06-15",
        startTime: "10:00",
        endTime: "12:00",
        status: "pending"
    }
];

export { rooms, bookings, customers };
