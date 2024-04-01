import axios from 'axios';

const API_URL = 'https://660193f487c91a11641b2b2e.mockapi.io/api/v1';

// Function to fetch all Items from the API
export async function getAllItems() {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return null;
  }
}

// Function to fetch a single Item by ID from the API
export async function getItemById(itemId) {
    try {
      const response = await axios.get(`${API_URL}/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item with ID ${itemId}:`, error);
      return null;
    }
  }


  // Function to delete a item via the API
export async function deleteItem(itemId) {
    try {
      const response = await axios.delete(`${API_URL}/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting item with ID ${itemId}:`, error);
      return null;
    }
  }