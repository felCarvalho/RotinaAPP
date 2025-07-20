import { useEffect, useState } from "react";

export function useResizeView() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function atualizarResize() {
      setWidth((prev) => (prev !== window.innerWidth ? window.innerWidth : prev));
    }

    window.addEventListener("resize", atualizarResize);

    return () => window.removeEventListener("resize", atualizarResize);
  }, []);

  const verificarWidth = ({ largura }) => {
    return width > largura ? true : false;
  };

  return { width, verificarWidth };
}
