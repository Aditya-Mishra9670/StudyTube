import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Loader, Play, X, Flag } from "lucide-react";
import { useUserStore } from "../store/useuserStore";
import { useLearnStore } from "../store/useLearnStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { ReportForm } from "../components";

const Streaming = () => {
  const { id } = useParams();
  const [reportTarget, setReportTarget] = useState(null);
  const { user } = useAuthStore();
  const { getVideo, getSimilarVideos, submitReport } = useUserStore();
  const { selectedVideo, getComments, addComment } = useLearnStore();
  const [videoData, setVideoData] = useState({});
  const [similarVideos, setSimilarVideos] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comments, setComments] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [addingComment, setAddingComment] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedVideo || selectedVideo._id !== id) {
        const video = await getVideo(id);
        setVideoData(video);
      } else {
        setVideoData(selectedVideo);
      }
      const similar = await getSimilarVideos(id);
      setSimilarVideos(similar);
      const comments = await getComments(id);
      setCommentsList(comments);
    };
    fetchData();
  }, [id, getVideo, getSimilarVideos, getComments, selectedVideo]);

  const handleReportSubmit = async (reason) => {
    if (!reportTarget) return;
    try {
      await submitReport({
        entityReported: reportTarget.id,
        type: reportTarget.type === "video" ? "Video" : "Comment",
        reasonToReport: reason.reason,
        details: reason.details,
      });
      setReportTarget(null);
    } catch (error) {
      toast.error("Failed to submit report");
    }
  };

  const handleCommentSubmit = async () => {
    if (comments.trim()) {
      setAddingComment(true);
      try {
        await addComment({ videoId: id, comment: comments });
        setCommentsList([
          {
            comment: comments,
            _id: Date.now(),
            studentId: {
              name: user.name,
              profilePic: user.profilePic,
            },
            createdAt: new Date(),
          },
          ...commentsList,
        ]);
        setComments("");
      } catch (error) {
        console.log(error);
      } finally {
        setAddingComment(false);
      }
    } else {
      toast.error("Please write something before posting");
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-base-100">
      {reportTarget && (
        <ReportForm
          onSubmit={handleReportSubmit}
          onCancel={() => setReportTarget(null)}
        />
      )}

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <section className="flex-1 max-w-4xl">
          <article className="card bg-base-200 shadow-lg">
            <figure className="relative aspect-video">
              {!isPlaying ? (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    src={videoData.thumbnail}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute btn btn-circle btn-primary btn-lg">
                    <Play size={32} />
                  </button>
                </div>
              ) : (
                <Plyr
                  source={{
                    type: "video",
                    sources: [{ src: videoData.url, type: "video/mp4" }],
                  }}
                />
              )}
            </figure>

            <div className="card-body p-4 md:p-6">
              <div className="flex justify-between items-start">
                <h1 className="card-title text-2xl">{videoData.title}</h1>
                <button
                  onClick={() => setReportTarget({ type: "video", id })}
                  className="btn btn-ghost btn-sm text-error"
                >
                  <Flag size={18} />
                </button>
              </div>

              <div className="collapse collapse-arrow">
                <input
                  type="checkbox"
                  className="peer"
                  defaultChecked={false}
                />
                <div className="collapse-title mt-1  text-primary font-medium">
                  Show Description
                </div>
                <div className="collapse-content">
                  <p className="pt-4">{videoData.description}</p>
                </div>
              </div>
            </div>
          </article>

          <section className="mt-6 card bg-base-200 shadow-lg">
            <div className="card-body p-4 md:p-6">
              <h2 className="card-title mb-4">Comments</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="input input-bordered flex-1"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleCommentSubmit}
                  disabled={addingComment}
                >
                  {addingComment ? <Loader className="animate-spin" /> : "Post"}
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {commentsList.slice(0, 1).map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-base-100 p-4 rounded-lg relative"
                  >
                    <button
                      onClick={() =>
                        setReportTarget({ type: "comment", id: comment._id })
                      }
                      className="absolute top-2 right-2 btn btn-ghost btn-xs"
                    >
                      <Flag size={16} className="text-error" />
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img
                            src={comment.studentId.profilePic}
                            alt="Profile"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{comment.studentId.name}</p>
                        <p className="text-sm">{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {commentsList.length > 1 && (
                  <button
                    className="btn btn-ghost w-full"
                    onClick={() => setShowAllComments(true)}
                  >
                    Show all comments
                  </button>
                )}
              </div>
            </div>
          </section>
        </section>

        <aside className="lg:w-80 space-y-4">
          <h3 className="text-xl font-semibold">Similar Videos</h3>
          {similarVideos.map((video) => (
            <Link
              key={video._id}
              to={`/course/video/${video._id}`}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <figure className="aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h4 className="card-title text-sm">{video.title}</h4>
              </div>
            </Link>
          ))}
        </aside>
      </div>

      <dialog
        open={showAllComments}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">All Comments</h3>
            <button
              onClick={() => setShowAllComments(false)}
              className="btn btn-circle btn-sm btn-error"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {commentsList.map((comment) => {
              const dateIST = new Date(comment.createdAt).toLocaleString(
                "en-IN",
                {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              );

              return (
                <div
                  key={comment._id}
                  className="card bg-base-200 shadow-md p-4 relative"
                >
                  <button
                    onClick={() =>
                      setReportTarget({ type: "comment", id: comment._id })
                    }
                    className="absolute top-2 right-2 btn btn-ghost btn-xs"
                  >
                    <Flag size={16} className="text-error mt-10" />
                  </button>
                  <div className="flex items-start gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={comment.studentId.profilePic} alt="Profile" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-semibold">
                          {comment.studentId.name}
                        </p>
                        <span className="text-sm text-neutral-content">
                          {dateIST}
                        </span>
                      </div>
                      <p className="text-sm">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default Streaming;
