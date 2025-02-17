import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { HttpMethod } from "src/helpers/http";

type Store = {
  cache: Record<HttpMethod, string | undefined>;
  setCache: (method: HttpMethod, url: string) => void;
};

const useCache = create(
  persist<Store>(
    (set) => ({
      cache: { GET: undefined, POST: undefined },
      setCache: (method: HttpMethod, url: string) =>
        set((state) => ({
          ...state,
          cache: { ...state.cache, [method]: url },
        })),
    }),
    {
      name: "ping-cache",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCache;
