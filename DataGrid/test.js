let currentPage = 0;
const itemsPerPage = 10;

function createDataGrid(data, structure) {
  const table = document.createElement('table');
  
  const thead = document.createElement('thead');
  table.appendChild(thead);
  
  const headerRow = document.createElement('tr');
  thead.appendChild(headerRow);
  
  structure.forEach(column => {
    const th = document.createElement('th');
    th.textContent = column.header;
    th.dataset.field = column.field;
    th.addEventListener('click', () => sortData(column.field));
    headerRow.appendChild(th);
  });
  
  const tbody = createTableBody(data, structure);
  table.appendChild(tbody);
  
  const pagination = document.createElement('div');
  
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      const newTbody = createTableBody(data, structure);
      table.replaceChild(newTbody, table.querySelector('tbody'));
    }
  });
  pagination.appendChild(prevButton);
  
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage) - 1) {
      currentPage++;
      const newTbody = createTableBody(data, structure);
      table.replaceChild(newTbody, table.querySelector('tbody'));
    }
  });
  pagination.appendChild(nextButton);
  
  return { table, pagination };
}

function createTableBody(data, structure) {
  const tbody = document.createElement('tbody');
  
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  
  data.slice(start, end).forEach(rowData => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    
    structure.forEach(column => {
      const td = document.createElement('td');
      td.textContent = rowData[column.field];
      td.contentEditable = true;
      tr.appendChild(td);
    });
  });
  
  return tbody;
}

const data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Jim', age: 40 },
    { id: 4, name: 'Jack', age: 35 },
    { id: 5, name: 'Jill', age: 22 },
    { id: 6, name: 'Joe', age: 28 },
    { id: 7, name: 'Jenny', age: 33 },
    { id: 8, name: 'Jerry', age: 38 },
    { id: 9, name: 'Jared', age: 27 },
    { id: 10, name: 'Jessie', age: 32 },
    { id: 11, name: 'Josh', age: 37 },
    { id: 12, name: 'Jasmine', age: 24 },
    { id: 13, name: 'Jude', age: 29 },
    { id: 14, name: 'Jocelyn', age: 34 },
    { id: 15, name: 'Javier', age: 31 },
];

const structure = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Age', field: 'age' },
    { header: 'Country', field: 'country' },
    { header: 'City', field: 'city' },
    { header: 'Street', field: 'street' },
    { header: 'Zip', field: 'zip' },
    { header: 'Phone', field: 'phone' },
    { header: 'Email', field: 'email' },
  // more columns...
];

const { table, pagination } = createDataGrid(data, structure);
document.body.appendChild(table);
document.body.appendChild(pagination);