import { useCallback, useLayoutEffect, useState } from "react";
import { Home, About, Works, Galleries, Contact, Footer } from "./pages";
import { Loader, Navbar, DarkLight } from "./components";

function App() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  useLayoutEffect(() => {
    const setIsPageLoadingHandle = () => setIsPageLoading(false);
    if (document.readyState === "complete") {
      setIsPageLoadingHandle();
    } else {
      window.addEventListener("load", setIsPageLoadingHandle);
      return () => {
        window.removeEventListener("load", setIsPageLoadingHandle);
      };
    }
  }, []);

  const [isLoaderHidden, setIsLoaderHidden] = useState(false);

  const [playAnimation, setPlayAnimation] = useState(false);
  useLayoutEffect(() => {
    let timeoutId;
    if (isLoaderHidden) {
      setPlayAnimation(true);
      timeoutId = setTimeout(() => {
        // allow scroll
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoaderHidden]);

  const [darkMode, setDarkMode] = useState(false);
  const handleClick = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  return (
    <>
      <div
        className={`${
          isLoaderHidden
            ? "opacity-100 transition-opacity duration-500"
            : "opacity-0 pointer-events-none"
        } ${darkMode ? "dark" : ""}`}
      >
        <Navbar />
        <Home playAnimation={playAnimation} />
        <DarkLight
          className="z-10 fixed bottom-7 right-4 lg:right-6"
          onClick={handleClick}
        />
      </div>

      <Loader
        isPageLoading={isPageLoading}
        setIsLoaderHidden={setIsLoaderHidden}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isLoaderHidden && "hidden"
        }`}
      />
    </>
  );
}

export default App;
