"use strict"
const fileViewer = document.querySelector(".fileViewer");

function readCsv(files) {
    for (let i = 0; i < files.length; i++) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let result = fileReader.result;
            let parse = result.split(/\r?\n|\r/)
                .reduce((previous, current, index) => {
                    let td = current.split(",")
                        .map(e => `<td>${e}</td>`)
                    return previous + `<tr>${td.join("")}</tr>`;
                }, "\r")
            fileViewer.innerHTML += `<table id="table${i}"><tbody>${parse}</tbody></table>`;
            document.querySelector("#dummy").click();

        }
        fileReader.readAsText(files[i])
    }
}