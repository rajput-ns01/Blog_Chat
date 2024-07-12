import React from 'react';
import './ActivityPage.css'; // Importing the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons'; // Importing specific icons

const ActivityPage = () => {
  return (
    <div className="activity-page">
      <div className="section">
        <h2>Posts</h2>
        <div className="post">
          <div className="user-info">
            <p className="posted-by">Posted by: John Doe</p>
          </div>
          <div className="content">
            <img src="amazon.png" alt="Post 1" />
          </div>
          <p className="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="post-buttons">
            <button className="like-button"><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
            <button className="comment-button"><FontAwesomeIcon icon={faComment} /> Comment</button>
            <button className="share-button"><FontAwesomeIcon icon={faShare} /> Share</button>
          </div>
          <div className="comments-section">
            <h3>Comments</h3>
            <div className="comment">
              <p>Wow! Great post! Keep it up. - Alice</p>
            </div>
            <div className="comment">
              <p>This is really interesting. I never thought about it that way. - Bob</p>
            </div>
          </div>
        </div>
        <div className="post">
          <div className="user-info">
            <p className="posted-by">Posted by: Jane Smith</p>
          </div>
          <div className="content">
            <video controls>
              <source src="example.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="caption">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className="post-buttons">
            <button className="like-button"><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
            <button className="comment-button"><FontAwesomeIcon icon={faComment} /> Comment</button>
            <button className="share-button"><FontAwesomeIcon icon={faShare} /> Share</button>
          </div>
          <div className="comments-section">
            <h3>Comments</h3>
            {/* Add comments here */}
          </div>
        </div>
        {/* Add more posts here */}
        <div className="post">
          <div className="user-info">
            <p className="posted-by">Posted by: Alice Johnson</p>
          </div>
          <div className="content">
            <img src="./portfolio.png" alt="Post 3" />
          </div>
          <p className="caption">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          <div className="post-buttons">
            <button className="like-button"><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
            <button className="comment-button"><FontAwesomeIcon icon={faComment} /> Comment</button>
            <button className="share-button"><FontAwesomeIcon icon={faShare} /> Share</button>
          </div>
          <div className="comments-section">
            <h3>Comments</h3>
            {/* Add comments here */}
          </div>
        </div>
        <div className="post">
          <div className="user-info">
            <p className="posted-by">Posted by: Michael Brown</p>
          </div>
          <div className="content">
            <img src="./screenshot.png" alt="Post npm run 4" />
          </div>
          <p className="caption">Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
          <div className="post-buttons">
            <button className="like-button"><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
            <button className="comment-button"><FontAwesomeIcon icon={faComment} /> Comment</button>
            <button className="share-button"><FontAwesomeIcon icon={faShare} /> Share</button>
          </div>
          <div className="comments-section">
            <h3>Comments</h3>
            {/* Add comments here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
