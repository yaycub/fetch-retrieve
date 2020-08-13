import fetch from "../util/fetch-fill.js";
import URI from "urijs";
// offloaded parse functions to a utils file for cleaner code
import { 
  parseIds, 
  parseOpen, 
  parseClosedPrimaryCount, 
  parsePreviousPage, 
  parseNextPage 
} from "./utils/parseResponse.js";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
const retrieve = (obj) => {
  const options = !obj ? {} : obj;
  
  let page = 1;
  let colors = ['red', 'brown', 'blue', 'yellow', 'green']; 
  if(options.page) page = options.page;
  if(options.colors) colors = options.colors;

  const url = new URI(window.path);
  url.addQuery("offset", (page - 1) * 10).addQuery('limit', 10)
  colors.forEach(color => url.addQuery('color[]', color))

  return fetch(url.normalize()._string)
    .then(res => res.json())
    .then(res => ({
          ids: parseIds(res),
          open: parseOpen(res),
          closedPrimaryCount: parseClosedPrimaryCount(res),
          previousPage: parsePreviousPage(page),
          nextPage: parseNextPage(res, page)
        })
    )
    .catch(err => console.log(err))
}

export default retrieve;
