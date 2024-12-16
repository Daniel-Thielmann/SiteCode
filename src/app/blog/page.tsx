import BlogCard from "@/components/Blog/card";
import Pagination from "@/components/Pagination";
import { cardPerPage } from "@/lib/utils";
import { getBlog, getBlogCount } from "@/server/db/query/blog/query";

export default async function Blog() {
  // Definimos a página padrão como 1
  const page = 1;
  const offset = (page - 1) * cardPerPage;

  try {
    const [blog, blogCount] = await Promise.all([
      getBlog(offset),
      getBlogCount(),
    ]);

    const totalPages = Math.ceil(blogCount / cardPerPage);

    return (
      <div className="bg-gradiente-fundo gap-12 flex flex-col items-center justify-center min-h-[69vh] pt-8 pb-8 flex-grow">
        <div className="flex flex-grow w-full gap-x-[8%] ml-5 mr-5 gap-y-8 flex-wrap justify-center items-center h-full">
          {blog.length > 0 ? (
            blog.map((item, index) => (
              <BlogCard
                key={index}
                link={`/individualBlog/${item.id}`}
                title={item.title}
                date={item.date}
                image={item.image.url}
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
    console.error("Erro ao carregar o blog:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-red-500 text-2xl">
          Erro ao carregar os dados do blog.
        </h1>
      </div>
    );
  }
}
