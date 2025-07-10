import serverInstance from ".";


export const addToMailingList = async (email) => {
  try {
    const response = await serverInstance.post('/mailinglist', { email });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add email to mailing list: ${error.message}`);
  }
};