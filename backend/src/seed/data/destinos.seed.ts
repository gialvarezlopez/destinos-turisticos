import { Destino } from "src/destinos/interfaces/destinos.interface";
import { v4 as uuidv4 } from "uuid";

export const DESTINOS_SEED: Destino[] = [
  {
    id: uuidv4(),
    nombre: "la Ciudad del Amor",
    slug: "la-ciudad-del-amor",
    direccion: "París, Francia",
    url: "https://hoturis.com/wp-content/smush-webp/2024/06/symbol-of-paris-2023-11-27-05-36-29-utc-1-1-1024x687.jpg.webp",
    likes: 0,
    descripcion:
      "París, conocida como la Ciudad del Amor, es el destino más visitado del mundo",
  },
  {
    id: uuidv4(),
    nombre: "Templo del Buda",
    slug: "templo-del-buda",
    direccion: "Bangkok, Tailandia",
    url: "https://hoturis.com/wp-content/smush-webp/2024/06/bangkok-thailand-skyline-2023-11-27-05-32-35-utc-2-1-1024x684.jpg.webp",
    likes: 0,
    descripcion:
      "Bangkok atrae a más de 20 millones de visitantes anualmente. La ciudad es famosa por sus templos budistas,",
  },
  {
    id: uuidv4(),
    nombre: "Palacio de Buckingham",
    slug: "palacio-de-buckingham",
    direccion: "Londres, Reino Unido",
    url: "https://hoturis.com/wp-content/smush-webp/2024/06/london-at-the-dusk-2023-11-27-05-33-19-utc-1-1-1024x683.jpg.webp",
    likes: 0,
    descripcion:
      "Londres recibe alrededor de 19 millones de turistas cada año. Desde el icónico Big Ben hasta el histórico Palacio de Buckingham, la ciudad combina perfectamente la historia con la modernidad. ",
  },
  {
    id: uuidv4(),
    nombre: "Burj Khalifa",
    slug: "burj-khalifa",
    direccion: "Dubái, Emiratos Árabes Unidos",
    url: "https://hoturis.com/wp-content/smush-webp/2024/06/cityscape-of-dubai-united-arab-emirates-at-dusk-2023-11-27-05-00-13-utc-1-1-1024x543.jpg.webp",
    likes: 15,
    descripcion:
      "Dubái es sinónimo de lujo. Con más de 15 millones de visitantes anuales, destaca por su impresionante arquitectura, como el Burj Khalifa, el edificio más alto del mundo. Además, sus centros comerciales y resorts de lujo son un gran atractivo para los turistas.",
  },
];
