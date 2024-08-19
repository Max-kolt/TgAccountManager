import { SubscriptionFunction } from "../components/SubscriptionFunc/subscription_function";
import { SubscriptionProcesses } from "../components/SubscriptionFunc/subscription_processes";
import { Navbar } from "../components/navbar/navbar";

export function SubscriptionFunctionPage() {
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full w-full pb-8 flex justify-between px-8 max-[780px]:flex-col max-[780px]:gap-40 max-[780px]:items-center">
        <SubscriptionFunction />
        <SubscriptionProcesses />
      </div>
    </div>
  );
}
