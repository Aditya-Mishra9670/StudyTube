import { FileText, Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useUserStore } from "../store/useuserStore";
import { useNavigate } from "react-router-dom";

const TrackReports = () => {
  const navigate = useNavigate();
  const { myReports, myReportsLoading, getMyReports, setSelectedReport } = useUserStore();

  useEffect(() => {
    if (!myReports?.length && !myReportsLoading) {
      getMyReports();
    }
  }, [myReports, myReportsLoading, getMyReports]);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setTimeout(() => navigate(`/report/${report._id}`), 0);
  };

  return (
    <div className="p-4 md:p-6 bg-base-100 rounded-lg shadow-md space-y-4 overflow-auto">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold text-primary">
          Track Reports
        </h2>
      </div>

      <p className="text-sm  pb-2 md:pb-4">
        Review and manage your reports to stay informed and on top of your progress.
      </p>

      {myReportsLoading ? (
        <div className="text-center py-8">
          <Loader className="size-5 animate-spin mx-auto" />
        </div>
      ) : myReports?.length === 0 ? (
        <div className="text-center py-8">No reports found</div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="bg-base-200">Report ID</th>
                  <th className="bg-base-200">Details</th>
                  <th className="bg-base-200">Date</th>
                  <th className="bg-base-200">Status</th>
                  <th className="bg-base-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myReports?.map((report) => (
                  <tr key={report._id} className="hover:bg-base-200 transition-colors">
                    <td className="font-medium">#{report._id.slice(-6)}</td>
                    <td className="truncate max-w-[160px]">
                      {report.details?.slice(0, 7)}...
                    </td>
                    <td>
                      {new Date(report.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <span className={`badge ${report.resolved ? "badge-success" : "badge-warning"}`}>
                        {report.resolved ? "Resolved" : "Pending"}
                      </span>
                    </td>
                    <td className="text-right">
                      <button className="btn btn-sm btn-secondary" onClick={() => handleViewReport(report)}>
                        <FileText className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3">
            {myReports?.map((report) => (
              <div key={report._id} className="p-4 bg-base-200 rounded-lg shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">ID:</span>
                    <span>#{report._id.slice(-6)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Details:</span>
                    <span className="truncate max-w-[120px]">
                      {report.details?.slice(0, 7)}...
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Date:</span>
                    <span>
                      {new Date(report.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <span className={`badge ${report.resolved ? "badge-success" : "badge-warning"}`}>
                      {report.resolved ? "Resolved" : "Pending"}
                    </span>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button className="btn btn-sm btn-secondary" onClick={() => handleViewReport(report)}>
                      <FileText className="w-4 h-4 mr-1" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TrackReports;
