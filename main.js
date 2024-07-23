import addItem from './pages/addItem.js';
import editItem from './pages/editItem.js';
import deleteItem from './pages/deleteItem.js';
import adminLogin from './pages/adminLogin.js';
import admin from './pages/admin.js'; 
import { displayMenu } from './app.js';

async function handlePageChange() {
  switch (location.hash) {
    case "#login":
      $('main').html(await adminLogin());
      break;
    case "#admin":
      $('main').html(await admin());
      break;
    case '#addItem':
      $('main').html(await addItem());
      break;
    case '#editItem':
      $('main').html(await editItem());
      break;
    case '#deleteItem':
      $('main').html(await deleteItem());
      break;
    case '#menu':
      $('main').html(await displayMenu());
      break;
    default:
      $('main').html(await admin());
      break;
  }
}

// Trigger handlePageChange when the hash changes or when the page is loaded
window.addEventListener("hashchange", handlePageChange);
window.addEventListener("load", handlePageChange);
