import React from "react";

function CardModal({ setIsCardOpen, setActiveEntry, activeEntry }) {
  const formattedDate = new Date(activeEntry.created_at).toLocaleDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/30">
      <div
        className={`relative ${
          activeEntry.sentiment === "dream"
            ? "bg-[url('gooddream.jpg')] bg-cover bg-center"
            : "bg-[url('eerie.jpg')] bg-cover bg-center"
        } py-10 px-8 rounded-3xl shadow-2xl max-w-2xl w-[480px] mx-4 overflow-hidden`}
      >
        <button
          className={`text-white absolute top-6 right-6  hover:text-gray-800 transition-colors cursor-pointer text-3xl p-2 hover:bg-gray-200 rounded-full z-20`}
          onClick={() => {
            setIsCardOpen(false);
            setActiveEntry({});
          }}
        >
          ✕
        </button>

        <div className="relative z-10 mb-8 pr-24">
          <h1
            className={`text-4xl font-extrabold ${
              activeEntry.sentiment === "dream"
                ? "text-white"
                : "text-gray-50 drop-shadow-lg"
            }`}
          >
            {activeEntry.title}
          </h1>
          <div
            className={`w-16 h-1.5 mt-3 ${
              activeEntry.sentiment === "dream" ? "bg-white" : "bg-gray-400"
            }`}
          />
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="w-64 h-80 -rotate-3 group">
            <div className="relative w-full h-full transform transition-transform duration-300 hover:rotate-0">
              <img
                src={activeEntry.image_url}
                alt="dream image"
                className="object-cover w-full h-full rounded-2xl shadow-xl border-8 border-white/80"
              />
            </div>
          </div>

          <div className="relative w-full space-y-6 pr-20">
            {activeEntry.text && (
              <div
                className={`relative p-6 rounded-2xl ${
                  activeEntry.sentiment === "dream"
                    ? "bg-white/90 backdrop-blur shadow-lg"
                    : "bg-black/40 backdrop-blur-sm"
                }`}
              >
                <p
                  className={`text-lg leading-relaxed ${
                    activeEntry.sentiment === "dream"
                      ? "text-gray-700"
                      : "text-gray-300"
                  }`}
                >
                  {activeEntry.text}
                </p>
                <div
                  className={`absolute -top-3 -left-3 w-6 h-6 ${
                    activeEntry.sentiment === "dream"
                      ? "bg-blue-100"
                      : "bg-gray-800"
                  } rounded-full`}
                />
              </div>
            )}

            {formattedDate && (
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-px ${
                    activeEntry.sentiment === "dream"
                      ? "bg-white"
                      : "bg-gray-400"
                  }`}
                />
                <p
                  className={`text-sm ${
                    activeEntry.sentiment === "dream"
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                >
                  {formattedDate}
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full ${
            activeEntry.sentiment === "dream"
              ? "bg-blue-200/30"
              : "bg-gray-800/30"
          } blur-xl`}
        />
      </div>
    </div>
  );
}

export default CardModal;
