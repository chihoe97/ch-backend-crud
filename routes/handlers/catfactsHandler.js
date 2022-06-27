'use strict'

import fetch from "node-fetch";
import pg from 'pg';
import dotenv from 'dotenv'

const config = dotenv.config()
const { Pool } = pg;
const pool = new Pool({
  host: Number(config.parsed.DB_HOST),
  user: config.parsed.DB_USERNAME,
  database: config.parsed.DB_DATABASE,
  password: config.parsed.DB_PASSWORD,
  port: Number(config.parsed.DB_PORT)
});

const functions = {
  getListFromAPI: async function () {
    const path = '/facts';
    const res = await fetch(`${config.parsed.SOURCE_API}${path}`, {
      compress: true,
      timeout: 60e3, // 60s timeout as default
      follow: 0,
      headers: {
        'content-type': 'application/json'
      }
    }).catch(err => {
      console.log('Some error!');
      throw err
    });
    // Return response from external API
    return await res.json();
  },

  getFact: async function () {
    let queryStr = `SELECT * FROM public."catFact" ORDER BY id ASC;`;
    return await pool.query(queryStr).then(data => {
      // return selected rows
      return data && data.rows;
    }).catch(err => {
      console.log('getFact error!');
      return err;
    })
  },

  createFact: async function (desc) {
    let queryStr = `INSERT INTO public."catFact" ("desc") VALUES ('${desc}') ON CONFLICT ("desc") DO NOTHING;`;
    return await pool.query(queryStr).then(data => {
      // return insert result
      return data;
    }).catch(err => {
      console.log('createFact error!')
      return err;
    })
  },

  updateFact: async function (desc, newDesc) {
    let queryStr = `UPDATE public."catFact" SET "desc"= '${newDesc}' WHERE "desc"= '${desc}';`;
    return await pool.query(queryStr).then(data => {
      // return update result
      return data;
    }).catch(err => {
      console.log('updateFact error!');
      return err;
    })
  },

  deleteFact: async function (desc) {
    let queryStr = `DELETE FROM public."catFact" WHERE "desc"= '${desc}';`;
    return await pool.query(queryStr).then(data => {
      // return delete result
      return data;
    }).catch(err => {
      console.log('updateFact error!');
      return err;
    })
  }
}

export default functions;

