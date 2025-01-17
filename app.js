console.log("Initialising Tableau Integration");

// Declare a variable to hold the Tableau visualisation
let tableauViz;

// Reference the container div where the Tableau dashboard will be embedded
const placeholderDiv = document.getElementById("vizContainer");

// Specify the URL of the Tableau Public dashboard
const tableauURL = 
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-GB&:display_count=n&:origin=viz_share_link";

// Define configuration options for the visualisation
const tableauOptions = {
  device: "desktop", // Set the device type to desktop
  height: "800px", // Set the height of the visualisation
  width: "1100px", // Set the width of the visualisation
};

// Function to initialise the Tableau visualisation
function initialiseTableauViz() {
  // Load the Tableau visualisation into the specified container
  tableauViz = new tableau.Viz(placeholderDiv, tableauURL, tableauOptions);
}

// Call the initialisation function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initialiseTableauViz);

// Reference the buttons for exporting and filtering functionality
const exportPDFButton = document.getElementById("exportPDF");
const exportImageButton = document.getElementById("exportImage");
const filterButton = document.getElementById("filterButton");

// Function to export the visualisation as a PDF
function exportToPDF() {
  tableauViz.showExportPDFDialog();
}

// Function to export the visualisation as an image
function exportToImage() {
  tableauViz.showExportImageDialog();
}

// Attach event listeners to export buttons
exportPDFButton.addEventListener("click", exportToPDF);
exportImageButton.addEventListener("click", exportToImage);

// Function to apply a range filter to the visualisation
function applyRangeFilter() {
  // Retrieve the minimum and maximum values from the input fields
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;

  // Log the input values for debugging purposes
  console.log("Applying Range Filter:", { minValue, maxValue });

  // Get the active workbook and sheet from the Tableau visualisation
  const workbook = tableauViz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();

  // Check if the active sheet is a dashboard or a worksheet
  const sheets = activeSheet.getWorksheets();

  // Log the available sheets for inspection
  console.log("Sheets Available for Filtering:", sheets);

  // Select the first worksheet to apply the filter
  const sheetToFilter = sheets[0];
  console.log("Sheet Selected for Filtering:", sheetToFilter);

  // Apply the range filter to the specified field
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(() => alert("Filter Applied Successfully"))
    .catch((error) => console.error("Error Applying Filter:", error));
}

// Attach the filter function to the filter button
filterButton.addEventListener("click", applyRangeFilter);
