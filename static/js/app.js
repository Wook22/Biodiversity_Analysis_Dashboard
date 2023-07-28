// URL of the JSON data file
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialize the dashboard
function init() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Use D3 to get sample names and populate the drop-down selector
  d3.json(url).then((data) => {
    // Set a variable for the sample names
    let names = data.names;

    // Add samples to dropdown menu
    names.forEach((id) => {
      // Log the value of id for each iteration of the loop
      console.log(id);

      // Append an option for each sample to the dropdown menu
      dropdownMenu.append("option")
        .text(id)
        .property("value", id);
    });

    // Set the first sample from the list as the default selection
    let sample_one = names[0];

    // Log the value of sample_one
    console.log(sample_one);

    // Build the initial plots based on the first sample
    demo(sample_one);
    barchart(sample_one);
    bubblechart(sample_one);
    gaugechart(sample_one);
  });
}

// Function to create the bar chart
function barchart(select) {
  d3.json(url).then(function(data) {
    // Log the entire data object
    console.log(data);

    // Get the samples data
    let samples = data.samples;

    // Filter data for the selected sample
    let values = samples.filter(x => x.id == select);

    // Get the data for the selected sample
    let value = values[0];

    // Extract necessary values for the bar chart
    let otu_ids = value.otu_ids;
    let otu_labels = value.otu_labels;
    let sample_values = value.sample_values;

    console.log(otu_ids, otu_labels, sample_values);

    // Set top ten items to display in descending order
    let top_ids = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let top_value = sample_values.slice(0, 10).reverse();
    let top_labels = otu_labels.slice(0, 10).reverse();

    // Set up the trace for the bar chart
    let trace1 = {
      x: top_value,
      y: top_ids,
      text: top_labels,
      type: "bar",
      orientation: "h"
    };

    let traceData = [trace1];

    // Setup the layout for the bar chart
    let layout = {
      title: "Top 10 OTUs Present"
    };

    // Call Plotly to plot the bar chart
    Plotly.newPlot("bar", traceData, layout);
  });
}

// Function to create the bubble chart
function bubblechart(select) {
  d3.json(url).then(function(data) {
    // Log the entire data object
    console.log(data);

    // Get the samples data
    let samples = data.samples;

    // Filter data for the selected sample
    let values = samples.filter(x => x.id == select);

    // Get the data for the selected sample
    let value = values[0];

    // Extract necessary values for the bubble chart
    let otu_ids = value.otu_ids;
    let otu_labels = value.otu_labels;
    let sample_values = value.sample_values;

    console.log(otu_ids, otu_labels, sample_values);

    // Set up the trace for the bubble chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };

    let traceData = [trace1];

    // Setup the layout for the bubble chart
    let layout = {
      title: "Bacteria Per Sample",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };

    // Call Plotly to plot the bubble chart
    Plotly.newPlot("bubble", traceData, layout);
  });
}

// Function to display metadata information
function demo(select) {
  d3.json(url).then(function(data) {
    // Log the entire data object
    console.log(data);

    // Get the metadata
    let metadata = data.metadata;

    // Filter metadata for the selected sample
    let values = metadata.filter(x => x.id == select);

    console.log(values);

    // Get the data for the selected sample
    let value = values[0];

    // Clear out any previous metadata
    d3.select("#sample-metadata").html("");

    // Use Object.entries to add each key/value pair to the metadata panel
    Object.entries(value).forEach(([key, value]) => {
      // Log the individual key/value pairs as they are being appended to the metadata panel
      console.log(key, value);

      // Append each key-value pair to the metadata panel
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
}

// Function to create the gauge chart
function gaugechart(select) {
  // Use D3 to retrieve all of the data
  d3.json(url).then(function(data) {
    // Retrieve all metadata
    let metadata = data.metadata;

    // Filter based on the value of the sample
    let values = metadata.filter(result => result.id == select);

    // Log the array of metadata objects after they have been filtered
    console.log(values);

    // Get the first index from the array
    let value = values[0];

    // Use Object.entries to get the key/value pairs and put into the demographics box on the page
    let washFrequency = Object.values(value)[6];

    // Set up the trace for the gauge chart
    let trace1 = {
      value: washFrequency,
      domain: { x: [0, 1], y: [0, 1] },
      title: {
        text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
        font: { color: "black", size: 16 }
      },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 10], tickmode: "linear", tick0: 2, dtick: 2 },
        bar: { color: "black" },
        steps: [
          { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
          { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
          { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
          { range: [3, 4], color: "rgba(202, 209, 95, .5)" },
          { range: [4, 5], color: "rgba(184, 205, 68, .5)" },
          { range: [5, 6], color: "rgba(170, 202, 42, .5)" },
          { range: [6, 7], color: "rgba(142, 178, 35 , .5)" },
          { range: [7, 8], color: "rgba(110, 154, 22, .5)" },
          { range: [8, 9], color: "rgba(50, 143, 10, 0.5)" },
          { range: [9, 10], color: "rgba(14, 127, 0, .5)" },
        ]
      }
    };

    let traceData = [trace1];

    // Set up the Layout for the gauge chart
    let layout = {
      width: 400,
      height: 400,
      margin: { t: 0, b: 0 }
    };

    // Call Plotly to plot the gauge chart
    Plotly.newPlot("gauge", traceData, layout);
  });
}

// Function that updates dashboard when sample is changed
function optionChanged(select) {
  // Log the new value
  console.log(select);

  // Call all functions to update the visualizations with the data corresponding to the selected sample
  demo(select);
  barchart(select);
  bubblechart(select);
  gaugechart(select);
}

// Call the initialize function to start the visualization process
init();
