export const getMergedObject = <T extends Record<string, any>>(data: T) =>
    (partialData?: Partial<T>): T => ({
      ...data,
      ...partialData,
    });
