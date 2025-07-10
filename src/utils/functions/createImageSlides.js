import { getImageLinkFromTemplate } from "./getImageLinkFromTemplate";

export const createImageSlides = async (content, productName,store) => {
  if (content?.length == 0 || !content) throw Error("No Content");
  const imgs = [];
  for (let i = 0; i < content.length; ++i) {
    let item = content[i];
    let url = "https://custory-order.s3.ap-southeast-1.amazonaws.com/";
    url += item.replace('custory-cart/', '');
    imgs.push(url);
  }
  let slides = imgs.map((img) => ({
    title: productName || "Design Viewer",
    src: img,
  }));

  return slides;
};
