import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCallback, useEffect } from "react";
type PaginationSharedProps = {
  meta: MetaPaginated;
  links: LinksPaginated;
  baseUrl: string;
  setUrlQuery: React.Dispatch<React.SetStateAction<string>>;
};

const PaginationShared = ({
  meta,
  links,
  baseUrl,
  setUrlQuery,
}: PaginationSharedProps) => {
  //const { setUrlQuery } = useContext(UrlContext);
  const limit = `limit=10`;
  const pageActive = meta.currentPage;

  const pages = () => {
    if (meta.totalPages === 1) return [1];
    if (meta.totalPages === 2) return [1, 2];
    if (links.previous === "")
      return [pageActive, pageActive + 1, pageActive + 2];
    if (links.next === "") return [pageActive - 2, pageActive - 1, pageActive];
    return [pageActive - 1, pageActive, pageActive + 1];
  };

  const changePage = useCallback(
    (url: string) => {
      setUrlQuery(url);
      //queryClient.invalidateQueries({ queryKey: ["getLojas"] });
    },
    [setUrlQuery]
  );

  useEffect(() => {
    if (meta.itemCount === 0 && links.last !== "") changePage(links.previous);
  }, [meta, links, changePage]);

  return (
    <Pagination className="pb-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (links.previous !== "") return changePage(links.previous);
              changePage(`${baseUrl}?page=1&${limit}`);
            }}
            className="cursor-pointer"
          />
        </PaginationItem>
        <PaginationItem>
          {pages()?.map((page) => (
            <PaginationLink
              key={page}
              isActive={page === pageActive}
              className="cursor-pointer"
              onClick={() => changePage(`${baseUrl}?page=${page}&${limit}`)}
            >
              {page}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (links.next !== "") return changePage(links.next);
              changePage(`${baseUrl}?page=${pageActive}&${limit}`);
            }}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationShared;
