import React from "react";
import HeroComponent from "../components/Home/HeroComponent";
import Layout from "../components/Layout/Layout";
import Discounts from "../components/Home/Discounts";
import Quotation from "../components/Home/Quotation";
import Business_Compaigns from "../components/Home/Business_Compaigns";
import Trusted_Brand from "../components/Home/Trusted_Brand";
import FAQComponent from "../components/Home/OrderProcess";
import { useNavigate } from "react-router-dom";
import CategoryButton from "../components/Home/CategoryButton";
import QuickOrdersSection from "../components/Home/QuickOrdersSection";

const productGroups = {
  featured: [
    {
      name: "Thermos Bottle (with handle)",
      description:
        "Enjoy convenience and comfort with our Thermos Bottle with Handle.",
      imageLink:
        "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/e39b1646-a7c2-4c05-b9f7-bf3498265bc7/f2eae2/front.jpg",
      urlLink: "/shirtdetail/e39b1646-a7c2-4c05-b9f7-bf3498265bc7",
      price: 9.5,
    },
    {
      name: "Lanyards",
      description:
        "Perfect for conferences, events, or employee identification.",
      imageLink:
        "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/0debd9fc-db74-498d-948c-b613300d1c9d/000000/front.jpg",
      urlLink: "/shirtdetail/0debd9fc-db74-498d-948c-b613300d1c9d",
      price: 0.4,
    },
    {
      name: "Stand Collar Jacket",
      description:
        "Elevate your professional attire with our Business Stand Collar Jacket.",
      imageLink:
        "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/650145eb-d6cb-4e6d-a1db-307ec45c7e6a/5e6776/front.jpg",
      urlLink: "/shirtdetail/650145eb-d6cb-4e6d-a1db-307ec45c7e6a",
      price: 29.7,
    },
  ],

  essentials: [
    {
      name: "Classic Stand Collar Windbreaker",
      description:
        "Stay stylish and protected from the elements with our windbreaker",
      imageLink:
        "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/2ff257ea-a2b3-4686-a3a3-58d12b05abb6/1b273f/front.jpg",
      urlLink: "/shirtdetail/2ff257ea-a2b3-4686-a3a3-58d12b05abb6",
      price: 10.4,
    },
    {
      name: "100% Cotton T shirt",
      description:
        "Experience ultimate comfort and style with our 100% cotton t-shirts.",
      imageLink:
        "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/480f68fa-7bb3-420b-8bca-4d88f7ee95b3/1e1c32/front.jpg",
      urlLink: "/shirtdetail/480f68fa-7bb3-420b-8bca-4d88f7ee95b3",
      price: 6.9,
    },
    {
      name: "Nametent",
      description:
        "Make networking seamless with our sturdy name tents, crafted from 250-300 gsm cardstock.",
      imageLink:
        "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/426d6ed9-b296-45fc-93f6-d27511d2af47/000000/front.jpg",
      urlLink: "/shirtdetail/426d6ed9-b296-45fc-93f6-d27511d2af47",
      price: 1.5,
    },
  ],

  categories: [
    {
      name: "Tshirts",
      description: "View our comfortable tshirts",
      imageLink:
        "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Categories/tshirt-category.png",
      urlLink: "/products?filter=TShirt",
    },
    {
      name: "Jackets",
      description: "View our stylish jackets",
      imageLink:
        "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Categories/jacket-category.png",
      urlLink: "/products?filter=Jacket",
    },
    {
      name: "Bags",
      description: "View our fashionable jackets",
      imageLink:
        "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Categories/bag-category.png",
      urlLink: "/products?filter=Totebag",
    },
  ],
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="mt-24 sm:mt-0">
        <HeroComponent />
      </div>

      <div className="sm:mt-24 mt-12">
        <Discounts />
      </div>
      <div className="text-center px-4 sm:pt-12 py-0 pb-0">
        <h2 className="text-2xl sm:text-5xl md:text-[54px] font-bold leading-tight text-black max-w-4xl mx-auto">
          We believe a brand’s story should be seen, felt, and remembered
        </h2>
        <p className="sm:my-20 my-10 text-gray-600 text-base sm:text-xl">
          We can help you with<sub>…</sub>
        </p>
      </div>

      <div className="max-sm:mt-12">
        <CategoryButton />
      </div>

      <div className="mt-[4.7rem]">
        <Business_Compaigns />
      </div>

      {/* <div className="bg-white px-4 md:px-20 text-center">
        <h2 className="text-2xl md:text-5xl font-bold text-gray-900 sm:my-20 my-12">
          For Quick Orders & Customization (B2C)
        </h2>
        <p className="text-base md:text-xl text-black max-w-xl mx-auto">
          Explore our collections, personalize them with your logo, and order in
          minutes — no back-and-forth required.
        </p>
        <div className="sm:my-16 my-12">
          <button
            onClick={() => navigate("/products")}
            className="bg-orange-500 hover:bg-orange-600 text-white py-4 px-10 rounded-md font-semibold text-sm"
          >
            Shop Now
          </button>
        </div>

        <div className="flex items-start flex-wrap gap-4">
          {[1, 2, 3].map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-[300px] min-w-[300px] flex-grow"
            >
              <div className="relative w-[340.5px] h-[340.5px] mb-6 shrink-0">
                <img
                  src={step === 1 ? 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/shirt.png' : step === 2 ? 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/form.png' : 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/image-3.png'}
                  alt="Step"
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
            
              <div className="w-[340px] mx-auto">
                <div class="relative max-sm:flex justify-center">
                  <span className="flex items-center justify-center sm:w-20 w-16 sm:h-20 h-16 bg-orange-500 text-white text-[30px] font-semibold rounded-full mb-4 relative">
                    {step}
                    <span class="max-sm:hidden absolute sm:left-[80px] left-[65px] top-1/2 w-[200px] h-px bg-red-500">
                      <span class="absolute right-0 -top-[3px] rotate-[-45deg] border-orange-500 border-r border-b p-[3px]"></span>
                    </span>
                  </span>
                </div>
              </div>
              <h2 className="text-2xl md:text-5xl font-bold text-gray-900 w-[340px] lg:leading-[60px] sm:text-start text-center my-5">
                {step === 1
                  ? "Choose Your Product"
                  : step === 2
                  ? "Get an Instant Quote in PDF"
                  : "Place Your Order"}
                <p className="sm:text-lg text-base font-light text-black mt-5">
                  {step === 1
                    ? "Curated, high-quality merch — apparel, packaging, gifts & more."
                    : step === 2
                    ? "No waiting. No delays. Transparent, competitive pricing in seconds."
                    : "No minimum order quantities. Order 1 or 10,000 — we scale with you."}
                </p>
              </h2>
            </div>
          ))}
        </div>
      </div> */}
      <QuickOrdersSection/>

      <div className="mt-12">
        <Trusted_Brand />
      </div>

      {/* <div className="mt-24">
        <Membership/>
      </div> */}

      <div className="mt-12">
        <FAQComponent />
      </div>

      <div className="mt-20">
        <Quotation />
      </div>

      {/* <div className="mt-12">
        <Reviews></Reviews>
      </div>

      <div className="mt-12">
        <CustomerReviews />
      </div> */}

      {/* <div className="mt-24">
        <Sustainable/>
      </div> */}

      {/* <div className="mt-16">
        <Portfolio></Portfolio>
      </div> */}

      {/* <Card></Card> */}
    </Layout>
  );
};

export default Home;
