# College-Attendance-Tracker

This project is a web-based Attendance Management System designed for colleges. Professors can log in, select divisions (e.g., Div A or Div B), mark students as present or absent for any particular day, and view detailed attendance records for each student per month. The system also includes functionality to add or remove students.

## Features

- **Professor Login**: Professors can securely log in to access the system.
- **Division Selection**: Professors can select the division (e.g., Div A or Div B) to manage attendance.
- **Student Management**:
  - Add new students to the database.
  - Remove existing students from the database.
- **Mark Attendance**: Professors can mark students as present or absent for a specific day.
- **Attendance Reports**: Monthly attendance summary for each student is displayed, e.g.,
  - *Jan*: Student Name: Raj Modi - Present 20 days, Absent 2 days.
  - *Jan*: Student Name: Arnav Khanna - Present 22 days, Absent 0 days.

## Technology Stack

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - Bootstrap 5 for responsive design
- **Backend**:
  - Node.js with Express.js framework
- **Database**:
  - SQLite

## Installation

Follow these steps to set up and run the project locally:

### Prerequisites
- Node.js installed on your machine.

### Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install express sqlite3 body-parser cors
   ```

3. Initialize the database:
   - The database (`attendance.db`) will be automatically created and initialized when you run the backend server.

4. Start the backend server:
   ```bash
   node backend.js
   ```

5. Open the application in your browser:
   - Navigate to `http://localhost:3031`.

## Project Structure


```
project-folder/
├──launch.json
├──setup_backend.sh
├── backend.js        
├── attendance.db     
├── attendance.html
├── division.html
├── manage_students.html
├── mark_attendance.html
├── monthly_summary.html       
├── script.js       
├── README.md        
```

## API Endpoints

### Students Management
- **GET** `/students`
  - Fetch all students.
- **POST** `/students`
  - Add a new student.
  - Request body: `{ "name": "<name>", "division": "<division>" }`

### Attendance Management
- **POST** `/attendance`
  - Mark attendance for a student.
  - Request body: `{ "student_id": <id>, "date": "<YYYY-MM-DD>", "status": "Present" | "Absent" }`
- **GET** `/attendance/:student_id`
  - Get attendance records for a specific student.

## Screenshots

### Login Page
![image](https://github.com/user-attachments/assets/21ed9696-0f47-4fdc-aa07-3876230881fe)

### Selecting Division
![image](https://github.com/user-attachments/assets/8ba8a62f-cafe-4750-adae-dace2eaa0596)

### Manage Students
![image](https://github.com/user-attachments/assets/44694a8a-eb41-41be-b314-089421454be9)

### Attendance Marking
![image](https://github.com/user-attachments/assets/18b0f947-6241-4bef-863d-19a23834e3dc)

### Report Generation
![image](https://github.com/user-attachments/assets/825c8021-1bd1-44b8-bc88-7efbb572b468)



