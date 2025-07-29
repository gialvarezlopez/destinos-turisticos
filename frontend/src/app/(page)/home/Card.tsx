"use client";
import React, { useEffect, useState } from "react";
import {
  useBorrarDestino,
  useLikeDestino,
  useListaDestinos,
} from "../../../hooks/useDestinos"; // tu hook de fetch
import { DestinosProps } from "@/types/types";
import Link from "next/link";
import { Heart } from "lucide-react";

export const Card = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 3;

  const offset = (pageIndex - 1) * pageSize;

  // Llama a tu hook pasando limit y offset
  const {
    data: response,
    error,
    isLoading,
    refetch,
  } = useListaDestinos({
    limit: pageSize,
    offset,
  });

  // Llama el hook aquí, fuera de handleLikes
  const { mutate: updateClient, isPending: isUpdating } = useLikeDestino();

  const { mutate: deleteDestino, isPending: isDeleting } = useBorrarDestino();

  // Estado local para almacenar los datos recibidos
  const [data, setData] = useState<DestinosProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (response) {
      setData(response.data || []);
      setTotalPages(response.totalPages || 1);
    }
  }, [response]);

  const handleLikes = (elementId: string) => {
    const destinoToUpdate = data.find((d) => d.id === elementId);
    if (!destinoToUpdate) return;

    const updatedPayload = {
      ...destinoToUpdate,
      likes: (destinoToUpdate.likes || 0) + 1,
    };

    updateClient(
      { id: elementId, payload: updatedPayload },
      {
        onSuccess: () => {},
      }
    );
  };

  // Handle para eliminar
  const handleDelete = (elementId: string) => {
    deleteDestino(elementId, {
      onSuccess: () => {
        // Actualiza localmente el estado para quitar el destino eliminado
        setData((prev) => prev.filter((d) => d.id !== elementId));
      },
    });
  };

  return (
    <div className="p-4">
      {isLoading && <p className="text-center">Cargando...</p>}
      {error && <p>Error al cargar los destinos</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((destino) => (
          <div key={destino.id} className="relative border rounded shadow">
            <div className="flex justify-center">
              <img
                src={destino.url || "/images/card.png"}
                alt={destino.nombre}
                width={400}
                height={300}
                className="rounded-t-[10px] object-cover"
              />
            </div>
            <div className="absolute right-0 t-[10px] p-2">
              <div className="flex justify-end gap-1 items-center mb-2 text-gray-700 text-sm px-4 pt-1">
                <span>{destino.likes}</span>
                <button
                  className="addLikes"
                  onClick={() => handleLikes(destino.id ?? "")}
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
            <div className="p-4 mt-4">
              <h4 className="font-bold text-[45px] leading-10 text-center pb-4">
                {destino.nombre}
              </h4>
              <div className="mt-4">{destino.descripcion}</div>
              <div className="mt-4">{destino.direccion}</div>
              <div className="mt-6">
                <div className="pt-6 pb-4 flex justify-center">
                  <Link href={`/detalle/${destino.id}`} className="text-center">
                    Ver más
                  </Link>
                </div>

                <div className="flex gap-3">
                  <button
                    className="btnBlue w-full my-4"
                    onClick={() => handleDelete(destino.id ?? "")}
                    disabled={isDeleting}
                  >
                    Eliminar
                  </button>
                  <Link
                    className="btnBlue w-full my-4 text-center"
                    href={`/destino/actualizar/${destino.id ?? ""}`}
                  >
                    Editar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          className="btnBlue disabled:opacity-50"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
          disabled={pageIndex <= 1}
        >
          Anterior
        </button>
        <span>
          Página {pageIndex} de {totalPages}
        </span>
        <button
          className="btnBlue disabled:opacity-50"
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages))}
          disabled={pageIndex >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
