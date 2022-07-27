SELECT
  reservations.id AS id,
  properties.title AS title,
  properties.cost_per_night,
  reservations.start_date AS atart_date,
  avg(property_reviews.rating)
FROM
  reservations
  JOIN properties ON properties.id = property_id
  JOIN property_reviews ON reservations.id = reservation_id
WHERE
  reservations.guest_id = 1
GROUP BY
  reservations.id,
  properties.id
ORDER BY
  start_date
LIMIT
  10