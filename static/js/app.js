// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;


    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        opacity: [1, 0.8, 0.6, 0.4],
        size: sample_values,
        },
        text: otu_labels
    };

    let dataBubble = [trace1];

    let layoutBubble = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 1200,
      xaxis: {title: 'OTU ID'},
      yaxis: {title: 'Sample Values'}
    };
    // Render the Bubble Chart
    Plotly.newPlot('bubble', dataBubble, layoutBubble);



    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    
    let slicedSampleValues = sample_values.slice(0, 10).reverse();
    let slicedOtuIds = otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
    let slicedOtuLabels = otu_labels.slice(0, 10).reverse();


    let trace2 = {
      x: slicedSampleValues,
      y: slicedOtuIds,
      type: 'bar',
      orientation: 'h',
      text: slicedOtuLabels
    };
 
    let dataBar = [trace2];
    

    
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let layoutBar = {
      title: 'Top Ten Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' }, 
      yaxis: { title: 'OTU IDs' },
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', dataBar, layoutBar);
    });
  }
  
function updatePlotly(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
  }

// Function to run on page load
function init() {
   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let dropdown = d3.select("#selDataset");
    data.names.forEach((sample) => {
      dropdown.append("option")
        .text(sample)
        .attr("value", sample);
    });
    
 
    dropdown.on("change", function() {
      let newSample = dropdown.property("value");
      updatePlotly(newSample);
    });

    let initialSample = data.names[0];
    buildCharts(initialSample);
    buildMetadata(initialSample);
  });
}
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

    // Get the first sample from the list


    // Build charts and metadata panel with the first sample
    

// Function for event listener
// function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected


 //Initialize the dashboard
init();
