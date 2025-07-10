import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FaRegTired } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
import { GrMultiple } from "react-icons/gr";

const CardStack = () => {
  return (
    <div>
      <div className="mx-auto text-center mt-8 font-bold text-slate-600 text-xl">Why choose custory?</div>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 w-full px-4 py-12 text-slate-900 justify-items-center">
        <TiltCard
          icon={<MdReceiptLong className="mx-auto text-4xl mb-4" />}
          title="Tired of lengthy email exchanges for price quotes?"
          description="We offer instant price quotes, limited MCQ, at the best rates."
        />
        <TiltCard
          icon={<GrMultiple className="mx-auto text-4xl mb-4" />}
          title="Tired of multiple platforms for supplier comparison?"
          description="We bring together top custom merch sellers, locally and globally, for your convenience."
        />
        <TiltCard
          icon={<FaRegTired className="mx-auto text-4xl mb-4" />}
          title="Tired of back-and-forth design edits on orders?"
          description="With Custory's design platform, design and pay seamlessly. It's that simple."
        />
      </div>
    </div>
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ icon, title, description }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-72 rounded-xl"
    >
      <div
        style={{
          // transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        {icon}
        <div
          style={{
            // transform: "translateZ(50px)",
          }}
          className="text-center px-3"
        >
          <div className="text-custoryPrimary text-lg font-bold">{title}</div>
          <div className="mt-3 text-md">{description}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardStack;