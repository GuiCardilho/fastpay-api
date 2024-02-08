export interface IPagination<Model> {
  page: number;
  limit: number;
  order: 'ASC' | 'DESC';
  orderBy: keyof Model;
  select: Array<keyof Model>;
  filter: string;
  status?: 'active' | 'inactive' | 'all';
}
