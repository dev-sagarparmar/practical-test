import { pgpHandler as pgp } from '../config/db-connection';

/**
 *
 * @param {String} table
 * @param {Array/JSON} fields
 * @returns {String}
 */
export const create = (table, fields) => {
  if (Array.isArray(fields)) {
    const columns = fields.map(pgp.as.name).join(',');
    const setters = fields.map((field) => `$[${field}]`).join(',');
    return `INSERT INTO ${pgp.as.name(table)} (${columns}) VALUES (${setters}) RETURNING *`;
  }
  const insertQuery = pgp.helpers.insert(
    fields,
    Object.keys(fields),
    table,
  );
  return `${insertQuery} RETURNING *`;
};

/**
 * Update Query
 *
 * @param {String} table
 * @param {JSON/Array} fields
 * @returns {String}
 */
export const update = (table, fields) => {
  if (Array.isArray(fields)) {
    const setters = fields.map((field) => `${pgp.as.name(field)}=$[${field}]`).join(', ');
    return `UPDATE ${pgp.as.name(table)} SET ${setters} WHERE id=${fields[0].id} RETURNING *`;
  }
  const updateQuery = pgp.helpers.update(
    fields,
    Object.keys(fields),
    table,
  );
  return `${updateQuery} WHERE id=${fields.id} RETURNING *`;
};

/**
 * DELETE Query
 *
 * @param {String} table
 * @param {Number/String} id
 * @param {Number/String} key
 * @returns {String}
 */
export const destroy = (table, id, key = null) => `DELETE FROM ${pgp.as.name(table)} WHERE ${key || 'id'}=${id} ${key ? 'RETURNING *' : ''}`;

/**
 *
 * @param {String} table
 * @returns  {String}
 */
export const get = (table) => `SELECT * FROM ${pgp.as.name(table)}`;
