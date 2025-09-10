import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const PendingBlogs = () => {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const { axios } = useAppContext();

  const fetchPendingBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/pending-blogs");
      if (data.success) {
        setPendingBlogs(data.pendingBlogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch pending blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (blogId, action) => {
    try {
      const { data } = await axios.post("/api/blog/review", {
        id: blogId,
        action,
      });
      if (data.success) {
        toast.success(data.message);
        fetchPendingBlogs(); // Refresh the list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to review blog");
    }
  };

  const toggleExpanded = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-10 bg-blue-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pending blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Pending Blogs for Review
        </h1>
        <p className="text-gray-600">
          Review and approve or reject submitted blogs
        </p>
      </div>

      {pendingBlogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <img
            src={assets.blog_icon}
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            alt="No pending blogs"
          />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Pending Blogs
          </h3>
          <p className="text-gray-500">
            All submitted blogs have been reviewed
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {pendingBlogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-48 flex-shrink-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {blog.title}
                    </h3>
                    {blog.subTitle && (
                      <p className="text-gray-600 mb-2">{blog.subTitle}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <img
                          src={assets.user_icon}
                          className="w-4 h-4"
                          alt="Writer"
                        />
                        {blog.writerName}
                      </span>
                      <span className="flex items-center gap-1">
                        <img
                          src={assets.blog_icon}
                          className="w-4 h-4"
                          alt="Category"
                        />
                        {blog.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <img
                          src={assets.star_icon}
                          className="w-4 h-4"
                          alt="Date"
                        />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <button
                      onClick={() => toggleExpanded(blog._id)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium content-toggle"
                    >
                      <img
                        src={assets.list_icon}
                        className={`w-4 h-4 transition-transform ${
                          expandedBlogs[blog._id] ? "rotate-90" : ""
                        }`}
                        alt="Toggle"
                      />
                      {expandedBlogs[blog._id]
                        ? "Hide Content"
                        : "Show Full Content"}
                    </button>

                    {expandedBlogs[blog._id] && (
                      <div className="admin-review-content mt-3">
                        <div
                          className="rich-text"
                          dangerouslySetInnerHTML={{ __html: blog.description }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReview(blog._id, "approve")}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <img
                        src={assets.tick_icon}
                        className="w-4 h-4"
                        alt="Approve"
                      />
                      Approve & Publish
                    </button>
                    <button
                      onClick={() => handleReview(blog._id, "reject")}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <img
                        src={assets.cross_icon}
                        className="w-4 h-4"
                        alt="Reject"
                      />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingBlogs;
