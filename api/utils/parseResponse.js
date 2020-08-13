const primaryColorArr = ['red', 'blue', 'yellow'];

export const parseIds = (arr) => {
  if(arr.length === 0) return [];
  return arr.map(item => item.id);
}

export const parseOpen = (arr) => {
  if(arr.length === 0) return [];
  return arr.filter(item => item.disposition === 'open')
    .map(item => ({ ...item, isPrimary: primaryColorArr.includes(item.color)}));
};

export const parseClosedPrimaryCount = (arr) => {
  if(arr.length === 0) return 0;
  return arr.filter(item => item.disposition === 'closed' && primaryColorArr.includes(item.color)).length;
}

export const parsePreviousPage = (page) => {
  if(page === 1) return null;
  return page - 1;
}

export const parseNextPage = (arr, page) => {
  if(arr.length < 10 | page >= 50 | arr.length === 0) return null;
  return page + 1;
}