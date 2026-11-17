
export interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  is_active: boolean;
}
export interface StaffResponse {
  current_page: number;
  data: Staff[];
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};


export type HeaderProps = {
  rows: Staff[];
};

export type PaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export type StatusFilter = "all" | "active" | "inactive";

export type SearchProps = {
  search: string;
  setSearch: (value: string) => void;

  statusFilter: StatusFilter;
  setStatusFilter: (value: StatusFilter) => void;

  setCurrentPage: (page: number) => void;

  selectedCount: number;
  deleteSelected: () => void;
};
