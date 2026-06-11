import useUserStore from "../store/useUserStore";

const DashboardPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="pt-16 text-center text-black">
      <h1>Dashboard Page</h1>
      {user && <h1>Welcome, {user.name}</h1>}
    </div>
  );
};
export default DashboardPage;
