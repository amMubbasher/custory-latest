import axios from 'axios';

async function downloadImage(url) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      return response.data;
    } catch (error) {
      console.error('Error downloading image:', error);
      throw error;
    }
  }

  export default downloadImage