import { fetchData } from './server-request.js';


export async function displayMenu() {
  try {
    const menuData = await fetchData(); 
    $("#app").empty(); 

    if (!menuData || !menuData.menu) {
      $("#app").append("<p>No menu items available.</p>");
      return;
    }

    const menu = menuData.menu;

    Object.keys(menu).forEach(category => {
      const categoryItems = menu[category];
      $("#app").append(`<h2>${category}</h2>`);

      if (Array.isArray(categoryItems)) {
        categoryItems.forEach(item => {
          const soldOutLabel = item.sold_out ? '<span class="sold-out-label">Sold Out</span>' : '';
          const itemHtml = `
            <div class="menu-item">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <p>Price: ${item.price} SEK</p>
              ${soldOutLabel}
            </div>
          `;
          $("#app").append(itemHtml);
        });
      } else {
        console.error(`Error: ${category} items is not an array.`);
      }
    });
  } catch (error) {
    console.error('Error fetching and displaying menu data:', error);
    
  }
}

$(function () {
  displayMenu();
});
