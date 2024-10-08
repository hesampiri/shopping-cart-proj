import TemporaryDrawer from "./TemDrawer";
import MediaCard from "./Card";
import { useEffect, useState } from "react";
import { ApiCaller } from "../ApiCaller";
import CircularIndeterminate from "../Components/Circular";

type datatype = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export function Home() {
  const [list, setlist] = useState<datatype[]>();
  const [isloading, setisloading] = useState(false);
  const [categories, setcategories] = useState<string[]>();
  const [filter, setfilter] = useState<string>();

  useEffect(() => {
    setisloading(true);
    ApiCaller("products", "", filter)
      .then((res) => {
        const data = res.data;
        setlist(data);
        setisloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter]);

  useEffect(() => {
    ApiCaller("products", "categories").then((res) => {
      setcategories(res.data);
    });
  }, []);

  return (
    <section>
      {!isloading ? (
        <div>
          <TemporaryDrawer data={list} />
          <div className="bg-cyan-900">
            <button
              className="text-white px-5 py-3 hover:bg-cyan-600 "
              onClick={() => setfilter(undefined)}
            >
              all
            </button>
            {categories?.map((item, idx) => (
              <button
                key={idx}
                className="text-white p-3 hover:bg-cyan-600"
                onClick={(e) => {
                  const buttonValue = (e.target as HTMLButtonElement).innerText;
                  setfilter(buttonValue);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5 p-3 mx-auto px-4 sm:px-8 "> 
            {list?.map((item, idx) => {
              return (
                <MediaCard
                  key={idx}
                  title={item.title}
                  id={item.id}
                  price={item.price}
                  image={item.image}
                  description={item.description}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <CircularIndeterminate />
        </div>
      )}
    </section>
  );
}
