import Pin from "../pin/Pin";
import "./masonary.scss";
import axiosClient from "../../api/axiosClient";
import { useState, useEffect } from "react";
import React from "react";

function Masonary(props) {
  const category = props.category;
  const savePin = props.savePin;
  const user = props.user;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  let shuffledPosts = null;

  if (posts) {
    shuffledPosts = posts
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      try {
        let res;

        if (category) {
          res = await axiosClient.get(
            `posts/?category=${category.toLowerCase()}`
          );
        } else if (user) {
          res = await axiosClient.get(`posts/?userId=${user._id}`);
        } else {
          res = await axiosClient.get(`posts/`);
        }

        setPosts(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getPosts();
  }, [category, user]);

  return (
    <div className="masonary">
      <h1>{loading && "Loading..."}</h1>
      {savePin
        ? savePin.map((post, i) => <Pin data={post} key={i} />)
        : shuffledPosts &&
          shuffledPosts.map((post, i) => <Pin data={post} key={i} />)}
    </div>
  );
}

export default React.memo(Masonary);
