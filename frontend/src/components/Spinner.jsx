const Spinner = ({ size = "w-5 h-5" }) => {
  return (
    <div
      className={`${size} border-2 border-blue-500 border-t-transparent rounded-full animate-spin`}
    ></div>
  );
};
export default Spinner;
