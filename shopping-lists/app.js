import { serve } from "./deps.js";
import { configure } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listController from "./controllers/listController.js";
import * as itemEntryController from "./controllers/itemEntryController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return listController.toMain(request);
  } else if (
    url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST"
  ) {
    return await listController.deactivateList(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listController.viewList(request);
  } else if (
    url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") &&
    request.method === "POST"
  ) {
    return await itemEntryController.finishItemEntry(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "POST") {
    return await itemEntryController.createItemEntry(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
