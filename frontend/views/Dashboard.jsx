import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import EntryModal from "../src/components/EntryModal";
import DreamCards from "../src/components/DreamCards";

function Dashboard() {
  const [activetab, setActiveTab] = useState("list");
  const [activeEntries, setActiveEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const userid = location.state?.userid;
  const [formData, setFormData] = useState({
    userid: userid,
    dream_title: "",
    dream_text: "",
  });

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/get-dreams?userid=${userid}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail);
        }
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        setActiveEntries(parsedResponse["dreams"]);
      } catch (err) {
        console.error("Error during login: ", err.message);
      }
    };
    fetchDreams();
  }, [backendUrl, userid]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const renderTab = () => {};
  const handleDream = async (e) => {
    e.preventDefault();
    setLoading(true);
    toggleModal();
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-gradient-to-b from-blue-600 to-[#d8eeef] text-[#0B1E33] bg-cover bg-no-repeat relative pb-20"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        fontFamily: "Bubblegum Sans, sans-serif",
      }}
    >
      {loading && (
        <div className="fixed inset-0 bg-[#00c6ff] bg-opacity-50 flex items-center justify-center z-50">
          <img src="/loadcloud.gif" alt="Loading..." className="w-96 h-96" />
        </div>
      )}
      {activeEntries.value == "list" && <div></div>}
      {/* Main Content */}
      <div className={`flex-grow ${isModalOpen ? "blur-sm" : ""}`}></div>
      {activetab == "list" && <DreamCards dreams={activeEntries} />}

      {/* Footer */}
      <footer className="w-full h-20 bg-[#fdfcfc] fixed bottom-0 left-0 border-t border-[#3F3F3F]">
        <div className="max-w-screen-xl mx-auto h-full flex justify-between items-center px-8 relative">
          {/* Calendar Button */}
          <button
            className={`flex items-center justify-center w-14 h-14 ${
              activetab == "calendar" ? "bg-gray-200" : ""
            } rounded-full transition-all duration-300 hover:ring-2 hover:ring-[#5d5d5d] focus:ring focus:ring-[#E0E0E0] cursor-pointer`}
            onClick={() => setActiveTab("calendar")}
          >
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
          <button
            className={`flex items-center justify-center w-14 h-14 ${
              activetab == "list" ? "bg-gray-200" : ""
            } rounded-full transition-all duration-300 hover:ring-2 hover:ring-[#5d5d5d] focus:ring focus:ring-[#E0E0E0] cursor-pointer`}
            onClick={() => setActiveTab("list")}
          >
            <FontAwesomeIcon icon={faListUl} className="text-xl text-black" />
          </button>
        </div>
      </footer>

      {isModalOpen && (
        <EntryModal
          handleDream={handleDream}
          toggleModal={toggleModal}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
}

export default Dashboard;
