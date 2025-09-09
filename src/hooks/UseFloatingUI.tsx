import { offset, flip, shift, autoUpdate, useFloating } from "@floating-ui/react";
import type { Placement, ShiftOptions, OffsetOptions } from "@floating-ui/react";
import { useMemo } from "react";

interface positionTypes {
  offSet: OffsetOptions;
  offShift: ShiftOptions;
  offPlacement: Placement;
}

export function usePosition({ offSet, offShift, offPlacement }: positionTypes) {
  const position = useMemo(() => [offset(offSet), flip(), shift(offShift)], [offSet, offShift]);

  const floating = useFloating({
    placement: offPlacement,
    middleware: position,
    whileElementsMounted: autoUpdate,
  });

  return floating;
}
