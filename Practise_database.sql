Absolutely! Based on your request, I'll **keep the `users` table as-is** and provide the **revised MySQL schema** for the rest of your portal based on the React routing structure you provided.

---

### ✅ **Final MySQL Schema for Admin-Student Portal**

> 🎯 `users` table remains unchanged. All others revised for your frontend structure.

---

#### **1. `users` Table** ✅ (Unchanged)

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### **2. `rooms` Table** (⛺ Admin Room Management)

```sql
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) UNIQUE,
    capacity INT NOT NULL,
    current_occupants INT DEFAULT 0,
    status ENUM('available', 'full', 'maintenance') DEFAULT 'available'
);
```

---

#### **3. `students` Table** (👨‍🎓 Student Profile + Allotment)

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE, -- Linked to users table
    roll_number VARCHAR(20) UNIQUE,
    room_id INT,
    emergency_contact VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);
```

---

#### **4. `fees` Table** (💸 Student & Admin Fee Pages)

```sql
CREATE TABLE fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('paid', 'unpaid') DEFAULT 'unpaid',
    due_date DATE,
    paid_on DATE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
```

---

#### **5. `maintenance_requests` Table** (🛠️ Both Admin + Student Use)

```sql
CREATE TABLE maintenance_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    title VARCHAR(100),
    description TEXT,
    status ENUM('pending', 'resolved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
```

---

### 📌 Optional Bonus Tables (if needed later)

You can extend with these if your app evolves:

- `notices` (for admin announcements)
- `warden_logs` (for room inspections)
- `room_change_requests` (if students can request moves)

---

### ✅ Sample Queries for App Pages

#### 🔐 **Login**

```sql
SELECT * FROM users WHERE email = ? AND password = ?;
```

#### 🎓 **Student Dashboard**

```sql
SELECT u.name, s.roll_number, r.room_number
FROM students s
JOIN users u ON s.user_id = u.id
LEFT JOIN rooms r ON s.room_id = r.id
WHERE u.id = ?;
```

#### 📊 **Admin Dashboard Stats**

```sql
-- Count of students
SELECT COUNT(*) AS total_students FROM students;

-- Total rooms
SELECT COUNT(*) AS total_rooms FROM rooms;

-- Available beds
SELECT SUM(capacity - current_occupants) AS available_beds FROM rooms;

-- Recent maintenance requests
SELECT * FROM maintenance_requests ORDER BY created_at DESC LIMIT 5;
```

---

### 📦 Next Steps?

Would you like me to:

- ✅ Export all of this as a `.sql` file?
- 🌱 Generate **seed data** for testing (users, rooms, students, etc)?
- 🛠️ Help you build a basic **admin dashboard page** in React?

Let me know what you want next!