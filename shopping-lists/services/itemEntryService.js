import { sql } from "../database/database.js";

const createItemEntry = async (shopping_list_id, name) => {
  await sql`INSERT INTO
      shopping_list_items (shopping_list_id, name)
      VALUES (${shopping_list_id}, ${name})`;
};

const finishItemEntry = async (id) => {
  await sql`UPDATE shopping_list_items
        SET collected = True WHERE id = ${id}`;
};

const findItemEntries = async (id) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${id} ORDER BY collected, name`;

  if (rows && rows.length > 0) {
    return rows;
  }

  return false;
};

export { createItemEntry, findItemEntries, finishItemEntry };
