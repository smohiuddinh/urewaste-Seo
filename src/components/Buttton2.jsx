const Button2 = ({ text1, text2, onclick }) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className="relative overflow-hidden bg-white text-black font-semibold py-4 px-8 text-lg rounded-full shadow-lg transition-all duration-300 group"
    >
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-y-full">
        {text1}
      </span>
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
        {text2}
      </span>
    </button>
  );
};


export default Button2;
