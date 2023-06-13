import React, { useRef, useCallback, useContext, useLayoutEffect } from "react";
import clsx from "clsx";
import { ImageCardsList } from "@layouts";
import { ScrollLine } from "@components";
import { PlayAnimationContext } from "@contexts";
import { splitTextToWords, splitTextToChars } from "@utils";
import { useHomeAnimation } from "@animations";
import {
  cleanUpGsapAnimation,
  addGsapChildTimelinesInOrder,
} from "@animations/utils";

const Home = ({ addToLandingTimeline, animateIndex }) => {
  console.log("[Render] @views/Home.jsx");

  // Retrieve Play Animation State
  const { playAnimation } = useContext(PlayAnimationContext);

  // Node References for Landing Animations
  const sippingOnTextNodeRef = useRef(null);
  const creativityTextNodeRef = useRef(null);
  const coffeeTextNodeRef = useRef(null);
  const coffeeTextNodeCopyRef = useRef(null);
  const oneCupOfTextNodeRef = useRef(null);
  const atTimeTextNodeRef = useRef(null);

  // Node Reference for Scroll Animation
  const inlineTextWrapperNodeRef = useRef(null);
  const textContainerNodeRef = useRef(null);

  // Temporary Child Component Timelines Reference
  const tempChildTimelinesListRef = useRef({});

  // Add Child Component Timelines to Parent Timeline Function
  const addToTempChildTimelineLists = useCallback((timeline, animateIndex) => {
    tempChildTimelinesListRef.current[animateIndex] = timeline;
  }, []);

  // GSAP Home Timeline Reference
  const homeTimelineRef = useRef();

  // Update animation when playAnimation is triggered
  useLayoutEffect(() => {
    if (!playAnimation) return;
    console.log("[LOG] (Home1.jsx) Animation Started");

    // Split texts from refs into words / chars
    const sippingOnWords = splitTextToWords(sippingOnTextNodeRef.current);
    const creativityChars = splitTextToChars(creativityTextNodeRef.current);
    const oneCupOfWords = splitTextToWords(oneCupOfTextNodeRef.current);
    const coffeeText = coffeeTextNodeRef.current;
    const atTimeWords = splitTextToWords(atTimeTextNodeRef.current);
    const coffeeChars = splitTextToChars(coffeeTextNodeRef.current);
    const coffeeCharsCopy = splitTextToChars(coffeeTextNodeCopyRef.current);

    // Retrive animation and register to timeline
    homeTimelineRef.current = useHomeAnimation({
      triggerer: {
        textContainerNodeRef,
      },
      text: {
        sippingOnTextNodeRef,
        creativityTextNodeRef,
        inlineTextWrapperNodeRef,
        atTimeTextNodeRef,
      },
      splitText: {
        sippingOnWords,
        creativityChars,
        oneCupOfWords,
        coffeeText,
        atTimeWords,
        coffeeChars,
        coffeeCharsCopy,
      },
    });

    // Sort and append child timelines to timeline
    addGsapChildTimelinesInOrder({
      tlChild: tempChildTimelinesListRef.current,
      tlParent: homeTimelineRef.current,
      order: { 0: ">rolling-text", 1: ">-1.3" },
    });

    // Add Timeline to parent component's timeline
    addToLandingTimeline(homeTimelineRef.current, animateIndex);

    // Clean Up Animations (prevent continuing to execute even after component unmounted)
    return () => {
      cleanUpGsapAnimation(homeTimelineRef.current);
      console.log("[LOG] (Home1.jsx) Animation Killed");
    };
  }, [playAnimation]);

  // ************************* CSS ************************* //
  const defaultTextFont = "font-default-sans";
  const creativityTextFont = "font-title-cursive";
  const defaultTextColor = "text-coffee-600 dark:text-coffee-300";
  const hightlightTextColor = "text-yellow-500";

  const defaultTextStyle = clsx(
    "leading-snug",
    "md:font-extralight font-light",
    "lg:text-[48px] md:text-[36px] sm:text-[24px] xs:text-[24px] text-[18px]"
  );

  const creativityTextStyle = clsx(
    "whitespace-nowrap",
    "lg:text-[140px] md:text-[116px] xs:text-[72px] text-[60px]"
  );

  const coffeeTextStyle = clsx(
    "leading-snug",
    "md:font-light font-normal",
    "lg:text-[48px] md:text-[36px] sm:text-[24px] xs:text-[24px] text-[18px]"
  );

  // ************************* JSX ************************* //
  const homeTextSection = (
    <>
      <div ref={sippingOnTextNodeRef} className={clsx(defaultTextStyle)}>
        Sipping on
      </div>

      <div
        ref={creativityTextNodeRef}
        id="creativity"
        className={clsx(
          // !customFontAvailableRef.current ? "pl-[8px] :",
          "relative",
          "xxxl:font-bold font-normal",
          creativityTextStyle,
          creativityTextFont
        )}
      >
        Creativity
      </div>

      <div
        ref={inlineTextWrapperNodeRef}
        className={clsx("relative inline-block")}
      >
        <span ref={oneCupOfTextNodeRef} className={defaultTextStyle}>
          one cup of{" "}
        </span>

        <span
          ref={coffeeTextNodeRef}
          className={clsx("absolute", "prevent-select", coffeeTextStyle)}
        >
          coffee
        </span>

        <span
          ref={coffeeTextNodeCopyRef}
          className={clsx(
            "absolute top-0",
            coffeeTextStyle,
            hightlightTextColor
          )}
        >
          coffee
        </span>
      </div>

      <div ref={atTimeTextNodeRef} className={defaultTextStyle}>
        at a time.
      </div>
    </>
  );

  return (
    <section id="home" className="page-layout home-page-spacing h-screen">
      <div
        className={clsx(
          "min-h-[90vh] pt-[10vh]",
          "grid gap-[20px]",
          "grid-rows-6",
          "lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-fixed-6 grid-cols-fixed-4" // !! overflow grid on purpose via "fixed"
        )}
      >
        {/* ---------------- Text Area ---------------- */}
        <div
          ref={textContainerNodeRef}
          className={clsx(
            "z-10",
            "xxxl:row-start-1 xxl:row-start-2 md:row-start-3 row-start-4 row-span-full",
            "xl:col-start-1 lg:col-start-1 md:col-start-1 sm:col-start-1 col-start-1",
            "xl:col-span-6 lg:col-span-7 md:col-span-6 sm:col-span-5 col-span-full",
            "flex flex-col justify-center",
            defaultTextFont,
            defaultTextColor
          )}
        >
          {homeTextSection}
        </div>

        {/* ---------------- Image Area ---------------- */}
        <ImageCardsList
          addToHomeTimeline={addToTempChildTimelineLists}
          animateIndex={0}
          className={clsx(
            "row-start-1 row-end-6 xl:row-span-full",
            "xl:col-start-6 md:col-start-4 xs:col-start-2 col-start-1 col-span-full"
          )}
        />
      </div>

      {/* ---------------- Scroll Line ---------------- */}
      <ScrollLine
        addToHomeTimeline={addToTempChildTimelineLists}
        animateIndex={1}
        className="h-[15vh]"
      />
    </section>
  );
};

export default React.memo(Home);
