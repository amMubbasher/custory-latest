import {motion} from 'framer-motion'

const variant1 = {
    initial: { opacity: 0, y: 70 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

const Modal = ({ setIsModal }) => {
    return (
      <motion.div
        variants={variant1}
        animate="animate"
        initial="initial"
        className="h-[100vh] w-[100vw] bg-black fixed flex z-[20] items-center justify-center bg-opacity-70"
      >
        <div className="min-w-[30vw] bg-white max-w-[70vw] font-sailec h-fit flex flex-col items-center p-10 rounded-xl">
          <div className="text-center text-2xl font-[700]">Great!</div>
          <div className="text-center mt-5 font-[200]">
            Your request is on the way.
          </div>
          <div className="text-center font-[200]">
            Now relax, we will get in touch soon.
          </div>
          <div className="mt-10">
            <div
              className={` ${
                false
                  ? "bg-secondary pb-[2px] pl-[2px] border-secondary"
                  : "hover:pb-[2px] hover:pl-[2px] border-gray-700 hover:bg-secondary hover:border-secondary  "
              } border-b-[2px] font-sailec font-[400] border-l-[2px]  ease-in-out transition-all duration-200`}
            >
              <button
                type={"button"}
                onClick={() => setIsModal(false)}
                className={`${
                  false
                    ? "text-secondary border-secondary"
                    : "text-black border-gray-700 hover:text-secondary hover:border-secondary "
                } px-10 py-2 text-black bg-white border-[1px] uppercase block text-sm  relative bottom-1 left-1 transition-all duration-200`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  export default Modal