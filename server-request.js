export async function fetchData() {
    try {
      const response = await fetch('./db.json'); 
      if (!response.ok) {
        throw new Error('Failed to fetch menu data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu data:', error);
      throw error;
    }
  }
  
  export async function sendData(menuData) {
    try {
      const response = await fetch('http://localhost:3000/menu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData.menu) 
      });
      if (!response.ok) {
        throw new Error('Failed to send updated data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error sending updated data:', error);
      throw error;
    }
  }
  