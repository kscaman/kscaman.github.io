// First, you will need to parse the CSV file into an array of objects, with each object representing a publication.
// Here is an example function that does this using the Papa Parse library:

function parseCSV(csvString) {
  return Papa.parse(csvString, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  }).data;
}

// Next, you can use the array.sort() method to sort the array of publications by year.

function sortItems(list, key1, key2) {
  return list.sort((a, b) => {
    return b[key1] == a[key1] ? 1 - 2 * (a[key2] < b[key2]) : 1 - 2 * (b[key1] < a[key1]);
  });
}

// Finally, you can use the sorted array of publications to build the HTML for the publications section.

function buildPublicationsHTML(publications) {
  let html = '';
  for (const publication of publications) {
	const authors = publication.Authors
						.replace(/\s+/g, '')
						.split(";")
						.filter(s => s != '')
						.map(s => s.split(',').reverse().join(' '))
						.join(", ");
    html += `
      <li>
        <span class="date-one">${publication.Year||''}</span>
        <p>${publication.Title}. <i>${authors}</i>.<br>`;
	const otherInformation = [publication.Publication ? `<span class="place">${publication.Publication}</span>` : null, publication.Volume, publication.Number, publication.Pages, publication.Year];
	html += otherInformation.filter(s => s != null).join(', ') + `.</p>
      </li>
    `;
  }
  return html;
}

function buildStudentsHTML(students) {
  let html = '';
  for (const student of students) {
    html += `
      <li>
        <span class="date">${student.year}</span>
        <p>${student.name} (${student.position}). ${student.place}<br><span class="place">${student.title}</span>.
      </li>
    `;
  }
  return html;
}

function createList(csvUrl, builderHTML, listId, key1, key2) {
  // Load the CSV file using the fetch function
  fetch(csvUrl)
    .then(response => response.text())
    .then(csvString => {
    // Parse the CSV string into an array of objects
      const list = parseCSV(csvString);
      const sortedItems = sortItems(list, key1, key2);
      const listHTML = builderHTML(sortedItems);
      document.getElementById(listId).innerHTML = listHTML;
    })
    .catch(error => {
      // Handle any errors that might occur
      console.error(error);
    });
}

function changePhoto() {
  const photo = document.getElementById("profile-photo");
  if (photo.src.substring(photo.src.lastIndexOf('/')+1) == "profile-photo.jpg"){
    photo.src = "deepfake_sq.jpg";
  } else {
    photo.src = "profile-photo.jpg";
  }
  return false;
}

window.onload = function() {
  createList("data/publications.csv", buildPublicationsHTML, "publication-list", "Year", "Publication");
  createList("data/students.csv", buildStudentsHTML, "student-list", "year", "name");
};
