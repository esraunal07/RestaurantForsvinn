import { fetchData, sendData } from '../server-request.js';

function createSelectOptions(items) {
  const selectOption = '<option value="" disabled selected>Select Item</option>';
  const itemOptions = items.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
  return selectOption + itemOptions;
}

export default async function editItemPage() {
  try {
    // Fetch the current menu data
    const menuData = await fetchData();

    // Extract categories from menu data
    const categories = Object.keys(menuData.menu);

    // Create HTML content for edit item page
    const editItemPageContent = `
        <div id="editItemPage">
            <h2>Edit Item</h2>
            <form id="editItemForm">
                <label for="category">Category:</label>
                <select id="category" name="category">
                    <option value="" disabled selected>Select Category</option>
                    ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
                </select><br><br>
                <label for="item">Item:</label>
                <select id="item" name="item">
                    ${createSelectOptions([])}
                </select><br><br>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br><br>
                <label for="description">Description:</label><br>
                <textarea id="description" name="description" rows="4" cols="50" required></textarea><br><br>
                <label for="price">Price (SEK):</label>
                <input type="number" id="price" name="price" min="0" required><br><br>
                <label for="soldOut">Sold Out:</label>
                <input type="checkbox" id="soldOut" name="soldOut"><br><br>
                <button type="submit">Update Item</button>
            </form>
        </div>
    `;

    // Render the edit item page content
    $('main').html(editItemPageContent);

    // Add event listener for category selection
    $('#category').on('change', function () {
      const selectedCategory = $(this).val();
      const items = menuData.menu[selectedCategory] || [];
      const selectOptions = createSelectOptions(items);
      $('#item').html(selectOptions);
    });

    // Add event listener for item selection
    $('#item').on('change', function () {
      const selectedCategory = $('#category').val();
      const selectedItemId = $(this).val();
      const selectedItem = menuData.menu[selectedCategory].find(item => item.id == selectedItemId);
      
      if (selectedItem) {
        $('#name').val(selectedItem.name);
        $('#description').val(selectedItem.description);
        $('#price').val(selectedItem.price);
        $('#soldOut').prop('checked', selectedItem.sold_out);
      }
    });

    // Add event listener for form submission
    $('#editItemForm').on('submit', async function (event) {
      event.preventDefault();

      const category = $('#category').val();
      const itemId = $('#item').val();

      try {
        const selectedItemIndex = menuData.menu[category].findIndex(item => item.id == itemId);

        if (selectedItemIndex !== -1) {
          menuData.menu[category][selectedItemIndex].name = $('#name').val();
          menuData.menu[category][selectedItemIndex].description = $('#description').val();
          menuData.menu[category][selectedItemIndex].price = parseFloat($('#price').val());
          menuData.menu[category][selectedItemIndex].sold_out = $('#soldOut').prop('checked');

          await sendData(menuData);

          window.location.href = '#admin';
        } else {
          alert('Item not found');
        }
      } catch (error) {
        console.error('Error updating item:', error);
        alert('Error updating item. Please try again later.');
      }
    });
    $('#category').trigger('change');
  } catch (error) {
    console.error('Error fetching menu data:', error);
    alert('Error fetching menu data. Please try again later.');
  }
}

