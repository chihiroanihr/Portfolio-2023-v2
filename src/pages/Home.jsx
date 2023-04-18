import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextToWords, splitTextToChars } from "@utils";
import { LandingImageCards, Coffee } from "@components";

gsap.registerPlugin(ScrollTrigger);

// !! forwardRef expects a function that accepts props and ref as arguments, thus destructuring is a recommended approach
const Home = forwardRef(({ playAnimation, className }, ref) => {
  // Scoped reference containing child elements that you want to animate
  const textSectionRef = useRef(null);
  // Child references
  const sippingOnTextRef = useRef(null);
  const creativityTextRef = useRef(null);
  const coffeeTextRef = useRef(null);
  const coffeeTextCopyRef = useRef(null);
  const oneCupOfTextRef = useRef(null);
  const atTimeTextRef = useRef(null);
  // Child Component reference
  const childComponentRef = useRef(null);

  // Update animation when playAnimation is triggered
  useEffect(() => {
    // If playAnimation is not triggered yet than skip
    if (!playAnimation) return;

    let context = gsap.context(() => {
      // Split texts from refs into words / chars
      const sippingOnWords = splitTextToWords(sippingOnTextRef.current);
      const creativityChars = splitTextToChars(creativityTextRef.current);
      const oneCupOfWords = splitTextToWords(oneCupOfTextRef.current);
      const coffeeText = coffeeTextRef.current;
      const atTimeWords = splitTextToWords(atTimeTextRef.current);
      const coffeeChars = splitTextToChars(coffeeTextRef.current);
      const coffeeCharsCopy = splitTextToChars(coffeeTextCopyRef.current);

      // Register animations to the timeline
      ref.current = gsap
        .timeline()
        // Custom: set perspective to "creativity" title text
        .set(creativityTextRef.current, {
          perspective: 400,
        })
        // Add all animations within textSectionRef scope
        .from(sippingOnWords, {
          id: "home-sipping-on-words",
          opacity: 0,
          duration: 2,
          stagger: 0.06,
          ease: "out",
        })
        .from(
          creativityChars,
          {
            id: "home-creativity-chars",
            y: -40,
            rotationX: -90,
            transformOrigin: "0% 50% -50",
            opacity: 0,
            scale: 1,
            duration: 1.5,
            stagger: 0.05,
            ease: "out",
          },
          "=-2"
        )
        .from(
          oneCupOfWords,
          {
            id: "home-one-cup-of-words",
            duration: 2,
            opacity: 0,
            ease: "out",
            stagger: 0.06,
          },
          "=-1.5"
        )
        .from(
          coffeeText,
          {
            id: "home-coffee-text",
            duration: 2,
            opacity: 0,
            ease: "out",
          },
          ">-2"
        )
        .from(
          atTimeWords,
          {
            id: "home-at-a-time-words",
            duration: 2,
            opacity: 0,
            stagger: 0.06,
            ease: "out",
          },
          "=-2"
        )
        .addLabel("rolling-text", "<0.5")
        .to(
          coffeeChars,
          {
            id: "home-coffee-chars",
            y: -20,
            opacity: 0,
            duration: 0.15,
            stagger: 0.05,
            ease: "power4.out",
          },
          "rolling-text"
        )
        .from(
          coffeeCharsCopy,
          {
            id: "home-coffee-chars-copy",
            y: 20,
            opacity: 0,
            duration: 0.15,
            stagger: 0.05,
            ease: "power4.out",
          },
          ">"
        );
    }, textSectionRef);

    // Add child component's animation
    ref.current.add(childComponentRef.current, ">rolling-text");

    // Clean animation: prevent continuing to execute even after component unmounted
    return () => context.revert();
  }, [playAnimation]);

  // // Animations when user Scrolls Up
  // useEffect(() => {
  //   // If navbar brand ref does not exist then skip
  //   if (!ref.current) return;

  //   // Register animation on scroll
  //   gsap.set(ref.current, { clearProps: true });
  //   gsap.fromTo(
  //     ref.current,
  //     {
  //       y: 0,
  //       opacity: 1,
  //     },
  //     {
  //       y: -100,
  //       opacity: 0,
  //       scrollTrigger: {
  //         id: "",
  //         trigger: ref.current,
  //         toggleActions: "play pause reverse reset",
  //         scrub: 2,
  //         start: "20% top",
  //         end: "200% top",
  //         markers: { startColor: "green", endColor: "green" },
  //       },
  //     }
  //   );

  //   // Clean scroll trigger animation when unmounted
  //   return () => ScrollTrigger.getById("").kill(true);
  // }, []);

  return (
    <section id="home" className={className}>
      {/* ------------------------ First Home section ------------------------ */}
      <div className="h-screen">
        <div
          // overflow grid on purpose via "fixed"
          className="grid gap-[20px] grid-rows-6 lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-fixed-6 grid-cols-fixed-4
          h-full xl:px-[150px] lg:px-[100px] md:px-[70px] xs:px-[35px] px-[20px]"
        >
          {/* -------- Text Area -------- */}
          <div
            ref={textSectionRef}
            className="xxxl:row-start-1 xxl:row-start-2 md:row-start-3 row-start-4 row-span-full
            xl:col-span-6 lg:col-span-7 md:col-span-6 sm:col-span-5 col-span-full
            xl:col-start-1 lg:col-start-1 md:col-start-1 sm:col-start-1 col-start-1
            flex flex-col justify-center leading-snug z-10"
          >
            <div
              ref={sippingOnTextRef}
              className="xl:mb-[35px] md:mb-[30px] mb-[20px]
              lg:text-[48px] md:text-[36px] sm:text-[24px] xs:text-[24px] text-[18px]
              font-default-sans md:font-extralight font-light text-coffee-600 dark:text-coffee-300"
            >
              Sipping on
            </div>
            <div
              ref={creativityTextRef}
              id="creativity"
              className="lg:text-[96px] md:text-[72px] xs:text-[48px] text-[36px] z-10 pl-[8px]
              font-title-cursive whitespace-nowrap text-coffee-600 dark:text-coffee-300"
            >
              Creativity
            </div>
            <div
              className="lg:text-[48px] md:text-[36px] sm:text-[24px] xs:text-[24px] text-[18px]
              font-default-sans md:font-extralight font-light text-coffee-600 dark:text-coffee-300"
            >
              {/* texts into one line (inline) - necessary due to animation */}
              <div className="relative inline-block">
                <span ref={oneCupOfTextRef}>one cup of </span>
                <span
                  ref={coffeeTextRef}
                  className="md:font-light font-normal prevent-select"
                >
                  coffee
                </span>
                <span
                  ref={coffeeTextCopyRef}
                  className="absolute top-0 right-0 md:font-light font-normal text-yellow-500"
                >
                  coffee
                </span>
              </div>
              <p ref={atTimeTextRef}>at a time.</p>
            </div>
          </div>

          {/* -------- Image Area -------- */}
          <div
            className="row-start-1 row-end-6 xl:row-span-full 
            xl:col-start-6 md:col-start-4 xs:col-start-2 col-start-1 col-span-full
            relative"
          >
            <LandingImageCards
              ref={childComponentRef}
              playAnimation={playAnimation}
            />
          </div>
        </div>
      </div>

      {/* ------------------------ Second Home section ------------------------ */}
      <div className="h-screen">
        <Coffee className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </section>
  );
});

// !! Sets the default value for the playAnimation prop to false to prevent errors when they are not passed by the parent component.
Home.defaultProps = { playAnimation: false, className: "" };

export default Home;
