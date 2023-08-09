export type RequestData<TParams, TQuery, TBody> = {
  params: TParams,
  query: TQuery,
  body: TBody,
};