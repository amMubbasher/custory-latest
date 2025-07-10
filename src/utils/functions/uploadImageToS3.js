async function uploadImageToS3(presignedUrl, imageData) {
    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: imageData,
        headers: {
          'Content-Type': 'image/jpeg', 
        },
      });
  
      if (response.ok) {
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  export default uploadImageToS3