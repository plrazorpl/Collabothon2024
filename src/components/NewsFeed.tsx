import { Article } from "@/model/article.type";
import { getCurrencyNews } from "@/service/newsFeed.service";
import React, { useState } from "react";

const NewsFeed: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const openModal = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const articles = getCurrencyNews("EUR");

  return (
      <>
        <div className="bg-white max-w-6xl mx-auto p-5">
          <h1 className="text-3xl font-bold mb-4">Market Insights & Updates</h1>
          {/* Grid layout for tile display */}
          <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((element) => (
                <div
                    key={element.id}
                    onClick={() => openModal(element)}
                    className="border border-gray-200 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:scale-105 transition"
                >
                  <div className="h-32 bg-gray-300">
                    {/* Image placeholder */}
                    <img
                        src={`${element.image}`}
                        alt={element.title}
                        className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3
                        className="text-lg font-bold text-gray-800 cursor-pointer mb-2"
                    >
                      {element.title}
                    </h3>
                  </div>
                </div>
            ))}
          </div>

          {/* Modal for selected article */}
          {selectedArticle && (
              <div
                  onClick={() => closeModal()}
                  className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center cursor-pointer justify-center z-10">
                <div className="bg-white rounded-lg p-8 shadow-lg relative max-w-lg w-full z-20 cursor-default" onClick={(e) => {
                  e.stopPropagation();
                }}>
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedArticle.title}
                  </h2>
                  <p className="text-gray-700 mt-4">{selectedArticle.content}</p>
                  <span className="block mt-2 italic text-sm">
                source: commerzbank.com
              </span>
                  <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={closeModal}
                  >
                    &#10005; {/* Close Icon */}
                  </button>
                </div>
              </div>
          )}
        </div>
      </>
  );
};

export default NewsFeed;
