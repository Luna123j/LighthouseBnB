INSERT INTO
  users (name, email, PASSWORD)
VALUES
  (
    'Eva Stanley',
    'sebastianguerra@ymail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Louisa Meyer',
    'jacksonrose@hotmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Dominic Parks',
    'victoriablackwell@outlook.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Sue Luna',
    'jasonvincent@gmx.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Rosalie Garza',
    'jacksondavid@gmx.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Etta West',
    'charlielevy@yahoo.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Margaret Wong',
    'makaylaweiss@icloud.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );

INSERT INTO
  properties(
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES
  (
    1,
    'Speed lamp',
    'description ',
    'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',
    930.61,
    6,
    4,
    8,
    'Canada',
    '536 Namsub Highway',
    'Sotboske',
    'Quebec',
    28142,
    TRUE
  ),
  (
    2,
    'Blank corner',
    'description ',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    85334,
    0,
    5,
    7,
    'Canada',
    '1650 Hejto Center',
    'Genwezuj',
    'Alberta',
    44583,
    TRUE
  ),
  (
    3,
    'Habit mix ',
    'description ',
    'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg',
    476896,
    2,
    6,
    6,
    'Canada',
    '513 Powov Grove',
    'Jaebvap',
    ' Newfoundland And Labrador',
    63452,
    TRUE
  ),
  (
    4,
    'Headed know',
    'description ',
    'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    9675,
    1,
    2,
    0,
    'Canada',
    '1392 Gaza Junction',
    'Upetafpuv',
    'Ontario',
    87426,
    TRUE
  ),
  (
    4,
    'Fun glad',
    'description ',
    'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg',
    32574.34,
    5,
    2,
    5,
    'Canada',
    '340 Dokto Park',
    'Upfufa',
    'Newfoundland And Labrador',
    27642,
    TRUE
  );

INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 1, 1),
  ('2019-01-04', '2019-02-01', 2, 2),
  ('2021-10-01', '2021-10-14', 3, 3),
  ('2014-10-21', '2014-10-21', 4, 6),
  ('2016-07-17', '2016-08-01', 5, 1),
  ('2018-05-01', '2018-05-27', 3, 5),
  ('2022-10-04', '2022-10-23', 3, 4);

INSERT INTO
  property_reviews(
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES
  (1, 1, 8, 3, 'message'),
  (2, 2, 9, 4, 'message'),
  (3, 3, 11, 4, 'message'),
  (6, 4, 10, 5, 'message');