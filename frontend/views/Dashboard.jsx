import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import EntryModal from "../src/components/EntryModal";
import DreamCards from "../src/components/DreamCards";
import CardModal from "../src/components/CardModal";

function Dashboard() {
  const navigate = useNavigate();
  const [activetab, setActiveTab] = useState("list");
  const [activeEntries, setActiveEntries] = useState([]);
  const [activeEntry, setActiveEntry] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const userid = location.state?.userid;
  const [formData, setFormData] = useState({
    userid: userid,
    dream_title: "",
    dream_text: "",
  });

  const resetForm = () => {
    setFormData({
      userid: userid,
      dream_title: "",
      dream_text: "",
    });
  };

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
        if (response.status === 401) {
          console.error("Unauthorized: Redirecting to login.");
          navigate("/login");
          return;
        } else if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail);
        }
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        setActiveEntries(parsedResponse["dreams"]);
      } catch (err) {
        console.error("Error fetching dreams: ", err.message);
      }
    };
    fetchDreams();
  }, [backendUrl, userid]);

  const fetchDream = async (entryid) => {
    try {
      const response = await fetch(
        `${backendUrl}/get-dream?entryid=${entryid}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 401) {
        console.error("Unauthorized: Redirecting to login.");
        navigate("/login");
        return;
      } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      setActiveEntry(parsedResponse["dream"]);
    } catch (err) {
      console.error("Error fetching dream info: ", err.message);
    }
  };

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
      console.log("parse", parsedResponse);
      const newEntry = formatEntry(parsedResponse["dream_content"]);
      setActiveEntries([...activeEntries, newEntry]);
    } catch (err) {
      console.error("Error during Dream Generation: ", err.message);
    } finally {
      resetForm();
      setLoading(false);
    }
  };

  const formatEntry = (entry) => {
    return {
      entryid: entry.entryid,
      created_at: entry.created_at,
      image_url: entry.image_url,
      sentiment: entry.sentiment,
      title: entry.title,
    };
  };

  return (
    <div
      className="h-screen flex flex-col bg-gradient-to-b from-blue-600 to-[#d8eeef] text-[#0B1E33] bg-cover bg-no-repeat relative pb-22 px-8 pt-6"
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
      <h2
        className="sm:text-3xl md:text-4xl text-white text-center pb-3 relative"
        style={{
          textShadow:
            "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(135, 206, 250, 0.6), 0 0 45px rgba(173, 216, 230, 0.5)",
          fontFamily: "'Pacifico', cursive",
        }}
        onClick={() => {
          console.log(isCardOpen);
        }}
      >
        ☁ DREAMVISION ☁
      </h2>

      {/* Main Content */}
      <div className={`${isModalOpen ? "blur-sm" : ""}`}></div>
      {activetab == "list" && (
        <DreamCards
          dreams={activeEntries}
          setIsCardOpen={setIsCardOpen}
          fetchDream={fetchDream}
        />
      )}
      <div className={`${isCardOpen ? "blur-sm" : ""}`}></div>

      {/* Footer */}
      <footer className="w-full h-16 bg-[#fdfcfc] fixed bottom-0 left-0 border-t border-[#3F3F3F]">
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
      {isCardOpen && (
        <CardModal
          setIsCardOpen={setIsCardOpen}
          setActiveEntry={setActiveEntry}
          activeEntry={activeEntry}
        />
      )}
    </div>
  );
}

export default Dashboard;
