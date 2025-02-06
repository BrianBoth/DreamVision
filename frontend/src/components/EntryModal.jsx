import React from "react";

function EntryModal({ handleDream, toggleModal, formData, setFormData }) {
  return (
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
  );
}

export default EntryModal;
