import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { WrapNodeForRevealAnim } from "@utils";
import { useDisplayTextAnimation } from "@animations";
import { cleanUpGsapAnimation } from "@animations/utils";

const DisplayText = ({ className, parentRef }) => {
  console.log("[Render] @layouts/Display/DisplayText.jsx");

  // Words Node References
  const displayWordsNodeRef = useRef([]);

  useEffect(() => {
    if (!parentRef.current && !displayWordsNodeRef.current) return;
    console.log("[LOG] (DisplayText.jsx) Animation Started");

    // Retrive animation and register to timeline
    const animation = useDisplayTextAnimation(
      displayWordsNodeRef.current,
      parentRef.current
    );

    // Clean Up Animations
    return () => {
      cleanUpGsapAnimation(animation);
      console.log("[LOG] (DisplayText.jsx) Animation Killed");
    };
  }, []);

  // ------------- Memoize text section JSX ------------- //
  const memoizedTextSection = useMemo(() => {
    const TEXT = "I also enjoy some <i>cool UI stuff</i> like this:";

    return (
      <WrapNodeForRevealAnim inputText={TEXT}>
        {({ text, italic }, index) => (
          <p
            key={index}
            ref={(el) => (displayWordsNodeRef.current[index] = el)}
            className={clsx(italic && "italic", "sm:mr-4 mr-3")}
          >
            {text}
          </p>
        )}
      </WrapNodeForRevealAnim>
    );
  }, []);

  // ************************* CSS ************************* //
  const fontType = "font-default-serif";
  const textColor = "text-coffee-600 dark:text-coffee-300";

  // ************************* JSX ************************* //
  return (
    <div
      className={clsx(
        className,
        "block relative",
        "md:text-[80px] xs:text-[45px] text-[40px]",
        "xl:text-right",
        "leading-tight",
        "font-extrabold",
        fontType,
        textColor
      )}
    >
      {memoizedTextSection}
    </div>
  );
};

export default DisplayText;
