import { Suspense } from "react";

import HomeServer from "./_components/HomeServer";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading dog finder...</div>}
    >
      <HomeServer />
    </Suspense>
  );
}
