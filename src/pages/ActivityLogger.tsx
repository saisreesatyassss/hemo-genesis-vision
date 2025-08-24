"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

type ActivityForm = {
  type: string;
  hbValue?: number;
  medication?: string;
  transfusionDate?: string;
  notes?: string;
};

const ActivityLogger: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ActivityForm>({ type: "" });
  const [loading, setLoading] = useState(false);

  const userId = Cookies.get("userId"); // ✅ no TS error now

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert("No user logged in");
      return;
    }

    const payload = {
      type: form.type,
      data: {
        hbValue: form.hbValue,
        medication: form.medication,
        transfusionDate: form.transfusionDate,
        notes: form.notes,
      },
    };

    try {
      setLoading(true);
      await axios.post(
        `https://hemobackned.azurewebsites.net/api/auth/${userId}/activities`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Activity logged successfully!");
      setOpen(false);
      setForm({ type: "" });
    } catch (error) {
      console.error("Error logging activity:", error);
      alert("Failed to log activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end p-4">
      {/* Button to open modal */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        + Add Activity
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Log New Activity</h2>

            {/* Select Type */}
            <label className="block mb-2">Activity Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-4"
            >
              <option value="">Select</option>
              <option value="hb_test">Hb Test</option>
              <option value="transfusion">Transfusion</option>
              <option value="medication">Medication</option>
              <option value="sos">SOS</option>
            </select>

            {/* Hb Test */}
            {form.type === "hb_test" && (
              <input
                type="number"
                name="hbValue"
                placeholder="Hemoglobin Value (g/dL)"
                onChange={handleChange}
                className="w-full border rounded p-2 mb-4"
              />
            )}

            {/* Transfusion */}
            {form.type === "transfusion" && (
              <input
                type="date"
                name="transfusionDate"
                onChange={handleChange}
                className="w-full border rounded p-2 mb-4"
              />
            )}

            {/* Medication */}
            {form.type === "medication" && (
              <input
                type="text"
                name="medication"
                placeholder="Medication Name"
                onChange={handleChange}
                className="w-full border rounded p-2 mb-4"
              />
            )}

            {/* Notes */}
            <textarea
              name="notes"
              placeholder="Additional notes"
              onChange={handleChange}
              className="w-full border rounded p-2 mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogger;
