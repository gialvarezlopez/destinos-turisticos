const destinosRoutes = {
  list: `/api/destinos`,
  new: `/api/destinos`,
  addLike: (id: string) => `/api/destinos/${id}/likes/increment`,
  single: (id: string) => `/api/destinos/${id}`, //Mostrar, Borrar y Actualizar
};

export { destinosRoutes };
