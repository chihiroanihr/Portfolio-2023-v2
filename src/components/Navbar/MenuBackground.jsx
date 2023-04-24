import React from "react";

const MenuBackground = (props) => {
  // Retrieve Props
  const isMenuOpen = props.isMenuOpen;
  const classes = props.className;

  return (
    <div
      className={`${classes} rounded-full
      bg-coffee-300 dark:bg-coffee-700 ${
        isMenuOpen ? "xl:scale-[50] md:scale-[35] scale-[20]" : "scale-[0]"
      } transition-transform duration-700`}
    ></div>
  );
};

// Default Props
MenuBackground.defaultProps = { isMenuOpen: false, classes: "" };

export default MenuBackground;
