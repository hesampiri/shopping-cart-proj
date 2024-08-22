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
        console.log(data);

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
    <>
      {!isloading ? (
        <div>
          <TemporaryDrawer />
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
          <div className="bg-blue-100 flex flex-wrap justify-center gap-3 p-3">
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
          {/* <div className="bg-cyan-900 h-[200px] flex justify-center items-center capitalize text-white mt-3">
            <p>random footer stuff</p>
          </div> */}
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <CircularIndeterminate />
        </div>
      )}
    </>
  );
}
