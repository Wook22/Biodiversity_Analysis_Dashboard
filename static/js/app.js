const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });


// Call the custom function with filter()
let popularRomans = data.filter(popular);

// Trace for the Roman Data
let trace1 = {
    x: popularRomans.map(row => row.romanName),
    y: popularRomans.map(row => row.romanSearchResults),
    type: "bar"
};

// Data trace array
let traceData = [trace1];

// Apply title to the layout
let layout = {
  title: "Popular Roman gods search results"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);