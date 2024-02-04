// Initialize function called when the script loads
function initialize(){
    createTable();
    debugAjax();
};

// Function to create a table with cities and their populations
function createTable(){
	// Create an array named 'cityPop' to store city-population pairs
	let cityPop = [
		{
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];
	// Create a table element
	let table = document.createElement("table");

    // Create a header row
    let headerRow = document.createElement("tr");

    // Add the "City" and "Population" columns to the header row
    headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>")

    // Add the row to the table
    table.appendChild(headerRow);

    // Loop to add a new row for each city
    for (let i = 0; i < cityPop.length; i++){
        // Assign longer html strings to a variable
        let rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population.toLocaleString() + "</td></tr>";
        // Add the row's html string to the table
        table.insertAdjacentHTML('beforeend',rowHtml);
    };
	// Append the table to the mydiv element in the dom
    document.querySelector("#mydiv").appendChild(table);

	// Function to add a "City Size" column to the HTML table based on population data.
	function addColumns(cityPop) {
		// Select all table rows and iterate through them:
		document.querySelectorAll("tr").forEach(function(row, i) {
			// If it's the header row, add the column header:
			if (i == 0 ) {
				row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
			// For all other rows use population to create a new City Size variable based on population data
			} else {
				// Access population data for the current row:
				const population = cityPop[i-1].population;
				// Determine city size based on population thresholds:
				let citySize;
				if (population < 100000){
					citySize = 'Small';
				} else if (population < 500000){
					citySize = 'Medium';
				} else {
					citySize = 'Large';
				}
				// Add the data for the City Size
				row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>'); // insert the city size to the table
			}
		});
	}
	// Function to add event listeners to the table for interactive effects
	function addEvents() {
		// Select the table element and add a "mouseover" event listener:
		document.querySelector("table").addEventListener("mouseover", function(){
			// Generate a random RGB color string and initialize the color string with the start of an RGB color.
			let color = "rgb(";
			for (let i=0; i<3; i++){
				// Generate a random number between 0 and 255.
				let random = Math.round(Math.random() * 255);
				// Append the random variable  (not the string "random")
				color += random;
				// If this is not the last loop iteration, append a comma.
				if (i<2){
					color += ",";
				// If this is the last loop iteration, append a closing parenthesis.
				} else {
					color += ")";
				}
			}
			// Change the background color of the table to the generated color.
			document.querySelector("table").style.backgroundColor = color; // Change the background color of the table
		});

		// Function to be called when the table is clicked.
		function clickme(){
			// Show an alert saying "Hey, you clicked me!".
			alert('Hey, you clicked me!');
		};
		// Add a "click" event listener to the table, which calls the clickme function.
		document.querySelector("table").addEventListener("click", clickme);
	}
	// Call the addColumns function to add the "City Size" column to the table.
	addColumns(cityPop);
	// Call the addEvents function to add the event listeners to the table.
	addEvents();
}

// Function to fetch data from "../data/MegaCities.geojson" using Fetch API and display it on the page
function debugAjax(){
    // Initiate Fetch request to retrieve data from the specified GeoJSON file
    fetch("../data/MegaCities.geojson")
        // The fetch API returns a Promise that resolves to the Response to that request.
        .then(function(response){
            // Parse the response as JSON
            return response.json();
        })
        // Once the Promise is resolved, the resulting data is passed to the debugCallback function.
        .then(function (data){
            debugCallback(data);
        })
};
// The debugCallback function is responsible for displaying the fetched data on the webpage.
function debugCallback(response){
    // Select the HTML element with the id "myData".
    // Use the insertAdjacentHTML method to insert the formatted JSON data at the end of this element.
    // The JSON.stringify method is used to convert the JavaScript object into a string. The third argument is used to add whitespace and indentation to the resulting string for readability.
    document.querySelector("#myData").insertAdjacentHTML('beforeend', '<h3>GeoJSON data:</h3><pre> ' + JSON.stringify(response, null, 2) + '</pre>');
};

// Call the initialize function when the DOM has loaded
document.addEventListener('DOMContentLoaded',initialize)

