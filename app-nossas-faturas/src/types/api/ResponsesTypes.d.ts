interface ResponseApi {
  message: string;
  id?: number;
  StatusCode: number;
}

interface MetaPaginated {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface LinksPaginated {
  first: string;
  previous: string;
  next: string;
  last: string;
}
