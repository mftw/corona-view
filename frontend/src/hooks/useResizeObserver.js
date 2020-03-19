import { useState, useCallback } from 'react'
import { useDebouncedFn, useThrottledFn } from 'beautiful-react-hooks'
import useResizeObserver from 'use-resize-observer';

export const useResizeObserverThrottled = wait => {
  const [size, setSize] = useState({});
  const onResize = useThrottledFn(setSize, wait)
  const { ref } = useResizeObserver({ onResize });

  return { ref, ...size };
};

export const useResizeObserverDebounced = wait => {
  const [size, setSize] = useState({});
  const options = {
    leading: false,
    trailing: true,
  };
  const onResizeFN = useDebouncedFn(setSize, wait, options)
  const onResize = useCallback((...arg) => onResizeFN(...arg), [onResizeFN])
  const { ref } = useResizeObserver({ onResize });

  return { ref, ...size };
};

export default useResizeObserver;