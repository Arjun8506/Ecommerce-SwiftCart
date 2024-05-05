import React, { useEffect, useState } from "react";
import { useGetAllNews } from "../hooks/usegetAllNews";

const News = () => {
  const { getAllNews, news } = useGetAllNews();
  useEffect(() => {
    const fetchData = async () => {
      await getAllNews();
    };
    fetchData();
  }, []);

  const [expandedNews, setExpandedNews] = useState({});

  const handleExpand = (id) => {
    setExpandedNews((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 px-5 lg:px-5 py-24 ">
      <h1 className="text-red-500 text-2xl uppercase font-bold mb-6">Latest News</h1>
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:flex-wrap">
        {news?.map((news) => (
          <div
            key={news._id}
            className="card w-full lg:w-[30%] bg-base-100 shadow-xl"
          >
            <figure>
              <img src={news.image} alt="Shoes" />
            </figure>
            <div className="px-2 py-2">
              <h2 className="text-xl font-extrabold">{news.highlight}</h2>
              {expandedNews[news._id] ? (
                <>
                  <p className="transition-all ease-in-out">{news.details}</p>
                  <button 
                  className="btn bg-black text-white"
                  onClick={() => handleExpand(news._id)}>
                    Read Less
                  </button>
                </>
              ) : (
                <>
                  <p>{news.details.slice(0, 60)}...</p>
                  <button
                  className="btn bg-black text-white"
                  onClick={() => handleExpand(news._id)}>
                    Read More
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
