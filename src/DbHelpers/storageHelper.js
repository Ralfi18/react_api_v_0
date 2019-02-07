export const getData = (table) => {
  if (localStorage && table && localStorage.getItem(table)){
    const localStorageBooks = localStorage.getItem(table);
    return JSON.parse(localStorageBooks);
  } else {
      return false;
  }
};

export const setData = (table, json) => {
  if (localStorage && table && json){
    localStorage.setItem(table,  JSON.stringify(json));
    this.setState({redirect: true});
    return true;
  }
  return false;
};

export const  getToken = () => {
  if (localStorage){
    const localStorageBooks = localStorage.getItem('user') ? localStorage.getItem('user') : null;
    return JSON.parse(localStorageBooks).token || null;
  }
  return null;
};

export const clearUserTable = () => {
  if (localStorage && localStorage.getItem('user')) {
    localStorage.removeItem('user');
  }
};

export const clearData = (table) => {
  if (!localStorage) { return false; }
  if (table && localStorage.getItem(table)) {
    localStorage.removeItem(table);
  } else {
    localStorage.clear();
  }
};
