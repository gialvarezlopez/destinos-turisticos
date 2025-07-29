"use client";
import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useParams } from "next/navigation";
import { useDestinoSingle, useLikeDestino } from "@/hooks/useDestinos";
import { DestinosProps } from "@/types/types";

const Detalle = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useDestinoSingle(id);

  const { mutate: updateClient, isPending: isUpdating } = useLikeDestino();

  const handleLikes = () => {
    if (!data) return;

    const updatedPayload = {
      ...data,
      likes: (data.likes || 0) + 1,
    };

    updateClient(
      { id: data.id, payload: updatedPayload },
      {
        onSuccess: () => {
          // Opcional: refetch o mostrar un toast
        },
      }
    );
  };
  if (isLoading) return <div className="text-center py-20">Cargando...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error al cargar destino
      </div>
    );

  return (
    <div className="bg-white  mx-4">
      <div className="max-w-[1400px] mx-auto py-[80px] ">
        <div className="relative w-full h-[545px] rounded-tl-[15px] rounded-tr-[15px] rounded-bl-[0px] rounded-br-[0px] overflow-hidden">
          <img
            src={data.url || "/images/banner-detail.png"}
            alt={data.nombre || "Imagen"}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex justify-end gap-1 items-center mb-2 text-gray-700 text-sm px-4 pt-3">
          <span>{data.likes ?? 0}</span>
          <button className="addLikes" onClick={() => handleLikes()}>
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        </div>
        <div className="space-y-8 my-[40px]">
          <h3 className="font-bold text-6xl text-center">{data.nombre}</h3>
          <p className="">{data.descripcion}</p>
          <p>
            <p>{data.direccion}</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
