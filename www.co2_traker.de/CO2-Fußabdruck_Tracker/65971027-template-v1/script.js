document.addEventListener("DOMContentLoaded", function () {
    const filterSelect = document.getElementById("filterSelect");
    const filterInput = document.getElementById("filterInput");
    const table = document.getElementById("dataTable");
    
    function filterTable() {
        let selectValue = filterSelect.value;
        let input = filterInput.value.toLowerCase();
        let rows = Array.from(table.getElementsByTagName("tr")).slice(1); // Skip header
        
        rows.forEach(row => {
            let cells = row.getElementsByTagName("td");
            let match = cells[0].textContent.toLowerCase().includes(input) || 
                        cells[1].textContent.toLowerCase().includes(input) || 
                        cells[2].textContent.toLowerCase().includes(input);
            row.style.display = match ? "" : "none";
        });
        
        if (selectValue === "alphabetical") {
            rows.sort((a, b) => a.cells[0].textContent.localeCompare(b.cells[0].textContent));
        } else if (selectValue === "reverse-alphabetical") {
            rows.sort((a, b) => b.cells[0].textContent.localeCompare(a.cells[0].textContent));
        } else if (selectValue === "ascending") {
            rows.sort((a, b) => parseInt(a.cells[2].textContent) - parseInt(b.cells[2].textContent));
        } else if (selectValue === "descending") {
            rows.sort((a, b) => parseInt(b.cells[2].textContent) - parseInt(a.cells[2].textContent));
        }
        rows.forEach(row => table.appendChild(row));
    }
    
    filterSelect.addEventListener("change", filterTable);
    filterInput.addEventListener("keyup", filterTable);
});
