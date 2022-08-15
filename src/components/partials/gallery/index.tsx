import React, { useEffect, useState } from "react";

type GalleryItemProps = {
  name: string;
  id: number;
};

type GalleryInfoProps = {
  count: number;
  next: number;
  prev: number;
};

type GalleryProps = {
  items: GalleryItemProps[];
  info: GalleryInfoProps;
  setPage: (val: number) => void;
};

const Gallery: React.FC<GalleryProps> = ({ items, info, setPage }) => {
  const [data, setData] = useState<GalleryItemProps[]>([]);

  useEffect(() => {
    setData(items);
  }, [items]);

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="homepage__gallery--grid">
      {!!data.length ? (
        data.map((item) => (
          <div className="homepage__gallery--grid__item" key={item.id}>
            <div className="homepage__gallery--grid__item--content">
              <img
                src={`https://rickandmortyapi.com/api/character/avatar/${item.id}.jpeg`}
                alt={item.name}
              />

              <div className="homepage__gallery--grid__item--footer">
                <p>{item.name}</p>
                <button type="button" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>...Loading</div>
      )}
      <div className="homepage__gallery--grid__footer">
        <button onClick={() => setPage(info.prev)} disabled={!info.prev}>
          Prev
        </button>
        <button onClick={() => setPage(info.next)} disabled={!info.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
