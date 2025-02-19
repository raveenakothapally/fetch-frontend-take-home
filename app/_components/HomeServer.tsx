import ClientHome from "@/_components/HomeClient";
import { getAllBreeds } from "@/actions/breeds";

export default async function HomeServer() {
  const availableBreeds = await getAllBreeds();

  return <ClientHome availableBreeds={availableBreeds} />;
}
