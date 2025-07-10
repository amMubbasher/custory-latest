import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaRegTired } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
import { GrMultiple } from "react-icons/gr";

const items = [
  {
    id: 1,
    title: "Tired of lengthy email exchanges for price quotes?",
    component: <MdReceiptLong size={200} color="gray" />,
    desc: "We offer instant price quotes, limited minimum order quantity, at the best rates.",
  },
  {
    id: 2,
    title: "Tired of multiple platforms for supplier comparison?",
    component: <GrMultiple size={200} color="gray" />,
    desc: "We bring together top custom merch sellers, locally and globally, for your convenience.",
  },
  {
    id: 3,
    title: "Tired of back-and-forth design edits on orders?",
    component: <FaRegTired size={200} color="gray" />,
    desc: "With Custory's design platform, design and pay seamlessly. It's that simple.",
  },
];

const Single = ({ item }) => { 
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section className="w-full">
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="max-w-[1366px] h-full mx-auto flex items-center justify-center gap-12 flex-wrap md:flex-nowrap">
          <div className="flex-1 h-1/2 w-full max-h-[300px] md:max-h-full" ref={ref}>
            <div className="flex items-center justify-center w-full h-full p-6">
              {item.component}
            </div>
          </div>
          <motion.div className="flex-1 flex flex-col gap-8" style={{ y }}>
            <h2 className="text-xl md:text-4xl">{item.title}</h2>
            <p className="text-gray-500 text-base md:text-lg">{item.desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="relative" ref={ref}>
      <div className="sticky top-0 left-0 pt-12 text-center text-orange-500 text-4xl md:text-6xl">
        <div className="mx-auto text-center my-8 font-bold text-custoryPrimary text-2xl">Why choose custory?</div>
      </div>
      {items.map((item) => (
        <div className="my-6" key={item.id}>
          <Single item={item} />
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
