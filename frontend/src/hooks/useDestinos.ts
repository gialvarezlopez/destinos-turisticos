import { isAxiosError } from "axios";
import axiosInstance from "@/libs/axiosInstance";
import { destinosRoutes } from "@/config/apiRoutes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginateParams, DestinosProps } from "@/types/types";
import { useRouter } from "next/navigation";

//import { showToast } from "@/lib/toastUtil";

const useListaDestinos = ({ offset, limit, query }: PaginateParams) => {
  return useQuery({
    queryKey: ["lista-destinos", offset, limit, query],
    queryFn: async () => {
      try {
        const params = { offset, limit, query };

        const url = destinosRoutes.list;
        const { data } = await axiosInstance.get(url, {
          params,
        });
        return data;
      } catch (e) {
        if (isAxiosError(e)) {
          if (e.response) {
            // Server response error (4xx, 5xx)
            const errorMessage =
              e.response.data.message ||
              e.response.data.error ||
              "Unknown error";
            throw new Error(errorMessage);
          } else if (e.request) {
            // The request was made but no response was received (network problems)
            throw new Error(e.message);
          } else {
            // Other errors (configuration, etc.)
            throw new Error("Error in request configuration");
          }
        } else {
          // Errores no relacionados con Axios
          throw new Error("Unknown error");
        }
      }
    },
    //retry: false,
  });
};

const useDestinoSingle = (id: string) => {
  return useQuery({
    queryKey: ["destino", id],
    queryFn: async () => {
      try {
        const url = destinosRoutes.single(id);
        const { data } = await axiosInstance.get(url);
        return data; // Asumiendo que `data` ya es el arreglo de clientes
      } catch (e) {
        if (isAxiosError(e) && e.response) {
          // Verificar si el error tiene una respuesta con un mensaje

          const errorMessage =
            e.response.data.message ||
            e.response.data.error ||
            "Error desconocido";
          throw new Error(errorMessage);
        } else {
          throw new Error("Error desconocido");
        }
      }
    },
    staleTime: 10000,
    enabled: !!id,
  });
};

const useLikeDestino = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: DestinosProps;
    }) => {
      try {
        const url = destinosRoutes.addLike(id);
        const { data } = await axiosInstance.patch(url, payload);
        return data;
      } catch (e) {
        if (isAxiosError(e) && e.response) {
          const errorMessage =
            e.response.data.message || e.response.data.error || "Unknown error";
          throw new Error(errorMessage);
        } else {
          throw new Error("Unknown error");
        }
      }
    },
    onSettled: (_data, _error, variables) => {
      // Invalidar tanto la lista como el destino individual
      queryClient.invalidateQueries({ queryKey: ["lista-destinos"] });
      queryClient.invalidateQueries({ queryKey: ["destino", variables.id] });
    },
    onError: (error) => {
      // opcional: feedback de error
    },
  });
};
const useCrearDestino = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DestinosProps) => {
      try {
        const url = destinosRoutes.new;
        const { data } = await axiosInstance.post(url, payload);
        return data;
      } catch (e) {
        if (isAxiosError(e) && e.response) {
          console.log(".response", e.response);
          const errorMessage =
            e.response.data.message || e.response.data.error || "Unknown error";
          throw new Error(errorMessage);
        } else {
          throw new Error("Unknown error");
        }
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["user-list"] }),
    onSuccess: (value) => {
      alert(`${value?.message ?? "Destino creado correctamente"}`);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error has occurred.";
      alert(`${errorMessage}`);
    },
  });
};

const useActualizarDestino = (id: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DestinosProps) => {
      try {
        const url = destinosRoutes.single(id);
        const { data } = await axiosInstance.patch(url, payload);
        return data;
      } catch (e) {
        if (isAxiosError(e) && e.response) {
          console.log(e.response.data.message);
          const errorMessage =
            e.response.data.message || e.response.data.error || "Unknown error";
          throw new Error(errorMessage);
        } else {
          throw new Error("Unknown error");
        }
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["lista-destinos"] }),
    onSuccess: (value) => {
      alert(`${value?.message ?? "Destino actualizado correctamente"}`);
      push(`/`);
      /*
      showToast(
        "success",
        "Success!",
        `${value?.message ?? "User updated successfully"}`
      );
      */
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error has occurred.";

      alert(`${errorMessage}`);
      //showToast("destructive", "Error!", `${errorMessage}`);
    },
  });
};

const useBorrarDestino = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const url = destinosRoutes.single(id);
        const { data } = await axiosInstance.delete(url);
        return data;
      } catch (e) {
        if (isAxiosError(e) && e.response) {
          const errorMessage =
            e.response.data.message || e.response.data.error || "Unknown error";
          throw new Error(errorMessage);
        } else {
          throw new Error("Unknown error");
        }
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["lista-destinos"] }),
    onSuccess: (value) => {
      alert(`Destino eliminado correctamente`);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error has occurred.";
      alert(`${errorMessage}`);
    },
  });
};

export {
  useListaDestinos,
  useCrearDestino,
  useActualizarDestino,
  useBorrarDestino,
  useLikeDestino,
  useDestinoSingle,
};
