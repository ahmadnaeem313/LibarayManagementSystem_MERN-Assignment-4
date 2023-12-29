const localhost = "https://librarymanagementsystembackend-production.up.railway.app/";
// const localhost = "http://localhost:4000";
document.addEventListener("DOMContentLoaded", function () {
  loadBooks();
  getBooks();
  document.getElementById("cardContainer").addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("btn-primary")) {
      BookDetails(event);
    }
  });

});



async function loadBooks() {
  let cardContainer = document.getElementById("cardContainer");
  try {
    let response = await fetch(`${localhost}/api/books/fetchBooks`);
    if (!response.ok) {
      cardContainer.innerHTML = "Could not load the rooms";
    } else {
      const data = await response.json();


      for (let i = 0; i < data.length; i++) {
        const rec = data[i];

        let roomsDiv = document.createElement("div");
        roomsDiv.className = "room";
        roomsDiv.setAttribute("data-id", rec._id);
        const dbdate = new Date(rec.date);
        const formattedDate = dbdate.toLocaleDateString();
        let status = rec.reservation ? "Booked" : "Available";
        roomsDiv.innerHTML = `<div class="card mt-5">
        <div class="row g-0">
          <div class="col-lg-4">
            <img src="${rec.picture}" class="img-fluid rounded-start" alt="${rec.name}">
          </div>
          <div class="col-lg-8">
            <div class="card-body">
              <h3 class="card-title">${rec.name}</h3>
              <p class="card-text"><strong>Details:</strong> ${rec.description}</p>
              <p class="card-text"><strong>Type:</strong> ${rec.Rtype}</p>
              <button id="purchaseButton" class="btn btn-grey btn-primary">Buy Now ${rec.price}$</button>
              <div class="d-flex flex-row gap-3 mt-3">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">
                  More Details
                </button>
                <button class='btn btn-danger' onClick="deleteBook('${rec._id}')">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      
        cardContainer.appendChild(roomsDiv);
      }
    }
  } catch (error) { }
}

let modal;
async function BookDetails(event) {
  let btn = event.target;
  let parentDiv = btn.closest(".room");
  let id = parentDiv.getAttribute("data-id");

  try {
    let response = await fetch(`${localhost}/api/books/fetchBook/${id}`);
    if (!response.ok) {
      modalbody.innerHTML = "Could not load the rooms";
    } else {
      const rec = await response.json();

      modal = new bootstrap.Modal(document.getElementById(`exampleModal`));

      let modalBody = modal._element.querySelector(".modal-body");
      modalBody.innerHTML = "";
      let roomDiv = document.createElement("div");
      roomDiv.className = "Proom";
      roomDiv.setAttribute("data-id", rec._id);
      roomsDiv.innerHTML = `<div class="card mt-5">
      <div class="row g-0">
        <div class="col-lg-4">
          <img src="${rec.picture}" class="img-fluid rounded-start" alt="${rec.name}">
        </div>
        <div class="col-lg-8">
          <div class="card-body">
            <h3 class="card-title">${rec.name}</h3>
            <p class="card-text"><strong>Details:</strong> ${rec.description}</p>
            <p class="card-text"><strong>Type:</strong> ${rec.Rtype}</p>
            <button id="purchaseButton" class="btn btn-grey btn-primary">Buy Now ${rec.price}$</button>
            <div class="d-flex flex-row gap-3 mt-3">
              <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">
                More Details
              </button>
              <button class='btn btn-danger' onClick="deleteBook('${rec._id}')">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    

      modalBody.appendChild(roomDiv);


    }
  } catch (error) {
    console.error(error);
  }
}





async function getBooks() {
  try {
    let req = await fetch(`${localhost}/api/books/fetchBooks`, {
      method: "GET",
    });

    const rec = await req.json();

    let Container = document.getElementById('reservationContainer');
    if (Container) {
      Container.innerHTML = "";
      let tableContainer = document.createElement('div');
      tableContainer.className = 'table-responsive'; // Add this class for responsiveness
      let table = document.createElement('table');
      table.className = 'table';
      table.innerHTML = `
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Book Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Delete</th> 
          </tr>
        </thead>
        <tbody></tbody>`;

      if (rec.length > 0) {
        for (let i = 0; i < rec.length; i++) {
          const book = rec[i];
          let row = table.querySelector('tbody').insertRow();
          row.innerHTML = `
            <td>${i + 1}</td>
            <td>${book.name}</td>
            <td>${book.description}</td>
            <td>${book.price}</td>`;
        }
        tableContainer.appendChild(table);
        Container.appendChild(tableContainer);
      } else {
        let noBookMsg = document.createElement('p');
        noBookMsg.innerText = 'No Books in library.';
        Container.appendChild(noBookMsg);
      }
    }

  } catch (error) {
    console.log(error);
  }
}

async function deleteBook(bookId) {
  console.log(bookId)
  const id = bookId;

  const isConfirmed = confirm("Are you sure you want to delete this book?");

  if (!isConfirmed) {
    return;
  }

  try {
    let req = await fetch(`${localhost}/api/books/deleteBook/${id}`, {
      method: 'DELETE'
    });

    const res = await req.json();  // Add await here

    if (res) {
      loadBooks();
      getBooks();
      console.log("Successfully deleted the book");
    } else {
      console.log("Cannot delete the reservation");
    }
  } catch (error) {
    console.log(error);
  }
}






