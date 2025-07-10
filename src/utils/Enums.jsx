export const phases = [
  {
    heading: "Design Phase",
    radio: [
      { key: "Design rejected", value: "design rejected" },
      { key: "Design pending approval", value: "design pending approval" },
      { key: "Design approved", value: "design approved" },
    ],
  },
  {
    heading: "Production Phase",
    radio: [
      { key: "Production pending ", value: "production pending" },
      { key: "Production started", value: "production started" },
    ],
  },
  {
    heading: "Warehouse Phase",
    radio: [
      { key: "Supplier has delivered order to warehouse", value: "supplier has delivered order to warehouse" },
      { key: "Supplier’s order has arrived at warehouse", value: "supplier’s order has arrived at warehouse" },
      { key: "Warehouse has completed quality check", value: "Warehouse has completed quality check" },
      { key: "Warehouse has dispatched the order", value: "Warehouse has dispatched the order" },
    ],
  },
  {
    heading: "Shipping Phase",
    radio: [
      { key: "Delivery not started", value: "delivery not started" },
      { key: "Delivery in progress", value: "delivery in progress" },
      { key: "Delivery is completed", value: "delivery is completed" },
    ],
  },
  {
    heading: "Order Receive Phase",
    radio: [
      { key: "Pending Order Receive", value: "pending order receive" },
      { key: "Order Received", value: "order received" },
    ],
  },
];

export const buttonsColor = {
  green: ["design approved","production started","Warehouse has dispatched the order","delivery is completed"],
  red: ["design rejected","Warehouse has completed quality check","delivery not started"],
  orange: ["production pending", "design pending approval","delivery in progress","supplier has delivered order to warehouse","supplier’s order has arrived at warehouse","Warehouse has completed quality check"]
};
export const phasesArr = {
  designPhase: ["design approved", "production started", "production pending", "delivery in progress", "delivery not started", "delivery is completed","supplier has delivered order to warehouse","supplier’s order has arrived at warehouse", "Warehouse has dispatched the order", "Warehouse has completed quality check", "order received", "pending order receive"],
  productionPhase: ["production started", "delivery in progress", "delivery not started", "delivery is completed","supplier has delivered order to warehouse","supplier’s order has arrived at warehouse", "Warehouse has dispatched the order", "Warehouse has completed quality check", "order received", "pending order receive"],
  warehousePhase: ["delivery is completed", "delivery in progress", "delivery not started", "Warehouse has dispatched the order", "order received", "pending order receive"],
  shippingPhase: ["delivery is completed", "Warehouse has dispatched the order", "order received", "pending order receive"],
};

export const phasesDisabledArr = {
  designPhase: [],
  productionPhase: ['payment received',"design rejected", "design pending approval"],
  warehousePhase: ['payment received',"design approved", "design rejected", "design pending approval", "production pending"],
  shippingPhase: ['payment received',"design approved", "design rejected", "design pending approval", "production pending", "production started", "Warehouse has completed quality check",,"supplier has delivered order to warehouse","supplier’s order has arrived at warehouse",],
  orderPhase: ['payment received',"design approved", "design rejected", "design pending approval", "production pending", "production started", "delivery in progress", "delivery not started", "Warehouse has dispatched the order", "Warehouse has completed quality check",,"supplier has delivered order to warehouse","supplier’s order has arrived at warehouse"],
};

export const orderPhasesArr= {
designPhase: [ "design approved", "production started", "production pending", "delivery in progress", "delivery not started", "delivery is completed", "supplier has delivered order to warehouse", "supplier’s order has arrived at warehouse", "Warehouse has dispatched the order", "Warehouse has completed quality check", "order received", "pending order receive" ],
productionPhase: [ "production started", "delivery in progress", "delivery not started", "delivery is completed", "supplier has delivered order to warehouse", "supplier’s order has arrived at warehouse", "Warehouse has dispatched the order", "Warehouse has completed quality check", "order received", "pending order receive" ],
shippingPhase:[ 'production started', 'delivery in progress', 'delivery not started',"supplier has delivered order to warehouse", "supplier’s order has arrived at warehouse", "Warehouse has dispatched the order", "Warehouse has completed quality check" ],
}

export const orderPhasesDisabledArr= {
productionPhase:['payment received', 'design rejected', 'design pending approval', 'cancelled', 'refunded' ],
shippingPhase:[ 'payment received', 'design approved', 'design rejected', 'design pending approval', 'production pending' ],
warehousePhase:['payment received', 'production started', 'design approved', 'design rejected', 'design pending approval', 'production pending', 'delivery in progress', 'delivery not started', 'cancelled', 'refunded' ],
orderPhase:['payment received', 'production started', 'design approved', 'design rejected', 'design pending approval', 'production pending', 'delivery in progress', 'delivery not started', 'delivery is completed', "supplier has delivered order to warehouse", "supplier’s order has arrived at warehouse", "Warehouse has dispatched the order", "Warehouse has completed quality check", 'cancelled', 'refunded' ],
}

export const statusConditions = {
  "design approved": ["design approved", "production pending"],
  "production started": ["production started", "Warehouse has completed quality check","supplier has delivered order to warehouse","supplier’s order has arrived at warehouse"],
  "Warehouse has dispatched the order": ["delivery in progress", "delivery not started"],
  "delivery is completed": ["pending order receive"],
};

export const hanldeDaysLeft = (shippingDate) => {
  const today = new Date();
  const shipping = new Date(shippingDate);
  const timeDiff = shipping - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysLeft > 0 ? daysLeft : 0;
};

export const handleItemsLength = (orders) =>{
  const itemsArray = orders.flatMap((order) => order.items);
  const allItems = itemsArray.length;
  const designReview = itemsArray.filter((item) => item.status === "design pending approval").length;
  const designReject = itemsArray.filter((item) => item.status === "design rejected").length;
  const inProduction = itemsArray.filter((item) => item.status === "design approved" || item.status === "production pending").length;
  const deliverToWarehouse = itemsArray.filter((item) => ["production started", "Warehouse has completed quality check","supplier has delivered order to warehouse","supplier’s order has arrived at warehouse"].includes(item.status)).length;
  const reachedWarehouse = itemsArray.filter((item) => ["delivery in progress", "delivery not started", "Warehouse has dispatched the order"].includes(item.status)).length;
  const completed = itemsArray.filter((item) => ["delivery is completed"].includes(item.status)).length; 

  return {allItems, designReview, designReject, inProduction, deliverToWarehouse, reachedWarehouse, completed}
};

export const handleOrdersLength = (orders) =>{
  const allOrders = orders.length;
  const designReviewOrders = orders.filter((order) => order.status === "design pending approval").length;
  const designRejectOrders = orders.filter((order) => order.status === "design rejected").length;
  const inProductionOrders = orders.filter((order) => order.status === "design approved" || order.status === "production pending").length;
  const deliverToWarehouseOrders = orders.filter((order) => ["production started", "Warehouse has completed quality check","supplier has delivered order to warehouse","supplier’s order has arrived at warehouse"].includes(order.status)).length;
  const reachedWarehouseOrders = orders.filter((order) => ["delivery in progress", "delivery not started", "Warehouse has dispatched the order"].includes(order.status)).length;
  const dispatchedOrders = orders.filter((order) => ["delivery is completed", "pending order receive"].includes(order.status)).length;
  const completedOrders = orders.filter((order) => order.status === "order received").length;
  const cancelledOrders = orders.filter((order) => order.status === "cancelled").length;
  const refundedOrders = orders.filter((order) => order.status === "refunded").length;

  return {allOrders, designReviewOrders, designRejectOrders, inProductionOrders, deliverToWarehouseOrders, reachedWarehouseOrders, dispatchedOrders, completedOrders, cancelledOrders, refundedOrders}
}

export const review = ["design pending approval", "design rejected", "design approved", "production started", "production pending", "delivery in progress", "delivery not started", "Warehouse has dispatched the order", "Warehouse has completed quality check", "supplier has delivered order to warehouse", "supplier’s order has arrived at warehouse"];

export const userSidePhases= ["production pending","supplier has delivered order to warehouse","supplier’s order has arrived at warehouse", "Warehouse has dispatched the order", "Warehouse has completed quality check", "delivery in progress", "delivery not started", "production started"]

export const red = ["design rejected","delivery not started"]
export const green = ["payment received","design approved","production started","order received","Warehouse has dispatched the order","delivery is completed"]
export const orange = ["design pending approval","production pending","pending order receive","supplier has delivered order to warehouse","supplier’s order has arrived at warehouse","Warehouse has completed quality check","delivery in progress"]

export const imageMap = {
  'Heat Transfer': {
     image: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/Heat-Transfer.jpg',
     description: 'Involves printing a design onto a special film and transferring it to the product using heat and pressure. It is ideal for detailed, full-color designs.',
     prosAndCons: ['Unlimited colors in your design','Vibrant colors and high detail.','Works well on a variety of product materials.','Not as durable as screen printing.']
    },
  'Screen Printing': {
    image: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/ScreenPrinting.png',
    description: 'Screen printing uses a stencil (or screen) to apply ink layer by layer, making it ideal for bold designs with limited colors.',
    prosAndCons: ['High Print Definition','Long-lasting prints.','Vibrant and opaque colors.','Limited to fewer colors per design.','Not ideal for intricate details or gradients.']
  },
  'Embroidery': {
    image: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/Embroidery.png',
    description: 'Embroidery involves stitching the design onto fabric with threads, providing a premium and durable finish.',
    prosAndCons: ['Up to 3 Colors in your design','Adds texture and dimension to the design.','Durable and professional look.','More expensive than printing methods.']
  },
  'Design Submission Guide': {
    image: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/upload-design-instructions.png',
    description: 'Kindly upload the design in A4 size, A3 size, or as a small logo positioned on the left side of a shirt, adhering to the restricted dimensions of 5cm x 10cm. This will help me ensure that my design fits perfectly on the product',
    prosAndCons: []
  },
};

export const disableCancelBtn = ["order received","pending order receive","delivery is completed","delivery in progress","delivery not started","Warehouse has dispatched the order","Warehouse has completed quality check","supplier’s order has arrived at warehouse","supplier has delivered order to warehouse", 'production started']

export const printingDescriptions = {
  "heat transfer":{
    minValue:250,
    minPrompt:0,
    description:"Cost effective prints. Heat transfer uses a heat press to apply both heat and pressure to imprint designs onto fabric."
  },
  "screen printing":{
    minValue:80,
    minPrompt:20,
    description:"Smooth and Glossy prints. Screen printing is a process where ink is forced through a mesh screen onto a surface."
  },
  "embroidery":{
    minValue:130,
    minPrompt:30,
    description:"Highly durable. Embroidery involves sewing a pattern into a fabric."
  },
  "hot stamping":{
    minValue:0,
    minPrompt:0,
    description:"High resolution prints. Hot stamping is a lithography printing process."
  },
  "sublimation":{
    minValue:0,
    minPrompt:0,
    description:"Highly durable prints. Sublimation printing uses heat and pressure to transfer dye onto different materials."
  },
  "sublimation one sided":{
    minValue:0,
    minPrompt:0,
    description:"Highly durable prints. Sublimation printing uses heat and pressure to transfer dye onto different materials."
  },
  "sublimation double sided":{
    minValue:100,
    minPrompt:0,
    description:"Highly durable prints. Sublimation printing uses heat and pressure to transfer dye onto different materials."
  },
  "general":{
    minValue:0,
    minPrompt:0,
    description:"-"
  },
}