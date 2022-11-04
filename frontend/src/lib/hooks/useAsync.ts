import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

interface State<T> {
  loading: boolean;
  data: T | null;
  error: AxiosError | null;
}

function useAsync<T>(
  callback: () => Promise<AxiosResponse<T, any>>,
  deps: any[],
  skip: boolean = false,
) {
  const [state, setState] = useState<State<T>>({
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    setState({ ...state, loading: true });
    try {
      const response = await callback();
      setState({ loading: false, data: response.data, error: null });
    } catch (e) {
      setState({ loading: false, data: null, error: e as AxiosError });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    ...state,
    requestApi: fetchData,
  };
}

export default useAsync;
