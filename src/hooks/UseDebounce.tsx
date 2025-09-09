import { useEffect, useRef } from "react";

interface debounceTypes<T> {
  data: T;
  callback: (data: T) => void;
  debounce: number;
}

//hook recomendo para usar somente com useSearchPaarams
export function useDebounce<T>({ data, callback, debounce }: debounceTypes<T>) {
  const time = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (time.current) {
      clearTimeout(time.current);
    }

    time.current = setTimeout(
      () => {
        callback(data);
      },
      debounce,
      data,
    );

    return () => {
      if (time.current) {
        clearTimeout(time.current);
      }
    };
  }, [callback, data, debounce]);
}
//<ReturnType<typeof setTimeout> | null>
