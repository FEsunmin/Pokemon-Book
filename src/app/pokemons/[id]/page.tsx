import PokemonDetail from "@/components/PokemonDetail";

export default function Page({ params }: { params: { id: string } }) {
  return <PokemonDetail params={params} />;
}
