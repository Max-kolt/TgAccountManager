import { MainPanel } from "../components/Main/main_panel";
import { Navbar } from "../components/navbar/navbar";

export function MainPage() {
  return (
    <div className="h-full">
      <Navbar />
      <MainPanel />
    </div>
  );
}
