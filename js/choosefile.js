const csvViewer = document.querySelector(".csv-viewer");
const excelViewer = document.querySelector(".excel-viewer");
const csvSelector = document.querySelector("#csv");
const excelSelector = document.querySelector("#excel");
csvViewer.addEventListener('click', () => {
    csvSelector.click()
})
excelViewer.addEventListener('click', () => {
    excelSelector.click()
})

function validate(files, pattern, name) {

    async function validateCsv() {
        let csvFiles = await Array.from(files).filter((cur, ind) => {
            if (cur.name.match(`${pattern}`)) {
                return cur;
            } else {
                alert(`The file ${cur.name} is not a valid ${name} file okay!`)
            }
        })
        return csvFiles
    }
    if (name === "csv") {
        validateCsv().then(csvFiles => {
            pagination(csvFiles)
            readCsv(csvFiles)
        })
    }
    if (name === "excel") {
        validateCsv().then(csvFiles => {
            readExcel(csvFiles)
        }).catch(err => {
            console.log("oops something wrong happen");
        })
    }

}
// csv
csvViewer.addEventListener("drop", e => {
    e.preventDefault();
    let files = e.dataTransfer.files
    csvViewer.style.backgroundColor = "#009879";
    validate(files, "[^\\s]+(.*?)\\.(csv)$", "csv")
});
["dragend", "dragover", "dragleave", "dragenter"].forEach(type => {
        csvViewer.addEventListener(type, (e) => {
            e.preventDefault();
            csvViewer.style.backgroundColor = "skyblue";

        })
    })
    // excel
excelViewer.addEventListener("drop", e => {
    e.preventDefault();
    let files = e.dataTransfer.files
    excelViewer.style.backgroundColor = "#009879";
    validate(files, "[^\\s]+(.*?)\\.(xls|xlsx)$", "excel")
});
["dragend", "dragover", "dragleave", "dragenter"].forEach(type => {
    excelViewer.addEventListener(type, (e) => {
        e.preventDefault();
        excelViewer.style.backgroundColor = "skyblue";

    })
})
csvSelector.addEventListener('change', (e) => {
    let files = e.target.files
    validate(files, "[^\\s]+(.*?)\\.(csv)$", "csv")
})
excelSelector.addEventListener('change', (e) => {
    let files = e.target.files
    console.log(files);
    validate(files, "[^\\s]+(.*?)\\.(xls|xlsx)$", "excel")
})