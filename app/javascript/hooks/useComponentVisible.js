import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    const dpowDown_content = document.getElementsByClassName(
      "dpowDown_content"
    );
    if (dpowDown_content.length) {
      document.body.style.overflow = "hidden";
      const parrentPosition = ref.current.getBoundingClientRect();
      dpowDown_content[0].style.top = 20 + parrentPosition.top + "px";
      dpowDown_content[0].style.left = -100 + parrentPosition.left + "px";
      dpowDown_content[0].style.display = "block";
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
