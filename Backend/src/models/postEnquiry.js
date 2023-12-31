const express = require("express");
const router = express.Router();
const pool = require("../../db");

const createEnquiry = async (data) => {
  const { post_id, user_id, message } = data;
  const result = await pool.query(
    `
    INSERT INTO post_enquiries (post_id, user_id, message)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
    [post_id, user_id, message]
  );

  return result.rows[0];
};

const getEnquiryById = async (enquiry_id) => {
  const result = await pool.query(
    `
    SELECT * FROM post_enquiries WHERE enquiry_id = $1;
  `,
    [enquiry_id]
  );

  return result.rows[0];
};

// models/postRegistration.js

module.exports = {
  createEnquiry,
  getEnquiryById,
};
