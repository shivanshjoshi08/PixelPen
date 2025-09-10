import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const WriteBlog = () => {
  const navigate = useNavigate();
  const { axios } = useAppContext();

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    writerName: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateDescription = async () => {
    if (!formData.title) {
      toast.error("Please enter a title first");
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `Create a compelling blog post about: "${formData.title}"

Blog Details:
- Title: ${formData.title}
- Subtitle: ${formData.subTitle || "N/A"}
- Category: ${formData.category}

Requirements:
- Write 300-400 words of engaging, informative content
- Focus specifically on the topic mentioned in the title
- Use the subtitle to guide the content direction
- Consider the category context for appropriate tone and style
- Include 3-4 main sections with clear headings
- Use proper HTML formatting: <h2>, <h3>, <p>, <ul>, <li> tags
- Make content practical and actionable for readers
- If the topic requires examples or stories, include relevant ones
- Avoid generic "join our community" or promotional content
- Focus on providing real value and insights
- Make it enjoyable to read while being informative

Create content that readers will find genuinely helpful and engaging.`;

      const { data } = await axios.post("/api/blog/generate", { prompt });

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          description: data.content,
        }));
        toast.success("Description generated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to generate description");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.writerName ||
      !formData.description ||
      !formData.category ||
      !image
    ) {
      toast.error("Please fill all required fields and upload an image");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", image);
      formDataToSend.append("blog", JSON.stringify(formData));

      const { data } = await axios.post("/api/blog/submit", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success("Blog submitted for review successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to submit blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["Technology", "Startup", "Lifestyle", "Finance"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Write a Blog
            </h1>
            <p className="text-gray-600">Share your thoughts with the world</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your blog title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subTitle"
                  value={formData.subTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subtitle (optional)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Writer Name *
                </label>
                <input
                  type="text"
                  name="writerName"
                  value={formData.writerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={generateDescription}
                  disabled={isGenerating || !formData.title}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <img src={assets.blog_icon} className="w-4 h-4" alt="AI" />
                  {isGenerating ? "Generating..." : "Generate with AI"}
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                💡 <strong>AI Tip:</strong> Click "Generate with AI" to create
                focused, engaging content based on your title, subtitle, and
                category. The AI will create practical, valuable content that
                readers will enjoy and learn from.
              </p>

              {formData.description ? (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{ __html: formData.description }}
                  />
                </div>
              ) : (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your blog description or use AI to generate one. The AI will create well-formatted content with headings and structure."
                  required
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewImage ? (
                  <div className="space-y-4">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreviewImage(null);
                      }}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <img
                      src={assets.upload_area}
                      className="w-16 h-16 mx-auto mb-4 opacity-50"
                      alt="Upload"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
                    >
                      Choose Image
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <img
                      src={assets.tick_icon}
                      className="w-5 h-5"
                      alt="Submit"
                    />
                    Send for Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
