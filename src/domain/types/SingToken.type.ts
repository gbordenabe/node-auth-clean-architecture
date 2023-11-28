export type SingToken = (
  payload: Object,
  duration?: string
) => Promise<string | null>;
