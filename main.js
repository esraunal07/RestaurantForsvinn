import adminLoginPage from './pages/adminLoginPage.js';
import adminPage from './pages/adminPage.js';
import addItemPage from './pages/addItemPage.js';
import editItemPage from './pages/editItemPage.js';
import deleteItemPage from './pages/deleteItemPage.js';
import { displayMenu } from './app.js';

async function handlePageChange() {
  switch (location.hash) {
    case "#login":
      $('main').html(await adminLoginPage());
      break;
    case "#admin":
      $('main').html(await adminPage());
      break;
    case '#addItemPage':
      $('main').html(await addItemPage());
      break;
    case '#editItemPage':
      $('main').html(await editItemPage());
      break;
    case '#deleteItemPage':
      $('main').html(await deleteItemPage());
      break;
    case '#menu':
      $('main').html(await displayMenu());
      break;
    default:
      $('main').html(await adminPage());
      break;
  }
}

// Trigger handlePageChange when the hash changes or when the page is loaded
window.addEventListener("hashchange", handlePageChange);
window.addEventListener("load", handlePageChange);
