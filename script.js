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

function sortPublications(publications) {
  return publications.sort((a, b) => {
    return a.Year - b.Year;
  });
}

// Finally, you can use the sorted array of publications to build the HTML for the publications section.

function buildPublicationsHTML(publications) {
  let html = '';
  for (const publication of publications) {
    html += `
      <li class="publication">
        <span class="publication-title">${publication.Title}</span>
        <span class="publication-authors">${publication.Authors}</span>
        <span class="publication-details">
          ${publication.Publication}, ${publication.Volume}(${publication.Number}), ${publication.Pages}, ${publication.Year}
        </span>
      </li>
    `;
  }
  return html;
}

window.onload = function() {

  // URL of the CSV file
  const csvUrl = 'publications.csv';

  // Load the CSV file using the fetch function
  fetch(csvUrl)
    .then(response => response.text())
    .then(csvString => {
    // Parse the CSV string into an array of objects
      const publications = parseCSV(csvString);
      const sortedPublications = sortPublications(publications);
      const publicationsHTML = buildPublicationsHTML(sortedPublications);
      document.getElementById('publication-list').innerHTML = publicationsHTML;
    })
    .catch(error => {
    // Handle any errors that might occur
    console.error(error);
    });
};