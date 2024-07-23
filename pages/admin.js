export default async function admin() {
    return `
    <div id="admin">
      <div id="adminButtons">
        <button id="addItem">Add Item</button>
        <button id="editItem">Edit Item</button>
        <button id="deleteItem">Delete Item</button>
      </div>
      <div id="adminInfoContainer"></div>

      <script>
        $("#addItem").on("click", function () {
          window.location.href = "#addItemPage";
        });

        $("#editItem").on("click", function () {
          window.location.href = "#editItemPage";
        });

        $("#deleteItem").on("click", function () {
          window.location.href = "#deleteItemPage";
        });

      
      </script>
    </div>
  `;
}