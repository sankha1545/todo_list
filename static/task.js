const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

    const noMatchMessage = document.getElementById('no-match-message');


//  Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {

    let noMatch = true; // to check if no match is found

    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        const found = table_data.indexOf(search_data) >= 0;

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');

        if (found) {
            noMatch = false; // Update  if a match is found
        }
    })

    // Show or hide the no match message based on the flag
    noMatchMessage.style.display = noMatch ? 'block' : 'none';


    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#b484fc';
    });
}








// 2. Sorting | Ordering data of HTML table

// Sorting data of HTML table

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.addEventListener('click', () => {
        table_headings.forEach(h => h.classList.remove('active', 'asc', 'desc'));
        head.classList.add('active', sort_asc ? 'asc' : 'desc');

        const columnIndex = i;
        sortTable(columnIndex, sort_asc);
        sort_asc = !sort_asc;
    });
});



function sortTable(column, ascending) {
    const tbody = document.querySelector('tbody');
    const rowsArray = Array.from(tbody.querySelectorAll('tr'));

    const sortedRows = rowsArray.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll('td')[column].textContent.trim();
        const cellB = rowB.querySelectorAll('td')[column].textContent.trim();

        if (column === 0) { 
            return ascending ? parseInt(cellA, 10) - parseInt(cellB, 10) : parseInt(cellB, 10) - parseInt(cellA, 10);
        } else if (column === 3) { 
            return ascending ? new Date(cellA) - new Date(cellB) : new Date(cellB) - new Date(cellA);
        } else if (column === 5) { 
            return ascending ? parseFloat(cellA.substring(1)) - parseFloat(cellB.substring(1)) : parseFloat(cellB.substring(1)) - parseFloat(cellA.substring(1));
        } else {
            
            return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });

    // Reappend sorted rows to tbody
    sortedRows.forEach(row => tbody.appendChild(row));
}













