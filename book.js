const container = document.getElementById("booksContainer");

const searchBook = () => {
  // get searched text
  const searchedFor = document.getElementById("search-text");
  const searchText = searchedFor.value;

  if (searchText == "") {
    container.innerHTML = `
        <h3 class="position-absolute w-100 fw-bold text-danger d-flex align-items-center justify-content-center" style='height:200px'>
            Empty Input..!
        </h3>`;
  } else {
    container.innerHTML = `
        <div id="loadingMessage" class="position-absolute w-100 d-flex align-items-center justify-content-center" style='height:250px'>
            <img src="loading.svg">
        </div>`;
    //Get API

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => showData(data));
  }
};
const showData = (data) => {
  //Total Book Found
  const totalBookFound = document.getElementById("totalSearchFound");
  totalBookFound.innerText = `We Found Total ${data.numFound} Book by Your Search`;

  // clear the container field
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }

  if (data.status == 404) {
    container.innerHTML = `
    <h3 class="position-absolute w-100 fw-bold d-flex align-items-center justify-content-center" style='height:200px'>
        No Book Found..!
    </h3>`;
  } else {
    const bookArray = data.docs;
    bookArray.forEach((book) => {
      // create a div
      const div = document.createElement("div");
      div.classList.add("col");

      div.addEventListener("click", () => {
        showDetails(book);
      });

      // Book Picture & Title Add & add a div
      div.innerHTML = `
     <div class="book border rounded"  data-bs-toggle="modal" data-bs-target="#detailsContainer">
      <img height="300" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
   
            <h4 class="text-center text-black fw-bold  bottom-0 w-100 m-0 px-3 pt-5 pb-2 lh-1"
                style="
               ">
                ${book.title}<br>
                <small style="font-size:10px">Click to see details</small>
            </h4>
        </div>`;
      // Add div
      container.appendChild(div);
    });
  }

  //Modal - Book Details Show
  const showDetails = (book) => {
    document.getElementById("modal-book-name").innerHTML = book.title;

    document.getElementById("modal-book-details").innerHTML = `
        <div>
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        </div>
        <div class="row row-cols-1 my-3">
         
            <div class="col my-2"><b>Title:</b> ${book.title}</div>
            <div class="col my-2"><b>Author Name:</b> ${book.author_name}</div>
            <div class="col my-2"><b>Publish Date:</b> ${book.publish_date}</div>
            <div class="col my-2"><b>First Publish Year:</b> ${book.first_publish_year}</div>
            <div class="col my-2"><b>Publisher:</b> ${book.publisher}</div>
        </div>`;
  };
};
