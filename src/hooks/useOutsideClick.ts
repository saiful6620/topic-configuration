import React, { MutableRefObject } from "react";

export function useOnClickOutside(
  ref:
    | React.RefObject<HTMLElement | null>
    | React.RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      // Do nothing if clicking ref's element or descendent elements

      if (
        Array.isArray(ref) &&
        ref.some((r) => !r.current || r.current.contains(event.target as Node))
      ) {
        console.log("Clicked inside ARRAY");
        return;
      }
      if (
        !Array.isArray(ref) &&
        (!ref.current || ref.current.contains(event.target as Node))
      ) {
        console.log("Clicked inside \n", ref.current, "\n", event.target);
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener, { capture: false });
    document.addEventListener("touchstart", listener, { capture: false });

    return () => {
      document.removeEventListener("mousedown", listener, { capture: false });
      document.removeEventListener("touchstart", listener, { capture: false });
    };
  }, [ref, handler]);
}

// import { useEffect, RefObject } from "react";

// /**
//  * Hook that handles outside click event of the passed refs
//  *
//  * @param refs array of refs
//  * @param handler a handler function to be called when clicked outside
//  */
// export default function useOutsideClick(
//   refs: Array<RefObject<HTMLElement> | undefined>,
//   handler?: () => void
// ) {
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (!handler) return;

//       // Clicked browser's scrollbar
//       if (
//         event.target === document.getElementsByTagName("html")[0] &&
//         event.clientX >= document.documentElement.offsetWidth
//       )
//         return;

//       let containedToAnyRefs = false;
//       for (const rf of refs) {
//         if (rf && rf.current && rf.current.contains(event.target as Node)) {
//           containedToAnyRefs = true;
//           break;
//         }
//       }

//       // Not contained to any given refs
//       if (!containedToAnyRefs) {
//         handler();
//         console.log("Clicked outside", event.target);
//       }
//     }

//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [refs, handler]);
// }
