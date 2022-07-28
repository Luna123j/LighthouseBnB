const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Client } = require('pg');

const client = new Client({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

client.connect();
// client.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return client
    .query(
      `SELECT * FROM users
    WHERE email = $1;
    `, [email])
    .then((res) => {
      // console.log(res.rows[0]);
      const user = res.rows[0];
      return Promise.resolve(user);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return client
    .query(
      `SELECT * FROM users
      WHERE id = $1;
      `, [id])
    .then((res) => {
      // console.log(res.rows[0]);
      return Promise.resolve(res.rows[0]);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return client
    .query(
      `INSERT INTO users (name,email,password) 
      VALUES ($1,$2,$3)
      RETURNING *;
      `, [user.name, user.email, user.password])
    .then((res) => {
      // console.log(res.rows);
      return Promise.resolve(res.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return client
    .query(
      `SELECT
      reservations.*,
      properties.*,
      reservations.*
    FROM
      reservations
      JOIN properties ON properties.id = property_id
      JOIN property_reviews ON reservations.id = reservation_id
    WHERE
      reservations.guest_id = $1
    GROUP BY
      reservations.id,
      properties.id
    ORDER BY
      start_date
    LIMIT
      $2;
      `, [guest_id, limit])
    .then((res) => {
      // console.log(res.rows);
      return Promise.resolve(res.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
 SELECT properties.*, avg(property_reviews.rating) as average_rating
 FROM properties
 JOIN property_reviews ON properties.id = property_id
 `;

  // 3
  if (Object.keys(options).length > 0) {
    queryString += `WHERE `;

    if (options.city) {
      if (queryParams.length > 0) {
        queryString += ` AND `;
      }
      queryParams.push(`%${options.city}%`);
      queryString += `city LIKE $${queryParams.length} `;
    }

    if (options.owner_id) {
      if (queryParams.length > 0) {
        queryString += ` AND `;
      }
      queryParams.push(`${options.owner_id}`);
      queryString += `owner_id = $${queryParams.length}`;
    }

    if (options.minimum_price_per_night) {
      if (queryParams.length > 0) {
        queryString += ` AND `;
      }
      queryParams.push(`${options.minimum_price_per_night}`);
      queryString += `cost_per_night/100 >= $${queryParams.length}`;
    }

    if (options.maximum_price_per_night) {
      if (queryParams.length > 0) {
        queryString += ` AND `;
      }
      queryParams.push(`${options.maximum_price_per_night}`);
      queryString += `cost_per_night/100 <= $${queryParams.length}`;
    }

    if (options.minimum_rating) {
      if (queryParams.length > 0) {
        queryString += ` AND `;
      }
      queryParams.push(`${options.minimum_rating}`);
      queryString += `rating >= $${queryParams.length}`;
    }
  }


  // 4
  queryParams.push(limit);
  queryString += `
 GROUP BY properties.id
 ORDER BY cost_per_night
 LIMIT $${queryParams.length};
 `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return client.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  console.log(property);
  let valueStr = "";
  const queryParams = [];

  for (let key in property) {
    if (queryParams.length > 0) {
      valueStr += " , ";
    }
    queryParams.push(property[key]);
    valueStr += `$${queryParams.length}`;
  }
  let queryStr = `INSERT INTO properties (${Object.keys(property).toString()}) VALUES (${valueStr});`;

  console.log(queryStr);
  return client
    .query(
      queryStr, queryParams)
    .then((res) => {
      res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addProperty = addProperty;
