import React from 'react';

const RequestForm = () => {
  return (
    <div className="form-container w-full max-w-4xl mx-auto p-4 shadow-lg">
      <iframe
        src="https://tally.so/embed/wgA66O?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
        width="100%"
        height="800"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Tally Form"
        allowFullScreen
      >
        Loading…
      </iframe>
    </div>
  );
};

export default RequestForm;
