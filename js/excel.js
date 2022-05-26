"use strict"

function readExcel(files) {
    let fr = new FileReader();
    fr.onload = () => {
        let xls = XLSX.read(fr.result)
        pagination(xls.SheetNames)
        let html = [];
        xls.SheetNames.map((name) => {
            let converted = XLSX.utils.sheet_to_html(xls.Sheets[name])
            html.push(converted)
        })
        fileViewer.innerHTML = ``;
        fileViewer.innerHTML = html.join("");
        for (let i = 0; i < html.length; i++) {
            document.querySelectorAll("table")[i].id = `table${i}`;
        }
        document.querySelector("#dummy").click();
    }
    fr.readAsArrayBuffer(files[0])
}