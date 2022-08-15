import React, { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Gallery from "src/components/partials/gallery";
import { debounce } from "lodash";

const GET_CHARACTERS = gql`
  query GET_CHARACTERS($name: String!, $page: Int!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        next
        prev
      }
      results {
        name
        id
      }
    }
  }
`;

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const [search, { loading, error, data }] = useLazyQuery(GET_CHARACTERS);

  const debouncer = useCallback(debounce(search, 1000), [filter, page]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    debouncer({ variables: { name: filter, page } });
  }, [page, filter]);

  if (loading) return <div>...Loading</div>;

  return (
    <div className="homepage">
      <h2 className="homepage__heading">Rick and Morty Characters</h2>
      <div className="homepage__filter">
        <div className="homepage__filter--wrapper">
          <label htmlFor="filter">Filter by</label>
          <input
            type="text"
            id="filter"
            value={filter}
            onChange={handleFilter}
          />
        </div>
      </div>
      <div className="homepage__gallery">
        {!loading && !error && data?.characters?.results && (
          <Gallery
            items={data?.characters?.results}
            info={data?.characters?.info}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
