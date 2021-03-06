use mediconcen_demo;

-- Reset all tables
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE CONSULTATION_FOLLOW_UP;
TRUNCATE CONSULTATION_MEDICATION;
TRUNCATE CONSULTATION_DIAGNOSIS;
TRUNCATE CONSULTATION_INFO;
TRUNCATE MEDICATION_UNIT;
TRUNCATE MEDICATION_INFO;
TRUNCATE DIAGNOSIS_INFO;
TRUNCATE PATIENT_INFO;
TRUNCATE DOCTOR_INFO;
TRUNCATE USER_INFO;
SET FOREIGN_KEY_CHECKS = 1;


-- Admin User
INSERT INTO USER_INFO (EMAIL, ENCRYPTED_PASSWORD, PHONE_NO, ADDRESS)
VALUES ('admin@mediconcen.com', '$2a$10$OiqggMgFcFxGemo/BujxMOsYPr7wVO5QBZJdF2ogKLVR7yYRuspyO', '12345678', 'Hong Kong');

-- Doctors
INSERT INTO DOCTOR_INFO (DOCTOR_NAME)
VALUES
('Matthias Giles'),
('Brandon Teller'),
('Stanley Collins'),
('Caleb Jefferson'),
('Noah Buckley'),
('Eleana Cook'),
('Haley White'),
('Janna Robertson'),
('Judy Pitcher'),
('Irene Mckenzie');

-- Patients
INSERT INTO PATIENT_INFO (PATIENT_NAME)
VALUES
('Nestor Cockburn'),
('Bryce Hammer'),
('Leland Leslie'),
('Tom Bowles'),
('Steven Butler'),
('Pablo Teller'),
('Diane Lester'),
('Alexia Harvey'),
('Rebecca Smith'),
('Alyssa Daul'),
('Annie Campbell'),
('Mikaela George');

-- Diagnosis
INSERT INTO DIAGNOSIS_INFO (DIAGNOSIS_NAME)
VALUES
('Cough'),
('Headache'),
('Fever'),
('Stomache'),
('Sore Throat'),
('Diarrhea');

-- Medication Unit
INSERT INTO MEDICATION_UNIT (UNIT)
VALUES
('mg'),
('ml');

-- Medication
INSERT INTO MEDICATION_INFO (MEDICATION_NAME, MEDICATION_UNIT_ID)
VALUES
('Antacid', 1),
('Antibiotic', 1),
('Antipyretic', 1),
('Cough Drop', 1),
('Cough Syrup', 2),
('Painkiller', 1),
('Antidiarrheal', 2);

-- Consultation
INSERT INTO CONSULTATION_INFO (DOCTOR_ID, PATIENT_ID, DATE_TIME, CONSULTATION_FEE)
VALUES
(1, 1, 1609613743000, 300),
(3, 4, 1609899327000, 250),
(2, 6, 1609900314000, 350),
(1, 1, 1613098216000, 220),
(3, 2, 1613099095000, 300),
(4, 1, 1613098216000, 350),
(1, 3, 1618882964000, 240),
(4, 1, 1619491816000, 240);

-- Consultation-Diagnosis

INSERT INTO CONSULTATION_DIAGNOSIS (CONSULTATION_ID, DIAGNOSIS_ID)
VALUES
(1, 1),
(1, 5),
(2, 2),
(3, 1),
(3, 3),
(4, 1),
(5, 1),
(5, 2),
(6, 4),
(7, 1),
(7, 3),
(8, 6);

-- Consultation-Medication
INSERT INTO CONSULTATION_MEDICATION (CONSULTATION_ID, MEDICATION_ID, AMOUNT)
VALUES
(1, 4, 25),
(1, 5, 90),
(2, 6, 60),
(3, 3, 30),
(3, 4, 25),
(3, 2, 30),
(4, 4, 25),
(5, 3, 30),
(5, 5, 90),
(6, 6, 60),
(7, 3, 30),
(7, 4, 25),
(7, 2, 30),
(8, 7, 30);

-- Follow Up
INSERT INTO CONSULTATION_FOLLOW_UP (CONSULTATION_ID, NEXT_CONSULTATION_ID)
VALUES
(1, 4),
(6, 8);