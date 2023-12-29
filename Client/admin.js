const localhost = `https://librarymanagementsystembackend-production.up.railway.app/p`;
// const localhost = `http://localhost:4000`
const imageInput = document.getElementById('picture');
let nameInput = document.getElementById('name');
let descriptionInput = document.getElementById('description');
let priceInput = document.getElementById('price');
let RtypeInput = document.getElementById('Rtype');
let addRoomBtn = document.getElementById('addRoomBtn');

document.addEventListener('DOMContentLoaded', function () {
});

async function submitForm() {
  const formData = new FormData();
  formData.append('picture', imageInput.value);
  formData.append('name', nameInput.value);
  formData.append('description', descriptionInput.value);
  formData.append('Rtype', RtypeInput.value);
  formData.append('price', priceInput.value);

  try {
      let req = await fetch(`${localhost}/api/books/addBook`, {
          method: 'POST',
          body: (formData)
      });

      if (!req.ok) {
          console.log('Error occurred while uploading data');
      } else {
          const data = await req.json();
          imageInput.value = '';
          nameInput.value = '';
          descriptionInput.value = '';
          RtypeInput.value = '';
          priceInput.value = '';
      }
  } catch (error) {
      console.log(error + 'error occurred');
  }
}
