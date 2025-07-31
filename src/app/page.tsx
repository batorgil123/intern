import Login from "@/app/login/page";
export default async function Home() {
  return (
    <div className="w-full flex-col bg-gray-200 min-h-screen">
      <Login />
    </div>
  );
}
