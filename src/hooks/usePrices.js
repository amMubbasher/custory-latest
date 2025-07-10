import { usePersistedStore } from "./usePersistedStore";

// This file is to set prices to 2 d.p. Check again if it is needed
export const usePrices = () => {
  const currency = usePersistedStore((state) => state.currency);
  
  const p = (price) => {
    const result = parseFloat(price).toFixed(2);
    return result;
  };

  const f = (result) => {
    result = `$${result} SGD`;
    return result;
  };

  return {
    p,
    f
  };
};
