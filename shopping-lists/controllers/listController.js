import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as itemEntryService from "../services/itemEntryService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.createNewList(name);

  return requestUtils.redirectTo("/lists");
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: await listService.findById(urlParts[2]),
    currentListEntry: await itemEntryService.findItemEntries(urlParts[2]),
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findActiveLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await listService.completeById(urlParts[2]);
  return requestUtils.redirectTo("/lists");
};

const toMain = async (request) => {
  const data = {
    lists: await listService.numberOfLists(),
    items: await listService.numberOfItems(),
  };
  return new Response(await renderFile("main.eta", data), responseDetails);
};

export { addList, deactivateList, toMain, viewList, viewLists };
