const Button = ({
  path,
  text,
  color,
  onClick,
}: {
  path: JSX.Element;
  text: string;
  color: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 grow`}
      style={{
        backgroundColor: color,
      }}
      onClick={onClick}
      data-testid={text}
    >
      <svg
        className="w-8 h-6 mr-2"
        aria-hidden="true"
        focusable="false"
        role="img"
        r="4"
        viewBox="0 0 320 512"
      >
        {path}
      </svg>
      <p className=" text-lg">{text}</p>
    </button>
  );
};

export default Button;
