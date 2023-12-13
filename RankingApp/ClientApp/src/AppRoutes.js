import AlbumImage from "./components/AlbumImages";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import MovieImages from "./components/MovieImages";
import  RankItemsContainer  from "./components/RankItemsContainer";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/rank-movies',
        element: <RankItemsContainer dataType={1} imgArr={MovieImages} />
    },
    {
        path: '/rank-albums',
        element: <RankItemsContainer dataType={2} imgArr={AlbumImage} />
    }
];

export default AppRoutes;
