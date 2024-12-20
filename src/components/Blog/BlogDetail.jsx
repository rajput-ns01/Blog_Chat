import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './blogDetail.css'; // Import the CSS file


const BlogDetail = () => {
  const { blogId } = useParams(); // Retrieve blogId from the route parameter
  const [blog, setBlogDetail] = useState(null);


  useEffect(() => {
    if (blogId) {
      getBlogDetail();

    }
  }, [blogId]);

  const getBlogDetail = () => {
    axios
      .get(`https://blogapi-7.onrender.com/blog/${blogId}`)
      .then((res) => {
        setBlogDetail(res.data.blog[0]);
      })
      .catch((err) => {
        console.log('Error fetching blog details:', err);
      });
  };




  if (!blog) return <div>Loading...</div>; // Show loading state while fetching

  return (
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>
      <p>{blog.category}</p>
      <img src={blog.imageUrl} alt={blog.title} />
      <div dangerouslySetInnerHTML={{ __html: blog.description }} />

      
    </div>

  );
};

export default BlogDetail;
