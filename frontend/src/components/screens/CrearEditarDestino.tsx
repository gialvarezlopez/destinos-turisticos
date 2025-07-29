"use client";

import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCrearDestino,
  useActualizarDestino,
  useDestinoSingle,
} from "@/hooks/useDestinos";
import { DestinosProps } from "@/types/types";
import { useParams } from "next/navigation";

// Tipos y props
type Props = {
  destino?: DestinosProps;
};

// Esquema Zod
const destinationSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  url: z.string().url("Debe ser una URL válida"),
});

// Inferencia de tipo
type DestinationFormData = z.infer<typeof destinationSchema>;

const Fields = ({ destino }: Props) => {
  const params = useParams();
  const elementId = params?.id as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DestinationFormData>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      nombre: destino?.nombre || "",
      direccion: destino?.direccion || "",
      descripcion: destino?.descripcion || "",
      url: destino?.url || "",
    },
  });

  const { mutate: crearDestino, isPending: isCreating } = useCrearDestino();
  const { mutate: actualizarDestino, isPending: isUpdating } =
    useActualizarDestino(elementId);

  const {
    data: currentClient,
    isLoading,
    error,
  } = useDestinoSingle(elementId as string);

  // Reset form when destino cambia
  useEffect(() => {
    if (currentClient) {
      reset({
        nombre: currentClient.nombre,
        direccion: currentClient.direccion,
        descripcion: currentClient.descripcion,
        url: currentClient.url,
      });
    }
  }, [currentClient, reset]);

  // Enviar
  const onSubmit = (data: DestinationFormData) => {
    if (elementId) {
      actualizarDestino(data, {});
    } else {
      crearDestino(data, {});
    }
  };

  return (
    <div className="bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[735px] mx-auto px-2 py-14 space-y-4"
      >
        <h3 className="text-[45px] font-bold  mb-12 text-center">
          {elementId ? "Editar destino turístico" : "Agregar destino turístico"}
        </h3>

        {/* Nombre */}
        <div>
          <label className="block text-xl font-normal mb-1">Nombre:</label>
          <input
            type="text"
            {...register("nombre")}
            className="rounded-[10px] bg-[#F3F3F3] p-2 w-full"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-xl font-normal mb-1">Dirección:</label>
          <input
            type="text"
            {...register("direccion")}
            className="rounded-[10px] bg-[#F3F3F3] p-2 w-full"
          />
          {errors.direccion && (
            <p className="text-red-500 text-sm">{errors.direccion.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-xl font-normal mb-1">Descripción:</label>
          <textarea
            {...register("descripcion")}
            className="rounded-[10px] bg-[#F3F3F3] p-2 w-full"
          ></textarea>
          {errors.descripcion && (
            <p className="text-red-500 text-sm">{errors.descripcion.message}</p>
          )}
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-xl font-normal mb-1">URL Imagen:</label>
          <input
            type="text"
            {...register("url")}
            className="rounded-[10px] bg-[#F3F3F3] p-2 w-full"
          />
          {errors.url && (
            <p className="text-red-500 text-sm">{errors.url.message}</p>
          )}
        </div>

        {/* Botón */}
        <div className="max-w-[598px] mx-auto py-8 mt-4">
          <button
            type="submit"
            className="btnRed w-full block text-center disabled:opacity-50"
            disabled={isCreating || isUpdating}
          >
            {elementId
              ? isUpdating
                ? "Actualizando..."
                : "Actualizar destino"
              : isCreating
              ? "Agregando..."
              : "Agregar destino"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Fields;
