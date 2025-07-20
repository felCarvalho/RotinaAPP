import { offset, flip, shift, autoUpdate, useFloating } from "@floating-ui/react";
import { useMemo } from "react";

export function usePosition({ offSet, offShift, offPlacement }) {
  const position = useMemo(() => [offset(offSet), flip(), shift(offShift)], [offSet, offShift]);

  const floating = useFloating({
    placement: offPlacement,
    middleware: position,
    whileElementsMounted: autoUpdate,
  });

  return floating;
}
