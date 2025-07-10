export const getImageLinkFromTemplate = async (content,store) => {
  await store.loadJSON(content);
  const img = await store.toDataURL();
  return img;
};


