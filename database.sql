-- 1. Create the database (you can change the name if you want)
CREATE DATABASE hostel_management;

-- 2. Use the database
USE hostel_management;

-- 3. Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('student') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from users;



CREATE TABLE student_profiles (
  user_id INT,
  roll_number VARCHAR(50),
  emergency_contact VARCHAR(50),
  address TEXT,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

select * from student_profiles;



CREATE TABLE hostels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    type ENUM('boys', 'girls', 'co-ed') NOT NULL,
    total_rooms INT DEFAULT 0,
    address TEXT,
    warden_name VARCHAR(100),
    contact_number VARCHAR(20),
    facilities TEXT, -- e.g. WiFi, Mess, Laundry
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from hostels;



CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hostel_id INT,
    room_number VARCHAR(10),
    capacity INT,
    current_occupants INT DEFAULT 0,
    status ENUM('available', 'full') DEFAULT 'available',
    room_type ENUM('single', 'double', 'triple') DEFAULT 'double',
    fee_per_month DECIMAL(10,2),
    floor_number INT,
    FOREIGN KEY (hostel_id) REFERENCES hostels(id)
);

select * from rooms;



CREATE TABLE hostel_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    email VARCHAR(100),
    mobile VARCHAR(20),
    gender ENUM('male', 'female', 'other'),
    dob DATE,
    address TEXT,
    college_name VARCHAR(150),
    university VARCHAR(150),
    course VARCHAR(100),
    year INT,
    tenth_percent VARCHAR(10),
    twelfth_percent VARCHAR(10),
    other_qualification TEXT,
    hostel_id INT,
    room_id INT,
    application_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (hostel_id) REFERENCES hostels(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

select * from hostel_applications;



CREATE TABLE fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    hostel_id INT,
    room_id INT,
    fee_month VARCHAR(20), -- e.g. "April 2025"
    amount_due DECIMAL(10,2),
    amount_paid DECIMAL(10,2),
    payment_date DATE,
    payment_status ENUM('paid', 'unpaid', 'partial') DEFAULT 'unpaid',
    payment_mode ENUM('cash', 'online', 'upi', 'card'),
    transaction_id VARCHAR(100),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (hostel_id) REFERENCES hostels(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

select * from fees;



CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    hostel_id INT,
    room_id INT,
    subject VARCHAR(100),
    description TEXT,
    status ENUM('pending', 'in progress', 'resolved', 'closed') DEFAULT 'pending',
    raised_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_on TIMESTAMP NULL,
    admin_remark TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (hostel_id) REFERENCES hostels(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

select * from complaints;

