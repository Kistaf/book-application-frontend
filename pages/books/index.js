import Slicer from "./models/Slicer.js";

let slicer;

export const initBooks = () => {
  initPlaceholders();
  const ele = document.getElementById("book_cards");
  const moreContent = document.getElementById("more_btn");
  slicer = new Slicer(ele, moreContent);
  document.getElementById("genre-filter").onchange = handleFilterChange;
};
function initPlaceholders() {
  const htmlArr = `
    <a class="mb-5 mb-lg-0 d-flex flex-column book_card">
      <div class="skeleton skeleton-image"></div>
      <div class="d-flex flex-column mt-2">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>
    </a>
  `.repeat(16);
  document.getElementById("book_cards").innerHTML = DOMPurify.sanitize(htmlArr);
}

async function handleFilterChange() {
  const filter = document.getElementById("genre-filter");
  slicer.filter = filter.value;
  await slicer.getBooks(true);
  if (slicer.filter && document.getElementById("unselect-select") != null) {
    const unselect = document.getElementById("unselect-select");
    unselect.innerHTML = DOMPurify.sanitize(
      "<i class='bi bi-trash-fill text-danger'></i>"
    );
    unselect.onclick = () => {
      filter.value = "genre";
      slicer.filter = null;
      unselect.textContent = "";
      unselect.onclick = null;
      slicer.getBooks(true);
    };
  }
}
