"use client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchApi } from "@/app/action";
export type AnimeCardProp = JSX.Element;
function LoadMore() {
  const [data, setData] = useState<AnimeCardProp[]>([]);
  const [count, setCount] = useState(2);
  const { ref, inView } = useInView();
  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchApi(count);
      setData((prev) => [...prev, ...newData]);
      setCount((prevCount) => prevCount + 1);
    };
    if (inView) {
      fetchData();
    }
  }, [inView]);

  return (
    <>
      <section ref={ref} className="flex justify-center items-center w-full">
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {data}
        </section>
        {inView ? null : (
          <div>
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        )}
      </section>
    </>
  );
}

export default LoadMore;
