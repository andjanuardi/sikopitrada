import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let width = "";
    switch (width) {
      case "sm":
        width = `(min-width: 640px)`;
        break;
      case "md":
        width = `(min-width: 768px)`;

        break;
      case "lg":
        width = `(min-width: 1024px)`;

        break;
      case "xl":
        width = `(min-width: 1280px)`;

        break;
      case "2xl":
        width = `(min-width: 1536px)`;

        break;
      default:
        width = `(min-width: 0px)`;

        break;
    }

    const media = window.matchMedia(width);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
