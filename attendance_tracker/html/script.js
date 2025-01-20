
const BASE_URL = "http://localhost:3031";

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert("Login successful!");
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
        } else {
            alert("Invalid username or password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Failed to login. Please try again.");
    }
}

async function markAttendance() {
    const studentName = prompt("Enter Student Name:");
    const attendanceStatus = prompt("Enter Status (Present/Absent):");

    if (!studentName || !attendanceStatus) {
        alert("Please provide valid details.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/markAttendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentName, attendanceStatus }),
        });

        if (response.ok) {
            alert("Attendance marked successfully!");
            fetchAttendance(); // Refresh attendance records
        } else {
            alert("Failed to mark attendance.");
        }
    } catch (error) {
        console.error("Error marking attendance:", error);
        alert("Failed to mark attendance. Please try again.");
    }
}

async function fetchAttendance() {
    try {
        const response = await fetch(`${BASE_URL}/attendance`, {
            method: "GET",
        });

        if (response.ok) {
            const records = await response.json();
            const attendanceTable = document.getElementById("attendanceTable");

            attendanceTable.innerHTML = "";

            records.forEach((record) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${record.studentName}</td>
                    <td>${record.date}</td>
                    <td>${record.attendanceStatus}</td>
                `;
                attendanceTable.appendChild(row);
            });
        } else {
            alert("Failed to fetch attendance records.");
        }
    } catch (error) {
        console.error("Error fetching attendance:", error);
        alert("Failed to fetch attendance records.");
    }
}

document.getElementById("dashboard").addEventListener("click", fetchAttendance);
