import ValidateEmail from "./validateEmail";

export const checkoutValidation = (form, setError) => {
  let errObjForm = {};

  if (!form.email) errObjForm.email = "A valid email is required";
  else if (!ValidateEmail(form.email)) errObjForm.email = "Enter a valid email address";
  if (!form.firstName) errObjForm.firstName = "First name is required";
  if (!form.lastName) errObjForm.lastName = "Last name is required";
  if (!form.address) errObjForm.address = "Address is required";
  if (!form.phoneNumber) errObjForm.phoneNumber = "Phone Number is required";
  if (!form.fastService) errObjForm.fastService = "Type of shipping is required";
  if (!form.billingFirstName) errObjForm.billingFirstName = "First name is required";
  if (!form.billingLastName) errObjForm.billingLastName = "Last name is required";
  if (!form.billingAddress) errObjForm.billingAddress = "Address is required";
  if (setError) setError(errObjForm);

  return Object.keys(errObjForm).length === 0
}

export const addProductValidation = (form, setError) => {
  let errObjForm = {};

  if (!form.title) errObjForm.title = "Product name is required";

  if (!form.category) errObjForm.category = "Category is required";

  if (!Array.isArray(form.colours) || form.colours.length === 0) {
    errObjForm.productColorImages = "At least one product color is required";
  } else {
    form.colours.forEach((item, index) => {
      if (!item.frontImage || item.frontImage === 0) {
        errObjForm[`frontColorImage_${index}`] = "Front image is required";
      }
      if (!item.backImage || item.backImage === 0) {
        errObjForm[`backColorImage_${index}`] = "Back image is required";
      }
    });
  }

  if (!Array.isArray(form.price) || form.price.length === 0) {
    errObjForm.productPrice = "At least one unit is required";
  } else {
    form.price.forEach((item, index) => {
      if (!item.endRange || item.endRange === 0) {
        errObjForm[`priceEndRange_${index}`] = "End Range is required";
      }
      if (!item.pricePerUnit || item.pricePerUnit === 0) {
        errObjForm[`productPrice_${index}`] = "Price is required";
      }
    });
  }

  if (!Array.isArray(form.sizes) || form.sizes.length === 0) {
    errObjForm.productSizes = "At least one product size is required";
  } else {
    form.sizes.forEach((size, index) => {
      if (!size) {
        errObjForm[`productSizes_${index}`] = "Product size is required";
      }
    });
  }

  if (form?.isPrintingType && (!Array.isArray(form.printingType) || form.printingType.length === 0)) {
    errObjForm.printingType = "Ensure at least one printing type is added.";
  }

  if (Array.isArray(form.printingType) && form.printingType.length > 0) {
    form.printingType.forEach((item, index) => {
      if (!item.price || item.price < 0) {
        errObjForm[`printingTypes_price_${index}`] = "Price is required";
      }
    });
  }


  if (setError) setError(errObjForm);

  return Object.keys(errObjForm).length === 0;
};
