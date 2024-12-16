import Pagination from "@/components/Pagination";
import PortifolioCard from "@/components/PortifolioCard";
import { cardPerPage } from "@/lib/utils";
import {
  getPortifolio,
  getPortifolioCount,
} from "@/server/db/query/portifolio/query";

export default async function Portifolio() {
  // Página fixa como 1
  const page = 1;
  const offset = (page - 1) * cardPerPage;

  try {
    const [portifolio, portifolioCount] = await Promise.all([
      getPortifolio(offset),
      getPortifolioCount(),
    ]);

    const totalPages = Math.ceil(portifolioCount / cardPerPage);

    return (
      <div className="bg-gradiente-portifolio gap-12 flex flex-col items-center justify-center min-h-[69vh] pt-8 pb-8 flex-grow">
        <div className="flex flex-grow w-full gap-x-[8%] ml-5 mr-5 gap-y-8 flex-wrap justify-center items-center h-full">
          {portifolio.length > 0 ? (
            portifolio.map((item, index) => (
              <PortifolioCard
                key={index}
                link={`/individualport/${item.id}`}
                title={item.name}
                empresa={item.empresa}
                image={item.imagem.url}
                gerente={item.gerentes}
                projetistas={item.projetistas}
              />
            ))
          ) : (
            <h1 className="px-4 md:px-9 text-[#FEFFF5] text-2xl sm:text-3xl lg:text-4xl lg:text-[44px] text-center uppercase sub-titulo">
              Nenhum projeto encontrado
            </h1>
          )}
        </div>
        <div>{totalPages > 1 && <Pagination totalPages={totalPages} />}</div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar o portfólio:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-red-500 text-2xl">
          Erro ao carregar os dados do portfólio.
        </h1>
      </div>
    );
  }
}
