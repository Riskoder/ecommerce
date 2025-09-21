export const renderConditional = (condition, content, fallback = null) => {
  return condition ? content : fallback;
};
