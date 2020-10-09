import React, { useState, useEffect } from "react";
import "../styles/Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "../firebase";
import firebase from "firebase";

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={"jacek"} src="../avatar.jpg" />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>
      {
        <div className="post__comments">
          {comments.map((comment) => (
            <div className="post__commentBox">
              <p className="post__comentUsername">{comment.username}</p>
              <p className="post__comentText">{comment.text}</p>
            </div>
          ))}
        </div>
      }
      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            value={comment}
            placeholder="Daj komentarz"
            className="post__input"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
          >
            Wyślij
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
