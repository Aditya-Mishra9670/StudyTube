import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/useuserStore";
import { useAuthStore } from "../store/useAuthStore";
import { Star, AlertTriangle } from "lucide-react";

const ReportView = () => {
  const { id } = useParams();
  const { selectedReport, getReportById } = useUserStore();
  const { user } = useAuthStore();
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedReport || selectedReport._id !== id) {
        await getReportById(id);
      }
      if (selectedReport && selectedReport.reporterId !== user?._id) {
        setDontShow(true);
      }
    };
    fetchData();
  }, [id, selectedReport, getReportById, user]);

  if (dontShow || !selectedReport)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <AlertTriangle />
          <span>Access Denied</span>
        </div>
      </div>
    );

  const { type, entityReported, reasonToReport, details, resolved, createdAt } = selectedReport;

  const renderEntityContent = () => {
    switch (type) {
      case "Course":
      case "Video":
        return (
          <div className="card bg-base-200 ">
            <figure>
              <img 
                src={entityReported.thumbnail} 
                alt={entityReported.title} 
                className="w-full h-48 md:h-64 object-cover"
                loading="lazy"
              />
            </figure>
            <div className="card-body p-4">
              <h3 className="card-title">{entityReported.title}</h3>
              <p>{entityReported.description}</p>
            </div>
          </div>
        );
      
      case "Comment":
        return (
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary">{entityReported.comment}</div>
          </div>
        );
      
      case "User":
        return (
          <div className="flex items-center gap-4 bg-base-200 p-4 rounded-box">
            <div className="avatar">
              <div className="w-14 rounded-full">
                <img src={entityReported.profilePic} alt={entityReported.name} />
              </div>
            </div>
            <div className="text-xl font-bold">{entityReported.name}</div>
          </div>
        );
      
      case "Review":
        return (
          <div className="bg-base-200 p-4 rounded-box">
            <div className="flex items-center gap-1 text-warning">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < entityReported.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <blockquote className="mt-2 italic">"{entityReported.review}"</blockquote>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 pt-[69px]">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h1 className="card-title text-2xl md:text-3xl mb-2 md:mb-0">Report Details</h1>
              <div className={`badge badge-lg ${resolved ? "badge-success" : "badge-warning"}`}>
                {resolved ? "Resolved" : "Pending"}
              </div>
            </div>
            
            <div className="text-sm opacity-75 mt-2">
              Reported on: {new Date(createdAt).toLocaleString()}
            </div>

            <div className="divider my-2" />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Reason</h3>
                <p className="text-base">{reasonToReport}</p>
              </div>

              {details && (
                <div>
                  <h3 className="font-semibold text-lg">Details</h3>
                  <p className="text-base">{details}</p>
                </div>
              )}

              <div className="divider my-2" />

              <div>
                <h3 className="font-semibold text-lg mb-4">Reported {type}</h3>
                {renderEntityContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportView;