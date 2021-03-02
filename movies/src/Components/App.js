
import '../Styles/App.css';
import Movies from "./Movies";
import React, {useEffect, useState} from "react";
import { Input, Space } from 'antd';
import NewMovie from "./NewMovie";



function App() {
  const [movies, setMovies] = useState([]);
  const [parameter, setParameter] = useState('car');
  const { Search } = Input;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://www.omdbapi.com/?apikey=5eb5c92&s=${parameter}`);
      const dataMovies = await response.json();
      setMovies( dataMovies.Search);
      // dataMovies.Search.map((movie)=>{
      //   setMovies(movie);
      // })
    }
    getData();

  }, [parameter]);
  const onSearch = value => {
    setParameter(value);

  }

  return (
      <>
        <Space direction="vertical">
          <Search
              placeholder="Ingrese la palabra clave para buscar la películas"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              type="flex" align="middle"
          />
        </Space>
        <Movies movies={movies}/>
        <NewMovie />
      </>
  );
}

export default App;
