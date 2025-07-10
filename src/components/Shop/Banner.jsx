import React from 'react';

const Banner = () => {
  return (
    <div className="w-full bg-custoryWhite text-black p-4 text-center">
      <p>
        If the product you are looking for is not available, you can{' '}
        <a href="/request" className="text-blue-500 underline">
          request it here
        </a>.
      </p>
    </div>
  );
};

export default Banner;
