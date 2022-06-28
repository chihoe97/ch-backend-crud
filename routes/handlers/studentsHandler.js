'use strict'

import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

const config = dotenv.config()

// Establish connection
const pool = mysql.createPool({
    connectionLimit : 100,
    host: config.parsed.DB_HOST,
    user: config.parsed.DB_USERNAME,
    database: config.parsed.DB_DATABASE,
    password: config.parsed.DB_PASSWORD,
    debug: false
});

const functions = {
  registerStudents: async function (teacher, students) {
    let queryStr = "INSERT INTO student (student_email, teacher_email, status) VALUES ?";
    let values = [];
    if (students && students.length) {
      students.forEach(e => {
        values.push([e, teacher, true]);
      });
    }
    return await pool.query(queryStr, [values], (err, data) => {
      if(err) {
        throw err;
      }
      return data;
    });
  },

  getCommonStudents: async function (query) {
    let queryStr = `SELECT student_email FROM ${config.parsed.DB_DATABASE}.student WHERE teacher_email = "${query}";`;
   
    return pool.query(queryStr).then(data => {
      // return selected rows
      let studentEmail = [];
      if (data && data[0] && data[0].length) {
        data[0].forEach(e => {
          studentEmail.push(e.student_email)
        })
      }
      return studentEmail;
    }).catch(err => {
      console.log('getCommonStudents error', err);
      throw err;
    })
  },

  suspendStudent: async function (student) {
    let queryStr = `UPDATE ${config.parsed.DB_DATABASE}.student SET status = false WHERE student_email = "${student}";`;

    return pool.query(queryStr).then(data => {
      return data;
    }).catch(err => {
      console.log('suspendStudent error', err);
      throw err;
    })
  },

  retrieveStudentForNoti: async function (teacher, notification) {
    let emailArr = [];
    // Regex to extract email from string, start with @
    if(notification) {
      let regex = /@(\S+)(?!\w)/g;
      let temp = notification.match(regex);
      temp.forEach(e => {
        emailArr.push(e.substring(1)) // remove leading @
      })
    }
    let queryStr = `SELECT student_email FROM ${config.parsed.DB_DATABASE}.student `+ 
    `WHERE (teacher_email = "${teacher}" OR student_email IN ('${emailArr.join("','")}')) AND (status = true);`;

    return pool.query(queryStr).then(data => {
      let studentEmail = [];
      if (data && data[0] && data[0].length) {
        data[0].forEach(e => {
          studentEmail.push(e.student_email)
        })
      }
      return studentEmail;
    }).catch(err => {
      console.log('retrieveStudentForNoti error', err);
      throw err;
    })
  }
}

export default functions;

