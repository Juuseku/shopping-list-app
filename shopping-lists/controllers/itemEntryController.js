import * as itemEntryService from "../services/itemEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createItemEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const formData = await request.formData();
  const name = formData.get("name");

  await itemEntryService.createItemEntry(urlParts[2], name);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const finishItemEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await itemEntryService.finishItemEntry(urlParts[4]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const findItemEntries = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await itemEntryService.findItemEntries(urlParts[2]);
};

export { createItemEntry, findItemEntries, finishItemEntry };
