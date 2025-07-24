import Header from "./_components/header";
import Main from "./_components/main";

export default function Home() {
  return (
    <div className="w-full flex-col bg-gray-200 min-h-screen">
      <Header />
      <Main />
    </div>
  );
}
