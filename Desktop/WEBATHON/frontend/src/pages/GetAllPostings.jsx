import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function GetAllPostings() {
  const [myposts, setMyposts] = useState([]);

  useEffect(() => {
    getall();
  }, []);

  async function getall() {
    const mail = localStorage.getItem("mail");
    try {
      const response = await fetch(`http://localhost:5001/job_postings/${mail}`);
      if (response.status === 404) {
        const data = await response.json();
        toast.error(data.message || "No posts found");
      } else if (response.status === 200) {
        const data = await response.json();
        setMyposts(data); // Save the posts into the state.
      }
    } catch (error) {
      console.error("Error fetching job postings:", error);
      toast.error("Failed to fetch job postings");
    }
  }

  return (
    <div className="unique-cards-container">
      <style>
        {`
          .unique-cards-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            padding: 20px;
            margin-top:100px;
          }

          .unique-card {
            background: #f9f9f9;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 20px;
            width: 300px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: unique-fadeInUp 0.5s ease forwards;
            opacity: 0;
          }

          .unique-card:hover {
            transform: translateY(-10px);
            box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
          }

          .unique-card .job-title {
            font-size: 1.5em;
            margin-bottom: 10px;
            color: #333;
          }

          .unique-card p {
            font-size: 1em;
            margin: 5px 0;
            color: #555;
          }

          @keyframes unique-fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      {myposts.map((post) => (
        <div key={post._id} className="unique-card">
          <h3 className="job-title">{post.Job_title}</h3>
          <p className="description">{post.Description}</p>
          <p className="requirements">
            <strong>Requirements:</strong> {post.Requirements}
          </p>
          <p className="location">
            <strong>Location:</strong> {post.Location}
          </p>
          <p className="salary">
            <strong>Salary Range:</strong> {post.Salary_Range}
          </p>
          <p className="email">
            <strong>Email:</strong> {post.mail}
          </p>
        </div>
      ))}
    </div>
  );
}
