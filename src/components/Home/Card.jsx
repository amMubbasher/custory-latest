import React from 'react';
import { motion } from 'framer-motion';
import CaptureComponent from './CaptureComponent';

let easing = [0.6, -0.05, 0.01, 0.99];

const container = {
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: .2
    }
  }
}

const hoverEffect = {
  whileHover: {
    scale: 1.05, // Slight scale increase for hover effect
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow on hover
    borderRadius: "0.5rem"
  },
  whileTap: {
    scale: 0.95,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: "0.5rem"
  },
}

function Card() {
  return (
    <motion.div className="service_container mx-auto my-20 w-4/5">
      <div className="title_wrapper overflow-hidden">
        <motion.span className="service_title block text-center text-custoryPrimary my-6 mb-16 tracking-wider text-xl font-bold overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .5, delay: 1.8 }}
        >
          Shop categories 
        </motion.span>
      </div>

      <motion.div className="service_card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{ once: false }}>

        <motion.div className="card flex flex-col justify-between   rounded-lg bg-white p-4 relative transition-all ease-in-out duration-300 hover:shadow-lg hover:-translate-y-1" variants={item}>
            <CaptureComponent
              img="sampleshirt.png"
              title="Tshirt"
              showOnHover={true}
            />
        </motion.div>

        <motion.div className="card flex flex-col justify-between  rounded-lg bg-white p-4 relative transition-all ease-in-out duration-300 hover:shadow-lg hover:-translate-y-1" variants={item}>
            <CaptureComponent
              img="samplelanyard.png"
              title="Lanyard"
              showOnHover={true}
            />
        </motion.div>

        <motion.div className="card flex flex-col justify-between  rounded-lg bg-white p-4 relative transition-all ease-in-out duration-300 hover:shadow-lg hover:-translate-y-1" variants={item}>
            <CaptureComponent
              img="samplejacket.png"
              showOnHover={true}
              title="Jacket"
            />
        </motion.div>

        <motion.div className="card flex flex-col justify-between  rounded-lg bg-white p-4 relative transition-all ease-in-out duration-300 hover:shadow-lg hover:-translate-y-1" variants={item}>
            <CaptureComponent
              img="samplebottle.png"
              showOnHover={true}
              title="Bottle"
            />
        </motion.div>

        <motion.div className="card flex flex-col justify-between  rounded-lg bg-white p-4 relative transition-all ease-in-out duration-300 hover:shadow-lg hover:-translate-y-1" variants={item}>
            <CaptureComponent
              img="samplecap.png"
              showOnHover={true}
              title="Cap"
            />
        </motion.div>

        <motion.div className="card flex flex-col justify-between  rounded-lg bg-white p-4 relative transition-all ease-in-out duration-300 hover:shadow-lg hover:-translate-y-1" variants={item}>
            <CaptureComponent
              img="sampletotebag.png"
              showOnHover={true}
              title="Totebag"
            />
        </motion.div>

        <motion.div className="card flex flex-col justify-between  rounded-lg bg-white p-4 relative transition-all ease-in-out duration-300 hover:shadow-lg hover:-translate-y-1" variants={item}>
            <CaptureComponent
              img="samplehoodie.png"
              showOnHover={true}
              title="Hoodie"
            />
        </motion.div>

        <motion.div className="card dark flex flex-col justify-between  rounded-lg  text-black p-4 relative transition-all ease-in-out duration-300 hover:shadow-lg hover:-translate-y-1" variants={item}>
            <CaptureComponent
              img=""
              showOnHover={true}
              title="Shop All"
            />
        </motion.div>
        
      </motion.div>

    </motion.div>
  )
}

export default Card;
