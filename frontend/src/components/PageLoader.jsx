import Spinner from "./Spinner";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <Spinner size="w-10 h-10" />
    </div>
  );
};
export default PageLoader;
