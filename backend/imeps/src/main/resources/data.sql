INSERT INTO users (username, password, IS_ADMIN, UL_BRANCH)
VALUES ('admin', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1, 2);

INSERT INTO users (username, password, UL_BRANCH)
VALUES ('janesmith', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('emilyjohnson', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1),
       ('michaelbrown', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1),
       ('sarahwilliams', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('hannaaad', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 3);

INSERT INTO countries (name, code)
VALUES ('France', 'FR'),
       ('Italy', 'IT');

INSERT INTO conventions (name, date, attachment)
VALUES ('Convention 1', '2014-06-03', 'attachment 1'),
       ('Convention 2', '2014-06-03', 'attachment 2'),
       ('Convention 2', '2014-06-03', 'attachment 2'),
       ('Convention 2', '2014-06-03', 'attachment 2');

INSERT INTO universities (name, country_id, convention_id)
VALUES ('Polytech Paris', 1, 1),
       ('Mine Saint Etienne', 1, 2),
       ('Telecom Paris', 1, 3),
       ('Torino', 2, 4);

-- Insert students corresponding to the existing users
INSERT INTO students (first_name, last_name, phone_number, std_id, academic_year, department, grade, user_id)
VALUES ('Jane', 'Smith', '1234567891', 1002, 2024, 'Mechanical', 85, 2),
       ('Emily', 'Johnson', '1234567892', 1003, 2024, 'Civil', 88, 3),
       ('Michael', 'Brown', '1234567893', 1004, 2024, 'Petro', 87, 4),
       ('Sarah', 'Williams', '1234567894', 1005, 2024, 'Electrical', 89, 5),
       ('Hanna', 'Aad', '1234567890', 1001, 2024, 'Electrical', 90, 6);

-- Insert programs
INSERT INTO programs (description, type, university_id, submission_date, academic_year, department)
VALUES ('AI Research', 'Masters', 1, '2025-01-10', '2024', 'Electrical'),
       ('Data Science', 'Masters', 2, '2025-02-15', '2024', 'Electrical'),
       ('Quantum Mechanics', 'DD', 3, '2025-03-20', '2024', 'Petro'),
       ('Mechanical Engineering', 'DD', 4, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 1, '2025-05-30', '2024', 'Civil');

-- Associate students with programs (many-to-many relationship)
INSERT INTO program_student (student_id, program_id, status)
VALUES (1, 1, 'pending'),
       (1, 2, 'enrolled'),
       (2, 2, 'enrolled'),
       (2, 3, 'pending'),
       (3, 3, 'rejected'),
       (3, 4, 'pending'),
       (4, 4, 'enrolled'),
       (4, 5, 'pending'),
       (5, 5, 'enrolled'),
       (5, 1, 'pending');

-- Insert scholarships
INSERT INTO scholarships (name, description, duration)
VALUES ('Merit Scholarship', 'Awarded to students with outstanding academic performance', 4),
       ('Research Grant', 'Funding for students conducting groundbreaking research', 2),
       ('Sports Excellence', 'Scholarship for students excelling in sports', 3),
       ('Financial Aid', 'Support for students in financial need', 4),
       ('International Student Grant', 'Aid for international students studying abroad', 2);

INSERT INTO student_scholarship(student_id, scholarship_id)
VALUES (1, 1),
       (2, 2),
       (3, 2);