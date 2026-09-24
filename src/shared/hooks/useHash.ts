import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

type UseHashResult = {
  hashValue: string;
  setHash: (value: string) => void;
  clearHash: () => void;
};

export const useHash = (): UseHashResult => {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  const hashValue = hash ? decodeURIComponent(hash.slice(1)) : "";

  const setHash = useCallback(
    (next: string) => navigate(`#${encodeURIComponent(next)}`),
    [navigate]
  );

  const clearHash = useCallback(() => navigate({ pathname, search }), [navigate, pathname, search]);

  return { hashValue, setHash, clearHash };
};
