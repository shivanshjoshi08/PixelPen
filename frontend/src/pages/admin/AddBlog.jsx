import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [writerName, setWriterName] = useState("Admin");
  const [category, setCategory] = useState("Technology");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");
    if (!subTitle) return toast.error("Please enter a subtitle");
    if (!category) return toast.error("Please select a category");

    try {
      setLoading(true);

      const prompt = `Create a compelling blog post about: "${title}"

Blog Details:
- Title: ${title}
- Subtitle: ${subTitle}
- Category: ${category}

Requirements:
- Write 400-500 words of engaging, informative content
- Focus specifically on the topic mentioned in the title
- Use the subtitle to guide the content direction
- Consider the category context for appropriate tone and style
- Include 4-5 main sections with clear headings
- Use proper HTML formatting: <h2>, <h3>, <p>, <ul>, <li> tags
- Make content practical and actionable for readers
- If the topic requires examples or stories, include relevant ones
- Avoid generic "join our community" or promotional content
- Focus on providing real value and insights
- Make it enjoyable to read while being informative

Create content that readers will find genuinely helpful and engaging.`;

      const { data } = await axios.post("/api/blog/generate", { prompt });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
        toast.success("Content generated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        writerName,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubTitle("");
        setWriterName("Admin");
        quillRef.current.root.innerHTML = "";
        setCategory("Technology");
        setIsPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  return (
    <div className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
      <div className="bg-white w-full max-w-4xl p-6 md:p-10 sm:m-10 shadow rounded">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Blog
          </h1>
          <p className="text-gray-600">Create and publish a new blog post</p>
        </div>

        <form onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Thumbnail *
              </label>
              <label htmlFor="image" className="cursor-pointer">
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-primary transition-colors">
                  {!image ? (
                    <img
                      src={assets.upload_area}
                      alt="Upload area"
                      className="h-32 w-full object-contain mx-auto"
                    />
                  ) : (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="max-h-48 w-auto mx-auto rounded"
                      />
                      <p className="text-sm text-gray-500 mt-2">{image.name}</p>
                    </div>
                  )}
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  required
                  accept="image/*"
                />
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter blog title"
                  required
                  className="w-full p-3 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle *
                </label>
                <input
                  type="text"
                  placeholder="Enter subtitle"
                  required
                  className="w-full p-3 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setSubTitle(e.target.value)}
                  value={subTitle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  className="w-full p-3 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={category}
                >
                  <option value="">Select category</option>
                  {blogCategories
                    .filter((cat) => cat !== "All")
                    .map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Blog Description *
              </label>
              <button
                disabled={loading || !title || !subTitle || !category}
                type="button"
                onClick={generateContent}
                className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <img src={assets.blog_icon} className="w-4 h-4" alt="AI" />
                {loading ? "Generating..." : "Generate with AI"}
              </button>
            </div>

            <div className="relative">
              <div
                ref={editorRef}
                className="min-h-64 border border-gray-300 rounded"
              ></div>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded">
                  <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              💡 <strong>AI Tip:</strong> Fill in title, subtitle, and category
              first, then click "Generate with AI" for well-formatted content.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <input
              type="checkbox"
              checked={isPublished}
              className="scale-125 cursor-pointer"
              onChange={(e) => setIsPublished(e.target.checked)}
              id="publish"
            />
            <label
              htmlFor="publish"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Publish immediately after creation
            </label>
          </div>

          <div className="flex gap-4">
            <button
              disabled={isAdding}
              type="submit"
              className="px-8 py-3 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isAdding ? "Adding..." : "Add Blog"}
            </button>

            <button
              type="button"
              onClick={() => {
                setImage(false);
                setTitle("");
                setSubTitle("");
                setWriterName("Admin");
                quillRef.current.root.innerHTML = "";
                setCategory("Technology");
                setIsPublished(false);
              }}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
