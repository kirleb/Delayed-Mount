import { useState, useEffect } from 'react';

/**
 * This hook delays the unmount of components by the delayTimeInMilliseconds amount.
 *
 * It returns isMounted which should be used to control when an element is mounted.
 * And it returns setShouldBeRendered which controls toggling of isMounted.
 */
export default function useDelayUnmount(
  delayTimeInMilliseconds: number,
  initialMountedState = false,
  initialRenderState = false
) {
  // Is mounted is controlled externally this tells us when to stop and start mounting.
  const [isMounted, setIsMounted] = useState(initialMountedState);
  // shouldBeRendered should be used externally to control whether a a component or a section is rendered.
  const [shouldBeRendered, setShouldBeRendered] = useState(initialRenderState);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    // Mounting does not delay rendering, this runs straight away.
    if (!isMounted && shouldBeRendered) {
      setIsMounted(true);
    }
    // Unmounting is delayed by the delayTimeInMilliseconds.
    else if (isMounted && !shouldBeRendered) {
      timeoutId = setTimeout(
        () => setIsMounted(false),
        delayTimeInMilliseconds
      );
    }
    return () => clearTimeout(timeoutId);
  }, [shouldBeRendered]);
  return [isMounted, setShouldBeRendered] as const;
}
