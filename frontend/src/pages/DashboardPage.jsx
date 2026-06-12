import useUserStore from "../store/useUserStore";
import UrlForm from "../components/UrlForm";

const DashboardPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col justify-center items-center text-black">
      <div className="mb-8 text-3xl font-bold">
        {user && <h1>Welcome, {user.name}</h1>}
      </div>
      <UrlForm />
    </div>
  );
};
export default DashboardPage;
