import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import gsap from "gsap";
import {
  Loading,
  Home,
  About,
  Works,
  Galleries,
  Contact,
  Footer,
} from "./pages";
import { Navbar, DarkLight } from "./components";

function App() {
      return () => window.removeEventListener("load", handlePageLoading);
  // ================================ Document On Load ================================ //
  // Set Loader Hidden State (after page loaded)
  const [isLoaderHidden, setIsLoaderHidden] = useState(false);

  // Set Play Animation State (after loader hidden)
  const [playAnimation, setPlayAnimation] = useState(false);

  // Allow animations / interactions when loader is hidden
  // !! useLayoutEffect executes before the DOM is painted -> avoid flash of content (some flickers during animation)
  useLayoutEffect(() => {
    let timeoutId;
    if (isLoaderHidden) {
      // Allow animation
      setPlayAnimation(true);
      // Allow scroll
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoaderHidden]);

  // =============================== Landing Animations =============================== //
  // Reference to handle animations
  const homeRef = useRef(null);
  const navbarRef = useRef(null);
  const darkLightRef = useRef(null);
  // Create GSAP animation timeline
  const timelineRef = useRef(null);

  // Handle All Animations from parent + child components
  // ! Referenced animations fails to get added to the timeline on first-render with useLayoutEffect(), thus use useEffect()
  useEffect(() => {
    // If playAnimation is not triggered yet than skip
    if (!playAnimation) return;

    // ! Create new timeline on every render otherwise the animation will pause if you re-render in the middle.
    timelineRef.current = gsap.timeline({
      defaults: { clearProps: "all" },
      paused: true,
      onStart: function () {
        console.log("play");
      },
      onComplete: function () {
        console.log("finish");
      },
    });
    // Add all children components' animation timelines into one timeline
    timelineRef.current.add(navbarRef.current);
    timelineRef.current.from(
      darkLightRef.current,
      {
        id: "dark-light-button",
        y: -10,
        opacity: 0,
        duration: 1,
        ease: "inOut",
      },
      ">-0.5"
    );
    timelineRef.current.add(homeRef.current, ">-1");

    // Play all animations once everything is added
    timelineRef.current.play();

    // Clean up animation when component unmounts
    return () => {
      timelineRef.current?.kill();
    };
  }, [playAnimation]);

  // ============================= Toggle Dark/Light Mode ============================= //
  // Set Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Toggle Light/Dark Mode State
  const handleToggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {/* Loader (hidden) */}
      <Loading
        setIsLoaderHidden={setIsLoaderHidden}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isLoaderHidden && "hidden"
        }`}
      />
      {/* Page */}
      <div
        className={`bg-coffee-100 dark:bg-coffee-800 transition-opacity duration-500 ${
          isLoaderHidden ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Navbar (sticky) */}
        <Navbar
          ref={navbarRef}
          playAnimation={playAnimation}
          className="z-20 fixed top-0 l-0 r-0"
        />

        {/* Contents */}
        <Home
          ref={homeRef}
          playAnimation={playAnimation}
          className="max-w-screen-xxxl mx-auto overflow-x-hidden"
        />

        {/* Dark Light Mode Button (sticky) */}
        <DarkLight
          ref={darkLightRef}
          handleToggleDarkMode={handleToggleDarkMode}
          playAnimation={playAnimation}
          className="z-10 fixed bottom-7 right-5 lg:right-7"
        />
      </div>
    </div>
  );
}

export default App;
