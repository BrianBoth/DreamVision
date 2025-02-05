import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [activetab, setActiveTab] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const location = useLocation();
  const userid = location.state?.userid;
  const [formData, setFormData] = useState({
    userid: userid,
    dream_title: "",
    dream_text: "",
  });

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const renderTab = () => {};
  const handleDream = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${backendUrl}/process-dream`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Dream Generation failed");
      }
      const parsedResponse = await response.json();
      console.log(parsedResponse);
    } catch (err) {
      console.error("Error during Dream Generation: ", err.message);
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-gradient-to-b from-blue-600 to-[#d8eeef] text-[#0B1E33] bg-cover bg-no-repeat relative"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        fontFamily: "Bubblegum Sans, sans-serif",
      }}
    >
      {/* Main Content */}
      <div className={`flex-grow pb-16 ${isModalOpen ? "blur-sm" : ""}`}></div>

      {/* Footer */}
      <footer className="w-full h-20 bg-[#fdfcfc] fixed bottom-0 left-0 border-t border-[#3F3F3F]">
        <div className="max-w-screen-xl mx-auto h-full flex justify-between items-center px-8 relative">
          {/* Calendar Button */}
          <button className="flex items-center justify-center w-14 h-14 hover:bg-gray-200 rounded-full transition-all duration-300 hover:ring-2 hover:ring-[#5d5d5d] focus:ring focus:ring-[#E0E0E0]">
            <FontAwesomeIcon icon={faCalendar} className="text-xl text-black" />
          </button>

          {/* Floating Add Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <button
              className="cursor-pointer w-16 h-16 bg-white hover:bg-gray-200 text-black rounded-full shadow-lg flex items-center justify-center text-3xl transition-all duration-300 hover:scale-105 ring-2 ring-blue-300 focus:ring focus:ring-[#E0E0E0]"
              onClick={toggleModal}
            >
              +
            </button>
          </div>

          {/* List View Button */}
          <button className="flex items-center justify-center w-14 h-14 hover:bg-gray-200 rounded-full transition-all duration-300 hover:ring-2 hover:ring-[#5d5d5d] focus:ring focus:ring-[#E0E0E0]">
            <FontAwesomeIcon icon={faListUl} className="text-xl text-black" />
          </button>
        </div>
      </footer>

      {isModalOpen && (
        <form onSubmit={handleDream}>
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/30">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full relative mx-4">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer text-2xl p-1 hover:bg-gray-100 rounded-full"
                onClick={toggleModal}
              >
                ✕
              </button>

              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                New Dream Entry
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-lg font-semibold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 outline-none rounded-lg px-4 py-3 transition-all"
                    placeholder="Enter dream title..."
                    value={formData.dream_title}
                    onChange={(e) =>
                      setFormData({ ...formData, dream_title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-lg font-semibold mb-2">
                    Dream Description
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 outline-none rounded-lg px-4 py-3 h-48 resize-y transition-all"
                    placeholder="Describe your dream in detail..."
                    value={formData.dream_text}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dream_text: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button className="cursor-pointer w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg">
                  Save Dream
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Dashboard;
