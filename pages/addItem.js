import { fetchData, sendData } from '../server-request.js';

function generateItemId(menuData) {
  // Extract the menu items from the menuData
  const items = Object.values(menuData.menu).flat();
  const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
  return maxId + 1;
}

export default async function addItemPage() {
  const addItemPageContent = `
        <div id="addItemPage">
            <h2>Add New Item</h2>
            <form id="addItemForm">
                <label for="category">Category:</label>
                <select id="category" name="category">
                    <option value="" disabled selected>Select Category</option>
                    <option value="main_course">main_course</option>
                    <option value="starter">starter</option>
                    <option value="dessert">dessert</option>
                    <option value="drink">drink</option>
                </select><br><br>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br><br>
                <label for="description">Description:</label><br>
                <textarea id="description" name="description" rows="4" cols="50" required></textarea><br><br>
                <label for="price">Price (SEK):</label>
                <input type="number" id="price" name="price" min="0" required><br><br>
                <button type="submit">Add Item</button>
            </form>
        </div>
    `;

  $('main').html(addItemPageContent);

  $('#addItemForm').on('submit', async function (event) {
    event.preventDefault();

    // Extract the form data
    const category = $('#category').val();
    const name = $('#name').val();
    const description = $('#description').val();
    const price = $('#price').val();

    try {
      // Fetch the current menu data
      let menuData = await fetchData();

      // Generate a new ID for the item
      const id = generateItemId(menuData);

      // Create a new item object with the generated ID
      const newItem = {
        id: id,
        category: category,
        name: name,
        description: description,
        price: parseInt(price), 
        sold_out: false //
      };

      menuData.menu[category].push(newItem);

      await sendData(menuData);

      window.location.href = '#admin';
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Please try again later.');
    }
  });
}
