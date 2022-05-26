const paginate = document.querySelector(".paginate");
let fileLength;

function pagination(files) {
    fileLength = files.length;
    if (files.length > 1) {
        let createPagination = Array.from(files).reduce((prev, cur, ind) => {
            let btn = `<a href="#table${ind}"onclick="setId(this.innerText)">${ind}</a>`;
            return prev + btn;
        }, "\r");
        paginate.innerHTML = `
        <a href="#table0" class="prev"onclick="prevEvent(0)">Prev</a>
        ${createPagination}
        <a href="#table0" class="next"onclick="nextEvent(0)">Next</a>
`;
    }

}
let pIndex = 0;
let nIndex = 0;
let prev;
let next;

function prevNextSelector() {
    prev = document.querySelector(".prev");
    next = document.querySelector(".next");
}

function addRemoveAttribute(e) {
    next.href = `#table${e}`
    next.removeAttribute("onclick")
    next.setAttribute("onclick", `nextEvent(${e})`)
    prev.href = `#table${e}`
    prev.removeAttribute("onclick")
    prev.setAttribute("onclick", `prevEvent(${e})`)
}

function nextEvent(event) {
    prevNextSelector();
    let e = parseInt(event)
    nIndex = e;
    if (next.getAttribute("href") != `#table${fileLength-1}`) {
        addRemoveAttribute(nIndex + 1)
    }
}

function prevEvent(event) {
    prevNextSelector();
    let e = parseInt(event)
    nIndex = e;
    if (nIndex != 0) {
        nIndex = nIndex - 1;
        addRemoveAttribute(nIndex)
    }
}

function setId(event) {
    prevNextSelector()
    let e = parseInt(event)
    addRemoveAttribute(e)
}