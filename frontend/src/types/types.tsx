export interface PaginateParams {
  page?: number;
  limit?: number | string;
  query?: string;
  offset?: number;
}
export type DestinosProps = {
  id?: string;
  nombre?: string;
  direccion?: string;
  descripcion?: string;
  url?: string;
  likes?: number;
  created_at?: string;
  updated_at?: string;
};
