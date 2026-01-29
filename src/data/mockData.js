// Mock data for BusGo Admin Panel

// Users Data
export let users = [
    {
        id: 1,
        name: "Somchai Phongsavanh",
        email: "somchai@email.com",
        phone: "+856 20 5555 1234",
        role: "customer",
        status: "active",
        registrationDate: "2025-10-15"
    },
    {
        id: 2,
        name: "Noy Vongphachanh",
        email: "noy.v@email.com",
        phone: "+856 20 7777 5678",
        role: "customer",
        status: "active",
        registrationDate: "2025-11-01"
    },
    {
        id: 3,
        name: "Kham Sisavath",
        email: "kham.admin@busgogo.com",
        phone: "+856 20 9999 8888",
        role: "admin",
        status: "active",
        registrationDate: "2025-09-01"
    },
    {
        id: 4,
        name: "Bounmy Keomany",
        email: "bounmy@email.com",
        phone: "+856 20 3333 4444",
        role: "customer",
        status: "inactive",
        registrationDate: "2025-08-20"
    },
    {
        id: 5,
        name: "Vilay Phommachanh",
        email: "vilay@email.com",
        phone: "+856 20 6666 7777",
        role: "customer",
        status: "active",
        registrationDate: "2025-11-20"
    }
];

// Buses Data
export let buses = [
    {
        id: 1,
        name: "Vientaine-Paksun",
        company: "Southern-Bus-station Transport",
        licensePlate: "VTE-1234",
        capacity: 45,
        amenities: ["WiFi", "AC", "Luxury"],
        status: "active",
        phone: "+856 20 7688 0912"
    },
    {
        id: 2,
        name: "Vientaine-Paksun",
        company: "Lao Skyway",
        licensePlate: "PKS-5678",
        capacity: 40,
        amenities: ["AC", "Reclining Seats"],
        status: "active",
        phone: "+856 20 5555 2222"
    },
    {
        id: 3,
        name: "Luang Prabang Express",
        company: "Northern Transport",
        licensePlate: "LPB-9012",
        capacity: 35,
        amenities: ["WiFi", "AC", "Luxury", "Entertainment"],
        status: "active",
        phone: "+856 20 8888 3333"
    },
    {
        id: 4,
        name: "Savannakhet Cruiser",
        company: "Central Line",
        licensePlate: "SVK-3456",
        capacity: 50,
        amenities: ["AC", "Toilet"],
        status: "maintenance",
        phone: "+856 20 4444 5555"
    },
    {
        id: 5,
        name: "Champasak Runner",
        company: "Southern-Bus-station Transport",
        licensePlate: "CPS-7890",
        capacity: 42,
        amenities: ["WiFi", "AC"],
        status: "active",
        phone: "+856 20 6666 8888"
    }
];

// Schedules Data
export let schedules = [
    {
        id: 1,
        route: {
            from: "Vientiane",
            to: "Paksun"
        },
        busId: 1,
        departure: "07:00 AM",
        arrival: "02:30 PM",
        duration: "7h 30m",
        price: 85,
        availableSeats: 20,
        date: "2025-11-29",
        status: "active"
    },
    {
        id: 2,
        route: {
            from: "Vientiane",
            to: "Luang Prabang"
        },
        busId: 3,
        departure: "08:30 AM",
        arrival: "06:00 PM",
        duration: "9h 30m",
        price: 120,
        availableSeats: 15,
        date: "2025-11-29",
        status: "active"
    },
    {
        id: 3,
        route: {
            from: "Paksun",
            to: "Savannakhet"
        },
        busId: 2,
        departure: "09:00 AM",
        arrival: "03:30 PM",
        duration: "6h 30m",
        price: 75,
        availableSeats: 25,
        date: "2025-11-30",
        status: "active"
    },
    {
        id: 4,
        route: {
            from: "Vientiane",
            to: "Champasak"
        },
        busId: 5,
        departure: "06:00 AM",
        arrival: "04:00 PM",
        duration: "10h",
        price: 150,
        availableSeats: 10,
        date: "2025-12-01",
        status: "active"
    },
    {
        id: 5,
        route: {
            from: "Luang Prabang",
            to: "Vientiane"
        },
        busId: 3,
        departure: "07:30 AM",
        arrival: "05:00 PM",
        duration: "9h 30m",
        price: 120,
        availableSeats: 30,
        date: "2025-12-02",
        status: "active"
    }
];

// Bookings Data
export let bookings = [
    {
        id: 1,
        userId: 1,
        scheduleId: 1,
        seats: 2,
        totalPrice: 170,
        paymentStatus: "paid",
        bookingStatus: "confirmed",
        bookingDate: "2025-11-25",
        passengerName: "Somchai Phongsavanh"
    },
    {
        id: 2,
        userId: 2,
        scheduleId: 2,
        seats: 1,
        totalPrice: 120,
        paymentStatus: "paid",
        bookingStatus: "confirmed",
        bookingDate: "2025-11-26",
        passengerName: "Noy Vongphachanh"
    },
    {
        id: 3,
        userId: 5,
        scheduleId: 3,
        seats: 3,
        totalPrice: 225,
        paymentStatus: "pending",
        bookingStatus: "pending",
        bookingDate: "2025-11-27",
        passengerName: "Vilay Phommachanh"
    },
    {
        id: 4,
        userId: 1,
        scheduleId: 4,
        seats: 1,
        totalPrice: 150,
        paymentStatus: "paid",
        bookingStatus: "completed",
        bookingDate: "2025-11-20",
        passengerName: "Somchai Phongsavanh"
    },
    {
        id: 5,
        userId: 2,
        scheduleId: 1,
        seats: 2,
        totalPrice: 170,
        paymentStatus: "refunded",
        bookingStatus: "cancelled",
        bookingDate: "2025-11-22",
        passengerName: "Noy Vongphachanh"
    }
];

// Tickets Data (generated from bookings)
export let tickets = bookings.map(booking => {
    const schedule = schedules.find(s => s.id === booking.scheduleId);
    const bus = buses.find(b => b.id === schedule?.busId);

    return {
        id: `TKT-${String(booking.id).padStart(6, '0')}`,
        bookingId: booking.id,
        userId: booking.userId,
        passengerName: booking.passengerName,
        bus: bus?.name || "Unknown",
        route: schedule ? `${schedule.route.from} → ${schedule.route.to}` : "Unknown",
        date: schedule?.date || "Unknown",
        departure: schedule?.departure || "Unknown",
        seats: booking.seats,
        price: booking.totalPrice,
        status: booking.bookingStatus
    };
});

// Helper functions for CRUD operations
export const getNextId = (array) => {
    return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
};

export const addUser = (user) => {
    const newUser = { ...user, id: getNextId(users) };
    users.push(newUser);
    return newUser;
};

export const updateUser = (id, updates) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        return users[index];
    }
    return null;
};

export const deleteUser = (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};

export const addBus = (bus) => {
    const newBus = { ...bus, id: getNextId(buses) };
    buses.push(newBus);
    return newBus;
};

export const updateBus = (id, updates) => {
    const index = buses.findIndex(b => b.id === id);
    if (index !== -1) {
        buses[index] = { ...buses[index], ...updates };
        return buses[index];
    }
    return null;
};

export const deleteBus = (id) => {
    const index = buses.findIndex(b => b.id === id);
    if (index !== -1) {
        buses.splice(index, 1);
        return true;
    }
    return false;
};

export const addSchedule = (schedule) => {
    const newSchedule = { ...schedule, id: getNextId(schedules) };
    schedules.push(newSchedule);
    return newSchedule;
};

export const updateSchedule = (id, updates) => {
    const index = schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        schedules[index] = { ...schedules[index], ...updates };
        return schedules[index];
    }
    return null;
};

export const deleteSchedule = (id) => {
    const index = schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        schedules.splice(index, 1);
        return true;
    }
    return false;
};

export const updateBooking = (id, updates) => {
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updates };
        // Update corresponding ticket
        const ticketIndex = tickets.findIndex(t => t.bookingId === id);
        if (ticketIndex !== -1 && updates.bookingStatus) {
            tickets[ticketIndex].status = updates.bookingStatus;
        }
        return bookings[index];
    }
    return null;
};

// Dashboard statistics
export const getDashboardStats = () => {
    return {
        totalUsers: users.filter(u => u.status === 'active').length,
        totalBuses: buses.filter(b => b.status === 'active').length,
        totalBookings: bookings.length,
        totalRevenue: bookings
            .filter(b => b.paymentStatus === 'paid')
            .reduce((sum, b) => sum + b.totalPrice, 0),
        pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
        confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length
    };
};
