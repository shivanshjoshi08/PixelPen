import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

export const submitBlogForReview = async (req, res) => {
  try {
    const { title, subTitle, writerName, description, category } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // Check if all fields are present
    if (!title || !writerName || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload Image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
        { width: "1280" }, // Width resizing
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      writerName,
      description,
      category,
      image,
      isPublished: false,
      status: "pending",
      submittedForReview: true,
    });

    res.json({
      success: true,
      message: "Blog submitted for review successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, writerName, description, category, isPublished } =
      JSON.parse(req.body.blog);
    const imageFile = req.file;

    // Check if all fields are present
    if (!title || !writerName || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload Image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
        { width: "1280" }, // Width resizing
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      writerName,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    // Delete all comments associated with the blog
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const enhancedPrompt =
      prompt +
      `

CRITICAL INSTRUCTIONS:
- Focus ONLY on the specific topic mentioned in the title
- Use the subtitle and category to guide content direction
- Create practical, actionable content that readers can apply
- If the topic naturally requires stories or examples, include them
- Avoid generic phrases like "join our community", "subscribe to our newsletter", or promotional content
- Make content genuinely helpful and informative
- Use engaging writing style that keeps readers interested
- Structure content logically with clear sections
- Ensure every paragraph provides value to the reader

Format your response with clean HTML tags:
- Use <h2> for main section headings
- Use <h3> for subsection headings  
- Use <p> for paragraphs
- Use <ul> and <li> for bullet points
- Use <strong> for emphasis
- Ensure proper spacing and structure

Generate focused, valuable content that directly addresses the blog title and provides real insights.`;

    const content = await main(enhancedPrompt);

    // Clean the content to remove any prompt text or unwanted content
    let cleanedContent = content;

    // Remove common prompt artifacts
    if (cleanedContent.includes("Requirements:")) {
      cleanedContent = cleanedContent.split("Requirements:")[0];
    }

    // Remove any text that looks like instructions
    if (cleanedContent.includes("CRITICAL INSTRUCTIONS:")) {
      cleanedContent = cleanedContent.split("CRITICAL INSTRUCTIONS:")[0];
    }

    // Remove any text that looks like a prompt
    if (cleanedContent.includes("Format your response")) {
      cleanedContent = cleanedContent.split("Format your response")[0];
    }

    // Remove any text that looks like a prompt
    if (cleanedContent.includes("Generate focused")) {
      cleanedContent = cleanedContent.split("Generate focused")[0];
    }

    // Clean up any remaining prompt-like text
    cleanedContent = cleanedContent.replace(/^.*?(?=<h|<p|<ul)/s, "");

    // Ensure the content starts with proper HTML tags
    if (!cleanedContent.trim().startsWith("<")) {
      cleanedContent = cleanedContent.replace(/^[^<]*/, "");
    }

    // Remove quotes and other unwanted characters at the end
    cleanedContent = cleanedContent.replace(/['"`]+$/, "");
    cleanedContent = cleanedContent.replace(/['"`]+(?=\s*$)/, "");

    // Clean up any trailing whitespace or punctuation
    cleanedContent = cleanedContent.trim();

    res.json({ success: true, content: cleanedContent });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const reviewBlog = async (req, res) => {
  try {
    const { id, action } = req.body;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    if (action === "approve") {
      blog.status = "approved";
      blog.isPublished = true;
      blog.submittedForReview = false;
    } else if (action === "reject") {
      blog.status = "rejected";
      blog.submittedForReview = false;
    }

    await blog.save();
    res.json({ success: true, message: `Blog ${action}d successfully` });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPendingBlogs = async (req, res) => {
  try {
    const pendingBlogs = await Blog.find({
      submittedForReview: true,
      status: "pending",
    }).sort({ createdAt: -1 });
    res.json({ success: true, pendingBlogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


