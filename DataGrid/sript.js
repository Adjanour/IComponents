
//This is faster on large array sets since it creates no intermediary arrays and loops over the large array only once
// It is more efficient with a complexity of O(n) and more concise and easier to understand
function findObjectWithMostKeysBetter(arr) {
  if (arr.length === 0) return null; // Return null if the array is empty

  let maxKeysObject = arr[0]; // Start with the first object in the array
  let maxKeys = Object.keys(arr[0]).length; // Get the number of keys in the first object

  // Iterate through the array starting from the second object
  for (let i = 1; i < arr.length; i++) {
    const numKeys = Object.keys(arr[i]).length; // Get the number of keys in the current object
    if (numKeys > maxKeys) {
      // If the current object has more keys than the current max, update the max
      maxKeys = numKeys;
      maxKeysObject = arr[i];
    }
  }

  return maxKeysObject;
}

function findObjectWithMostKeys(arr) {
  if (arr.length === 0) return null; // Return null if the array is empty

  const keyLengths = arr.map((obj) => Object.keys(obj).length); // Get an array of key lengths
  const maxKeysIndex = keyLengths.indexOf(Math.max(...keyLengths)); // Find the index of the maximum key length

  return arr[maxKeysIndex]; // Return the object with the most keys
}

class DataGrid {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.sortAscending = true;
    this.render();
  }

  render() {
    console.log(this.data);
    this.container.innerHTML = "";
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    // Determine the maximum number of columns based on the object with the most keys
    const maxColumns = Object.keys(findObjectWithMostKeys(this.data)).length;

    // Create header cells
    Object.keys(findObjectWithMostKeys(this.data)).forEach((key) => {
      const th = document.createElement("th");
      th.textContent = key;
      th.dataset.column = key;
      th.addEventListener("click", this.handleHeaderClick.bind(this));
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    this.data.forEach((rowData) => {
      const row = document.createElement("tr");

      // Pad the row with empty cells if necessary
      for (let i = 0; i < maxColumns; i++) {
        const cell = document.createElement("td");
        cell.contentEditable = "true"; // Make cell editable
        cell.addEventListener("blur", async (event) => {
          const updatedValue = event.target.textContent;
          const rowIndex = event.target.parentNode.rowIndex; // Example
          const columnIndex = event.target.cellIndex; // Example
          const columnheaders = document.querySelectorAll("th");
          const column = columnheaders[columnIndex].textContent;

        
          // Update the data
          this.data[rowIndex - 1][column] = updatedValue;


          // Save new data to a file
          // create a FileSystemWritableFileStream to write to
          // const writableStream = await fileHandle.createWritable();
          const jsonContent = JSON.stringify(this.data);
          const fileHandler = await window.showSaveFilePicker();
          const writableStream = await fileHandler.createWritable();
          await writableStream.write(jsonContent);
          await writableStream.close()
        
         
          this.render(); // Re-render for immediate visual update
        });
        const key = Object.keys(rowData)[i];
        if (key) {
          cell.textContent = rowData[key];
        } else {
          cell.textContent = ""; // Empty cell
        }
        row.appendChild(cell);
      }

      table.appendChild(row);
    });

    this.container.append(table);
  }

  handleHeaderClick(event) {
    const column = event.target.dataset.column;
    console.log(column);
    const sortAscending = this.sortAscending;
    this.sortAscending = !sortAscending; // Toggle sort order

    this.data.sort((a, b) => {
      // Basic string comparison (needs enhancements)
      if (sortAscending) {
        console.log(a);
        console.log(a[column]);
        return a[column].localeCompare(b[column]);
      } else {
        return b[column].localeCompare(a[column]);
      }
    });

    console.log(this.data);
    this.render(); // Re-render the grid after sorting
  }
  async loadFromFile() {
    try {
      const pickerOpts = {
        types: [
          {
            description: "Json",
            accept: {
              "json/*":[".json"],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
      };
      const [fileHandle] = await window.showOpenFilePicker(pickerOpts)
      const file = await fileHandle.getFile();
      const fileContents = await file.text();
      this.data = JSON.parse(fileContents);
      this.render();
    } catch (error) {
      console.error("Error loading file:", error);
      // Fallback to your initial data or handle the error
    }
  }
}

// Example usage
const container = document.getElementById("datagrid-container");
const data = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Jane", age: 25 },
  { id: 3, name: "Doe", age: 40, gender: "M" },
  { id: 4, name: "Bernard", age: 24 },
  { id: 5, name: "Alice", age: 35, city: "New York" },
  { id: 6, name: "Bob", age: 45, country: "Canada", profession: "Engineer" },
  { id: 7, name: "Emily", age: 28, occupation: "Teacher" },
  { id: 8, name: "David", age: 33, department: "IT", role: "Manager" },
  { id: 9, name: "Sophia", age: 29, language: "Spanish" },
  { id: 10, name: "Michael", age: 42, hobbies: ["reading", "traveling"] },
  {
    id: 11,
    name: "Emma",
    age: 37,
    country: "UK",
    education: { degree: "Masters", field: "Computer Science" },
  },
  {
    id: 12,
    name: "William",
    age: 39,
    department: "Finance",
    experience: "10 years",
  },
  {
    id: 13,
    name: "Olivia",
    age: 31,
    interests: ["music", "photography", "cooking"],
  },
  { id: 14, name: "James", age: 27, city: "Los Angeles", status: "Single" },
  { id: 15, name: "Mia", age: 36, country: "Australia", occupation: "Doctor" },
  {
    id: 16,
    name: "Alexander",
    age: 32,
    language: "French",
    hobbies: ["painting", "gardening"],
  },
  {
    id: 17,
    name: "Charlotte",
    age: 34,
    profession: "Lawyer",
    experience: "8 years",
  },
  {
    id: 18,
    name: "Ethan",
    age: 41,
    city: "Chicago",
    hobbies: ["sports", "cooking"],
  },
  {
    id: 19,
    name: "Ava",
    age: 26,
    country: "France",
    education: { degree: "PhD", field: "Physics" },
  },
  {
    id: 20,
    name: "Benjamin",
    age: 38,
    department: "Marketing",
    role: "Director",
  },
  { id: 21, name: "Amelia", age: 29, interests: ["yoga", "meditation"] },
  { id: 22, name: "Liam", age: 35, city: "Toronto", status: "Married" },
  {
    id: 23,
    name: "Harper",
    age: 30,
    occupation: "Artist",
    experience: "5 years",
  },
  {
    id: 24,
    name: "Lucas",
    age: 31,
    language: "German",
    hobbies: ["music", "reading"],
  },
  { id: 25, name: "Evelyn", age: 37, profession: "Nurse", country: "Canada" },
  {
    id: 26,
    name: "Mason",
    age: 33,
    city: "Vancouver",
    education: { degree: "Bachelor", field: "Business" },
  },
  { id: 27, name: "Abigail", age: 28, hobbies: ["dancing", "cooking"] },
  { id: 28, name: "Logan", age: 34, department: "HR", role: "Recruiter" },
  {
    id: 29,
    name: "Elizabeth",
    age: 40,
    country: "Germany",
    occupation: "Architect",
  },
  {
    id: 30,
    name: "Oliver",
    age: 39,
    language: "Italian",
    hobbies: ["traveling", "photography"],
  },
  { id: 31, name: "Ella", age: 27, profession: "Journalist", city: "London" },
  { id: 32, name: "William", age: 42, country: "Spain", occupation: "Chef" },
  { id: 33, name: "Jackson", age: 29, hobbies: ["surfing", "hiking"] },
  { id: 34, name: "Avery", age: 35, city: "Sydney", status: "Single" },
  {
    id: 35,
    name: "Sofia",
    age: 31,
    occupation: "Pharmacist",
    experience: "7 years",
  },
  {
    id: 36,
    name: "Jack",
    age: 33,
    country: "Japan",
    education: { degree: "Bachelor", field: "Economics" },
  },
  {
    id: 37,
    name: "Madison",
    age: 36,
    language: "Chinese",
    hobbies: ["writing", "painting"],
  },
  { id: 38, name: "Aiden", age: 30, profession: "Consultant", city: "Tokyo" },
  {
    id: 39,
    name: "Chloe",
    age: 32,
    country: "Brazil",
    occupation: "Psychologist",
  },
  { id: 40, name: "Lucy", age: 28, hobbies: ["cooking", "gardening"] },
  { id: 41, name: "Mateo", age: 34, city: "Rio de Janeiro", status: "Married" },
  {
    id: 42,
    name: "Aria",
    age: 31,
    occupation: "Professor",
    experience: "9 years",
  },
  {
    id: 43,
    name: "Grayson",
    age: 35,
    country: "Mexico",
    education: { degree: "PhD", field: "Chemistry" },
  },
  {
    id: 44,
    name: "Eleanor",
    age: 33,
    language: "Russian",
    hobbies: ["skiing", "reading"],
  },
  {
    id: 45,
    name: "Liam",
    age: 29,
    profession: "Software Engineer",
    city: "San Francisco",
  },
  {
    id: 46,
    name: "Emma",
    age: 37,
    country: "India",
    occupation: "Entrepreneur",
  },
  {
    id: 47,
    name: "Penelope",
    age: 36,
    language: "Arabic",
    hobbies: ["traveling", "yoga"],
  },
  { id: 48, name: "Mason", age: 32, city: "Seoul", status: "Single" },
  {
    id: 49,
    name: "Aurora",
    age: 30,
    occupation: "Dentist",
    experience: "6 years",
  },
  {
    id: 50,
    name: "Ethan",
    age: 38,
    country: "South Africa",
    education: { degree: "Masters", field: "Marketing" },
  },
];

const dataGrid = new DataGrid(container, data);
container.addEventListener("click", (event) => {
  event.preventDefault();
  dataGrid.loadFromFile(); // Load data from file if it exists
  if (event.target.tagName === "TH") {
    console.log("TH clicked");
  }
}
);


// const dataGrid = new DataGrid(container, data);
