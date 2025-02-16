INSERT INTO users (username, password, IS_ADMIN, UL_BRANCH)
VALUES ('admin', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1, 2);

INSERT INTO users (username, password, UL_BRANCH)
VALUES ('janesmith@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('emilyjohnson@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1),
       ('michaelbrown@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1),
       ('sarahwilliams@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1),
       ('joannachebib@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('christolioF@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('piakassis@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('emmalhaber@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('hannaaad@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 3);

INSERT INTO countries (name, code)
VALUES ('France', 'FR'),
       ('Italy', 'IT'),
       ('Germany', 'DE'),
       ('Spain', 'ES'),
       ('Portugal', 'PT'),
       ('Netherlands', 'NL'),
       ('Belgium', 'BE'),
       ('Switzerland', 'CH'),
       ('Austria', 'AT'),
       ('Greece', 'GR');

INSERT INTO conventions (name, date, attachment)
VALUES ('Convention 1', '2014-06-03', 'attachment 1'),
       ('Convention 2', '2014-06-03', 'attachment 2'),
       ('Convention 3', '2014-06-03', 'attachment 3'),
       ('Convention 4', '2014-06-03', 'attachment 4'),
       ('Convention 5', '2014-06-03', 'attachment 4'),
       ('Convention 6', '2014-06-03', 'attachment 4'),
       ('Convention 7', '2014-06-03', 'attachment 4'),
       ('Convention 8', '2014-06-03', 'attachment 4'),
       ('Convention 9', '2014-06-03', 'attachment 4'),
       ('Convention 10', '2014-06-03', 'attachment 4'),
       ('Convention 11', '2014-06-03', 'attachment 4'),
       ('Convention 12', '2014-06-03', 'attachment 4'),
       ('Convention 13', '2014-06-03', 'attachment 4'),
       ('Convention 14', '2014-06-03', 'attachment 4'),
       ('Convention 15', '2014-06-03', 'attachment 4'),
       ('Convention 16', '2014-06-03', 'attachment 4'),
       ('Convention 17', '2014-06-03', 'attachment 4'),
       ('Convention 18', '2014-06-03', 'attachment 4'),
       ('Convention 19', '2014-06-03', 'attachment 4'),
       ('Convention 20', '2014-06-03', 'attachment 4'),
       ('Convention 21', '2014-06-03', 'attachment 4'),
       ('Convention 22', '2014-06-03', 'attachment 5'),
       ('Convention 23', '2014-06-03', 'attachment 5'),
       ('Convention 24', '2014-06-03', 'attachment 5'),
       ('Convention 25', '2014-06-03', 'attachment 5'),
       ('Convention 26', '2014-06-03', 'attachment 5'),
       ('Convention 27', '2014-06-03', 'attachment 5'),
       ('Convention 28', '2014-06-03', 'attachment 5'),
       ('Convention 29', '2014-06-03', 'attachment 5'),
       ('Convention 30', '2014-06-03', 'attachment 5'),
       ('Convention 31', '2014-06-03', 'attachment 5'),
       ('Convention 32', '2014-06-03', 'attachment 5'),
       ('Convention 33', '2014-06-03', 'attachment 5');

INSERT INTO universities (name, country_id, convention_id, logo_url)
VALUES
    -- France (country_id = 1)
    ('Polytech Paris', 1, 1,
     'https://yt3.googleusercontent.com/ytc/AIdro_lt0hVfilYsYU9BecVnkNpVLMdbm8GT8XXgqwxJfulZeas=s900-c-k-c0x00ffffff-no-rj'),
    ('Mine Saint Etienne', 2, 2,
     'https://campusnumerique.auvergnerhonealpes.fr/app/uploads/2020/06/logo_minesstetienne.jpg'),
    ('Telecom Paris', 1, 3, 'https://www.telecom-paris.fr/wp-content-EvDsK19/uploads/2024/02/TP-ExEd-RVB-502x660.png'),
    ('Sorbonne University', 4, 4,
     'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Sorbonne_University_logo.svg/1200px-Sorbonne_University_logo.svg.png'),
    ('University of Lyon', 5, 5, 'https://www.universite-lyon.fr/sites/all/themes/ulysse/logo.png'),

    -- Italy (country_id = 2)
    ('Torino', 2, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvoilwUtpnMldTPT9HFwXg4WnYh9zv4DLY0Q&s'),
    ('University of Milan', 2, 5,
     'https://www.unimi.it/sites/default/files/2021-11/Logo%20Unimi%20rosso%20su%20bianco.png'),
    ('Sapienza University of Rome', 2, 6,
     'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Sapienza_University_of_Rome_logo.svg/1200px-Sapienza_University_of_Rome_logo.svg.png'),
    ('University of Bologna', 2, 7,
     'https://www.unibo.it/it/ateneo/logo-e-immagine-coordinata/logo-universita-di-bologna'),

    -- Germany (country_id = 3)
    ('Technical University of Munich', 3, 8,
     'https://www.tum.de/typo3conf/ext/tum_template/Resources/Public/Images/Logo_TUM_blue.svg'),
    ('Heidelberg University', 3, 9,
     'https://www.uni-heidelberg.de/md/zentral/universitaet/logo/logo_uni_hd_englisch_4c.png'),
    ('Humboldt University of Berlin', 3, 10,
     'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Humboldt-Universit%C3%A4t_zu_Berlin.svg/1200px-Humboldt-Universit%C3%A4t_zu_Berlin.svg.png'),

    -- Spain (country_id = 4)
    ('University of Barcelona', 4, 11, 'https://www.ub.edu/web/ub/galeries/imatges/logo_ub/logo_UB.png'),
    ('Complutense University of Madrid', 4, 12, 'https://www.ucm.es/data/cont/media/www/pag-76113/logoUCM.png'),
    ('Autonomous University of Madrid', 4, 13,
     'https://www.uam.es/ss/Satellite?blobcol=urldata&blobheader=image%2Fpng&blobkey=id&blobtable=MungoBlobs&blobwhere=1274486601119&ssbinary=true'),

    -- Portugal (country_id = 5)
    ('University of Lisbon', 5, 14, 'https://www.ulisboa.pt/sites/ulisboa.pt/files/logo_ulisboa.png'),
    ('University of Porto', 5, 15, 'https://sigarra.up.pt/up/pt/web_base.gera_pagina?p_pagina=1005816'),
    ('University of Coimbra', 5, 16, 'https://www.uc.pt/identidade/Marcas_UC_png/UC_H_FundoClaro_EN.png'),

    -- Netherlands (country_id = 6)
    ('University of Amsterdam', 6, 17, 'https://www.uva.nl/en/_images/UvA-logo-horizontal.svg'),
    ('Delft University of Technology', 6, 18, 'https://www.tudelft.nl/static/templates/tudelft/dist/images/logo.svg'),
    ('Leiden University', 6, 19, 'https://www.universiteitleiden.nl/logo/logo-universiteit-leiden.svg'),

    -- Belgium (country_id = 7)
    ('KU Leuven', 7, 20, 'https://www.kuleuven.be/meta/2020/img/logo.svg'),
    ('Ghent University', 7, 21, 'https://www.ugent.be/logo.png'),
    ('Université Libre de Bruxelles', 7, 22, 'https://www.ulb.be/sites/default/files/logo-ulb.png'),

    -- Switzerland (country_id = 8)
    ('ETH Zurich', 8, 23, 'https://ethz.ch/etc/designs/ethz/clientlibs/static/images/ethz_logo_black.svg'),
    ('University of Zurich', 8, 24, 'https://www.uzh.ch/cmsssl/en/logo.html'),
    ('EPFL', 8, 25, 'https://www.epfl.ch/wp-content/themes/wp-theme-2018/assets/svg/epfl-logo.svg'),

    -- Austria (country_id = 9)
    ('University of Vienna', 9, 26, 'https://www.univie.ac.at/typo3conf/ext/unisite/Resources/Public/Images/logo.svg'),
    ('Vienna University of Technology', 9, 27,
     'https://www.tuwien.at/fileadmin/_processed_/c/1/csm_TU_Wien_Logo_2016_3f7f7f7f7f.png'),
    ('University of Innsbruck', 9, 28,
     'https://www.uibk.ac.at/typo3conf/ext/theme_uibk/Resources/Public/Images/logo.svg'),

    -- Greece (country_id = 10)
    ('National and Kapodistrian University of Athens', 10, 29, 'https://en.uoa.gr/logo.png'),
    ('Aristotle University of Thessaloniki', 10, 30, 'https://www.auth.gr/sites/default/files/logo_auth.png'),
    ('University of Patras', 10, 31, 'https://www.upatras.gr/sites/default/files/logo_upatras.png');

-- Insert students corresponding to the existing users
INSERT INTO students (first_name, last_name, phone_number, std_id, academic_year, department, grade, user_id)
VALUES ('Jane', 'Smith', '1234567891', 1002, 2024, 'Mechanical', 85, 2),
       ('Emily', 'Johnson', '1234567892', 1003, 2024, 'Civil', 88, 3),
       ('Michael', 'Brown', '1234567893', 1004, 2024, 'Petro', 87, 4),
       ('Sarah', 'Williams', '1234567894', 1005, 2024, 'Electrical', 89, 5),
       ('Joanna', 'Chebib', '1234567895', 1006, 2024, 'Computer', 92, 6),
       ('Chris', 'Tolio', '1234567896', 1007, 2024, 'Chemical', 84, 7),
       ('Pia', 'Kassis', '1234567897', 1008, 2024, 'Biomedical', 91, 8),
       ('Emma', 'Lhaber', '1234567898', 1009, 2024, 'Telecom', 86, 9),
       ('Hanna', 'Aad', '1234567890', 1001, 2024, 'Electrical', 90, 10);

-- Insert programs
INSERT INTO programs (description, type, university_id, submission_date, academic_year, department)
VALUES ('AI Research', 'Masters', 1, '2025-01-10', '2024', 'Electrical'),
       ('Data Science', 'Masters', 2, '2025-02-15', '2024', 'Electrical'),
       ('Quantum Mechanics', 'DD', 3, '2025-03-20', '2024', 'Petro'),
       ('Mechanical Engineering', 'DD', 4, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 1, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 5, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 6, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 7, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 8, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 9, '2025-10-25', '2024', 'Civil'),
       ('AI Research', 'Masters', 10, '2025-01-10', '2024', 'Electrical'),
       ('Data Science', 'Masters', 11, '2025-02-15', '2024', 'Electrical'),
       ('Quantum Mechanics', 'DD', 12, '2025-03-20', '2024', 'Petro'),
       ('Mechanical Engineering', 'DD', 13, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 14, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 15, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 16, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 17, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 18, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 19, '2025-10-25', '2024', 'Civil'),
       ('Mechanical Engineering', 'DD', 20, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 22, '2025-05-30', '2024', 'Civil'),
       ('Data Science', 'Masters', 1, '2025-02-15', '2024', 'Electrical'),
       ('Quantum Mechanics', 'DD', 23, '2025-03-20', '2024', 'Petro'),
       ('Mechanical Engineering', 'DD', 5, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 15, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 22, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 25, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 31, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 6, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 3, '2025-10-25', '2024', 'Civil'),
       ('Mechanical Engineering', 'DD', 6, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 2, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 1, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 5, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 24, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 25, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 26, '2025-10-25', '2024', 'Civil'),
       ('Mechanical Engineering', 'DD', 27, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 28, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 29, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 30, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 31, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 32, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 33, '2025-10-25', '2024', 'Civil');


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
       (5, 1, 'pending'),
       (6, 6, 'enrolled'),
       (6, 7, 'pending'),
       (7, 7, 'rejected'),
       (7, 8, 'pending'),
       (8, 8, 'enrolled'),
       (8, 9, 'pending'),
       (9, 9, 'enrolled'),
       (9, 10, 'pending');

-- Insert scholarships
INSERT INTO scholarships (name, description, duration)
VALUES
    ('Merit Scholarship', 'Awarded to students with outstanding academic performance', 4),
    ('Research Grant', 'Funding for students conducting groundbreaking research', 2),
    ('Sports Excellence', 'Scholarship for students excelling in sports', 3),
    ('Financial Aid', 'Support for students in financial need', 4),
    ('International Student Grant', 'Aid for international students studying abroad', 2),
    ('Women in STEM', 'Scholarship for female students pursuing STEM fields', 4),
    ('Entrepreneurship Grant', 'Funding for students with innovative business ideas', 2),
    ('Arts and Culture Scholarship', 'Support for students excelling in arts and culture', 3),
    ('Community Service Award', 'Award for students actively involved in community service', 2),
    ('Leadership Scholarship', 'Awarded to students demonstrating exceptional leadership skills', 4);

-- Associate students with scholarships (many-to-many relationship)
INSERT INTO student_scholarship (student_id, scholarship_id, status)
VALUES (1, 1, 'pending'),
       (2, 2, 'rejected'),
       (3, 2, 'accepted'),
       (4, 3, 'pending'),
       (5, 3, 'accepted'),
       (6, 4, 'pending'),
       (7, 4, 'rejected'),
       (8, 5, 'accepted'),
       (9, 5, 'pending'),
       (10, 6, 'accepted'),
       (1, 6, 'pending'),
       (2, 7, 'rejected'),
       (3, 7, 'accepted'),
       (4, 8, 'pending'),
       (5, 8, 'accepted'),
       (6, 9, 'pending'),
       (7, 9, 'rejected'),
       (8, 10, 'accepted'),
       (9, 10, 'pending'),
       (10, 1, 'accepted');