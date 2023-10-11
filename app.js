console.log("Hey");
//var viz = new tableau.Viz(placeholderDiv, url, options);
let viz;
// reference the placeholder div
const placeholderdiv = document.getElementById("vizContainer");
//get a url
const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-US&:display_count=n&:origin=viz_share_link";

const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};
function initViz() {
  //load viz
  viz = new tableau.Viz(placeholderdiv, url, options);
}
initViz();

//listen for the content to be loaded
document.addEventListener("DOMContentLoaded", initViz);

// buttons
const exportpdfbutton = document.getElementById("exportPDF");

//function to export pdf
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
//image button
const exportimagebutton = document.getElementById("exportimage");
const filterbutton = document.getElementById("FilterButton");

//add event listener for button
exportpdfbutton.addEventListener("click", exportPDFfunction);
filterbutton.addEventListener("click", getRangeValues);

function exportimagefunction() {
  viz.showExportImageDialog();
}

exportimagebutton.addEventListener("click", exportimagefunction);

//filters
// get range values

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // need to get active sheet, but this could be a dashboard or a worksheetconst
  workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //inspect the sheets you need to filter
  console.log(sheets);

  // bring back sheet filter
  const sheetToFilter = sheets[0];
  console.log(sheetToFilter);
  // do the filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("Filtered"));
}
