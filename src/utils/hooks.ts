import * as React from "react";

const { useEffect, useRef } = React;

type IntervalFunction = () => unknown | void;

export const useInterval = (callback: IntervalFunction, delay: number | null): void => {
  const savedCallback = useRef<IntervalFunction | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }
    if (!delay) return;
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
