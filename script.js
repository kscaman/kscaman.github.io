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
      <li>
        <span class="date-one">${publication.Year}</span>
        <p>${publication.Title}. <i>${publication.Authors}</i>. <span class="place">${publication.Publication}</span>, `;
    if (publication.Volume != null) {
      html += `${publication.Volume}, `;
    }
    if (publication.Number != null) {
      html += `${publication.Number}, `;
    }
    if (publication.Pages != null) {
      html += `${publication.Pages}, `;
    }
    html += `${publication.Year}.</p>
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
	csvString = `Authors,Title,Publication,Volume,Number,Pages,Year,Publisher
John Smith,Paper 1,Journal of Science,10,1,100-200,2010,Science Inc.
Jane Doe,Paper 2,Journal of Science,10,2,201-300,2011,Science Inc.
John Smith,Paper 3,Journal of Technology,,,,2012,`;
    const publications = parseCSV(csvString);
    const sortedPublications = sortPublications(publications);
    const publicationsHTML = buildPublicationsHTML(sortedPublications);
    document.getElementById('publication-list').innerHTML = publicationsHTML;
    });
};
