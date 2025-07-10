import React from "react";

const Reviews = () => {
  return (
    <div>
      <h3 className="text-3xl text-center pb-12 max-sm:text-2xl max-sm: px-2">
        Over <span className="font-bold">1000 </span> satisfied clients.
      </h3>
      <div className="flex min-h-[60vh] md:mx-16 items-center md:items-start p-4 md:p-8 bg-custoryPrimary">
        <div className="w-full md:w-[60%] p-4 m-auto">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full min-h-[60vh]"
              src="https://www.youtube.com/embed/WPJUoUeGDlA?si=hNIp_ibg2GoA1Vf7"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
