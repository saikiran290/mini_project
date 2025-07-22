import React, { useEffect, useState } from "react";
import axios from "axios";

const AllMails = () => {
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track expanded state for each post

  const getMails = async () => {
    try {
      const response = await axios.get("/allMailUploads");
      setPosts(response.data.posts);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
  
  const deleteMail = async (id) =>{
    let response = await axios.delete(`/deleteMail/${id}`)
    response ? (alert('deleted successfully')):(alert('something went wrong'))
  }

  useEffect(() => {
    getMails();
  }, [posts]);

  // Function to toggle "Read More" for an individual post
  const toggleReadMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle only the clicked post
    }));
  };

  return (
    <div className="p-5 mt-5">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="card m-3 row p-2 shadow-sm hover-shadow" key={post._id}>
            <div className="col-md g-3">
              <h1>{post.name}</h1>
              <p className="text-justify">
                {expanded[post._id]
                  ? post.Mailcontent
                  : `${post.Mailcontent.substring(0, 100)}...`}
              </p>
              <button className="btn text-primary btn-block rounded mr-2" onClick={() => toggleReadMore(post._id)}>
                {expanded[post._id] ? "Read Less" : "Read More"}
              </button>
              <button className="btn text-danger" onClick={()=>deleteMail(post._id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
          <h1 className="text-center"> No Mails Uploaded Yet.....</h1>
      )}
    </div>
  );
};

export default AllMails;
