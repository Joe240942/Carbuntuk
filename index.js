const times = [
  "08:00","09:00","10:00","11:00",
  "12:00","13:00","14:00","15:00",
  "16:00","17:00","18:00"
];

// ดึงข้อมูลจาก localStorage
let bookings = JSON.parse(localStorage.getItem("truckBookings")) || {};

function showSection(id) {
  document.getElementById("schedule").classList.add("hidden");
  document.getElementById("booking").classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");
}

function renderTable() {
  const table = document.getElementById("timeTable");
  const select = document.getElementById("timeSelect");

  table.innerHTML = "";
  select.innerHTML = "";

  times.forEach(time => {
    const isBooked = bookings[time];

    table.innerHTML += `
      <tr>
        <td>${time}</td>
        <td class="${isBooked ? 'booked' : 'free'}">
          ${isBooked ? 'จองแล้ว (' + isBooked + ')' : 'ว่าง'}
        </td>
      </tr>
    `;

    if (!isBooked) {
      select.innerHTML += `<option value="${time}">${time}</option>`;
    }
  });
}

function bookQueue() {
  const time = document.getElementById("timeSelect").value;
  const truck = document.getElementById("truckNo").value.trim();

  if (!time || !truck) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  bookings[time] = truck;
  localStorage.setItem("truckBookings", JSON.stringify(bookings));

  alert("จองคิวเรียบร้อย");
  document.getElementById("truckNo").value = "";

  renderTable();
  showSection("schedule");
}

// โหลดตอนเปิดหน้า
renderTable();
