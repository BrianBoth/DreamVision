import React, { useRef, useEffect } from "react";

function DreamCards({ dreams, setIsCardOpen, fetchDream }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dreams]);
  return (
    <div className="overflow-y-auto" ref={containerRef}>
      <div className="grid gap-8 p-4 md:grid-cols-4 sm:grid-cols-1">
        {dreams.map((dream) => {
          const formattedDate = new Date(dream.created_at).toLocaleDateString();
          return (
            <div
              key={dream.entryid}
              className="relative card border rounded-lg shadow overflow-hidden cursor-pointer"
              onClick={async () => {
                await fetchDream(dream.entryid);
                setIsCardOpen(true);
              }}
            >
              <img
                src={dream.image_url}
                alt="generated dream"
                className="w-full h-auto"
              />
              <p className="absolute bottom-9 left-2 text-white bg-opacity-50 px-2 py-1 rounded font-extrabold text-xl">
                {dream.title}
              </p>
              <p className="absolute bottom-2 left-2 text-white bg-opacity-50 px-2 py-1 rounded font-extrabold text-xl">
                {formattedDate}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DreamCards;
