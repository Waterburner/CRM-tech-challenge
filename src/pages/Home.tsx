import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_CHARACTERS = gql`
  query {
    characters {
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
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  if (!loading && !error) {
    console.log(data?.characters);
  }

  return <div>Homepage</div>;
};

export default Home;
