import React, { useState } from 'react';

const ReportForm = ({ onCancel, onSubmit }) => {
  const [details, setDetails] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const reasonToReport = ["Spam", "Inappropriate", "Hate speech", "Violence", "Other"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Report Content</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ reason: selectedReason, details });
          }}
        >
          <select
            className="select select-info w-full mb-4"
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            required
          >
            <option value="" disabled>Select reason for reporting</option>
            {reasonToReport.map((reason, index) => (
              <option key={index} value={reason}>
                {reason}
              </option>
            ))}
          </select>
          <textarea
            className="textarea textarea-info w-full mb-4"
            placeholder="Enter additional details..."
            onChange={(e) => setDetails(e.target.value)}
            required
            value={details}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-outline btn-error"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
