function openBookingForm(service) {
    document.getElementById('bookingModal').style.display = 'flex';
    document.getElementById('service').value = service;
}

function closeBookingForm() {
    document.getElementById('bookingModal').style.display = 'none';
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const datetime = document.getElementById('datetime').value;
    const terms = document.getElementById('terms').checked;

    if (name === '') {
        valid = false;
        document.getElementById('nameError').textContent = 'Name is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        valid = false;
        document.getElementById('emailError').textContent = 'Enter a valid email address';
    }
    if (!/^\d{10}$/.test(phone)) {
        valid = false;
        document.getElementById('phoneError').textContent = 'Phone number must be 10 digits';
    }
    if (new Date(datetime) < new Date()) {
        valid = false;
        document.getElementById('datetimeError').textContent = 'Date & Time must be in the future';
    }
    if (!terms) {
        valid = false;
        document.getElementById('termsError').textContent = 'You must agree to the terms';
    }

    if (valid) {
        const appointment = {
            name: name,
            email: email,
            phone: phone,
            service: document.getElementById('service').value,
            datetime: datetime,
            status: 'Pending'
        };
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        displayAppointments();
        closeBookingForm();
        alert('Your appointment is confirmed!');
    }
});

function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const table = document.getElementById('appointmentsTable');
    table.innerHTML = `
        <tr>
            <th>Customer Name</th>
            <th>Service</th>
            <th>Date & Time</th>
            <th>Status</th>
        </tr>`;
    
    appointments.forEach(appointment => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${new Date(appointment.datetime).toLocaleString()}</td>
            <td>${appointment.status}</td>`;
    });
}

displayAppointments();
