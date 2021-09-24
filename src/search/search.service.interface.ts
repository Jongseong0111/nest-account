export interface SearchServiceInterface<T> {
  searchIndex(searchData: T): Promise<T>;
}
