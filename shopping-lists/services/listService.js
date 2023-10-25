import { sql } from "../database/database.js";

const createNewList = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, name: "Unknown" };
};

const findActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const completeById = async (id) => {
  await sql`UPDATE shopping_lists SET active = False WHERE id = ${id}`;
};

const numberOfLists = async () => {
  const rows = await sql`SELECT COUNT(*) FROM shopping_lists`;
  return parseInt(rows[0].count);
};

const numberOfItems = async () => {
  const rows = await sql`SELECT COUNT(*) FROM shopping_list_items`;
  return parseInt(rows[0].count);
};

export {
  completeById,
  createNewList,
  findActiveLists,
  findById,
  numberOfItems,
  numberOfLists,
};
