export interface IPaginationMetaProperty {
  count: number;
  current_page: number;
  links: object;
  per_page: number;
  total: number;
  total_pages?: number;
}
