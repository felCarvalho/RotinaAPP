import { useEffect, useRef } from "react";

//hook recomendo para usar somente com useSearchPaarams
export function useDebounce({ data, callback, debounce }) {
  const time = useRef(null);

  useEffect(() => {
    if (time.current) {
      clearTimeout(time.current);
    }

    time.current = setTimeout(
      () => {
        time.current = setTimeout(() => {
          callback(data);
        }, debounce);
      },
      debounce,
      data,
    );

    return () => {
      clearTimeout(time.current);
    };
  }, [callback, data, debounce]);
}
