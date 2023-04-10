const DarkLight = ({ onClick, className }) => {
  return (
    <div
      className={`${className} p-2 rounded-full shadow-light-btn dark:shadow-dark-btn cursor-pointer`}
      onClick={onClick}
    >
      <svg
        className="w-7 fill-transparent stroke-coffee-600 dark:fill-yellow-400 dark:stroke-yellow-400 transition-all duration-500"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </div>
  );
};

export default DarkLight;
