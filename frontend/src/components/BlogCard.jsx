import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, subTitle, category, image, _id, writerName } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="group w-full rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className="mb-3 px-3 py-1 inline-block bg-primary/10 rounded-full text-primary text-xs font-semibold">
          {category}
        </span>
        <h5 className="mb-2 font-bold text-lg text-text-primary leading-tight">
          {title}
        </h5>
        <p
          className="mb-4 text-sm text-text-secondary flex-grow"
          dangerouslySetInnerHTML={{ __html: subTitle.slice(0, 80) + '...' }}
        ></p>
        <div className="text-right mt-auto">
          <span className="text-xs text-gray-400 font-medium">By </span>
          <span className="text-sm text-gray-600 font-semibold italic">
            {writerName || "Unknown Author"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;