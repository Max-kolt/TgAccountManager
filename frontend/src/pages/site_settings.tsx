import { Navbar } from "../components/navbar/navbar";
import { SettingsData } from "../components/Settings/SettingsData";

export function SettingsPage() {
  return (
    <div>
      <Navbar />
      <div className="p-10 w-full">
        <SettingsData />
      </div>
    </div>
  );
}
