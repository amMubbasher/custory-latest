import React from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const ProductGroup = ({ products, setCurrentProduct, selectedQuantity, selectedBudget, selectedLeadTime, selectedCategory, selectedProductTitle }) => {
  if (selectedProductTitle) {
    products = products?.filter(product => product?.title === selectedProductTitle);
  }

  const filterAccessories = () => {
    return products?.filter(product => ['Totebag', 'Cap', 'Lanyard'].includes(product.category.name));
  }

  const filterProducts = () => {
    return products.filter((product) => {
      const budgetCondition = selectedBudget === 'Default' || Object.values(product?.price).slice(-1)[0] < parseInt(selectedBudget.replace('Below $', '') * 100);
      const categoryCondition = selectedCategory === 'Default' || product.category.name === selectedCategory;
      return budgetCondition && categoryCondition;
    });
  };

  const filteredProducts = (selectedCategory && ['Totebag', 'Cap', 'Lanyard'].includes(selectedCategory)) ? filterAccessories() : selectedCategory ? filterProducts() : products;

  return (
    <div className='grid grid-cols-4 max-xl:gap-5 max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 max-lg:gap-6 max-lg:gap-y-10 max-sm:gap-12 gap-12 gap-y-16 pt-6'>
      {filteredProducts.length === 0 ? (
        <div className='text-center'>Coming soon</div>
      ) : (
        filteredProducts.map((product, index) => (
          <Link to={`/shirtdetail/${product.id}`} key={index}>
            <ProductCard
              data={product}
              selectedQuantity={selectedQuantity}
              selectedBudget={selectedBudget}
              selectedLeadTime={selectedLeadTime}
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default ProductGroup;