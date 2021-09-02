// Get Book List Container
const container = document.getElementById("booksContainer");

// Search Book Button Click
const searchBook = () => {
  //Total Book Found clear
  document.getElementById("totalSearchFound").innerText = "";
  // get searched text
  const searchedFor = document.getElementById("search-text");
  const searchText = searchedFor.value;

  if (searchText == "") {
    container.innerHTML = `
        <h3 class="position-absolute w-100 fw-bold text-center text-white d-flex align-items-center justify-content-center" style='height:200px'>

            Empty Input..!

        </h3>`;
  } else {
    container.innerText = "";
    //Get API

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => showData(data));
  }
};
const showData = (data) => {
  //Total Book Found show
  const totalBookFound = document.getElementById("totalSearchFound");
  totalBookFound.innerText = `We Found Total ${data.numFound} Book by Your Search`;

  // Create Div and Show Book List
  const bookArray = data.docs;
  bookArray.forEach((book) => {
    // create a div
    const div = document.createElement("div");

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
                <small style="font-size:10px" class="mt-2">Click to see details</small>
            </h4>
        </div>`;
    // Add div
    container.appendChild(div);
  });

  //Modal - Book Details Show
  const showDetails = (book) => {
    document.getElementById("modal-book-name").innerHTML = book.title;

    document.getElementById("modal-book-details").innerHTML = `
        <div>
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        </div>
        <div class="row row-cols-1 my-3">
         
            <div class="col my-2"><b>Title:</b> ${book.title}</div>
            <div class="col my-2"><b>Author Name:</b> ${book.author_name[0]}</div>
            <div class="col my-2"><b>Publish Date:</b> ${book.publish_date}</div>
            <div class="col my-2"><b>First Publish Year:</b> ${book.first_publish_year}</div>
            <div class="col my-2"><b>Publisher:</b> ${book.publisher}</div>
        </div>`;
  };
};
