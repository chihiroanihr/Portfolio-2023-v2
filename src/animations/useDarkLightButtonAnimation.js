import { gsap } from "gsap";

function useDarkLightButtonAnimation(darkLightButtonNode, vars) {
  return gsap.from(darkLightButtonNode, {
    id: "dark-light-button-animation",
    y: -10,
    opacity: 0,
    duration: 1,
    ease: "inOut",
    clearProps: true,
    ...vars,
  });
}

export default useDarkLightButtonAnimation;
