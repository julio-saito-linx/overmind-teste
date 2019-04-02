import React, { useEffect } from "react";
import { useOvermind } from "./overmind";

function Posts() {
  const { state, actions } = useOvermind();

  useEffect(() => {
    actions.getPosts();
  }, []);

  return (
    <div>
      {state.isLoadingPosts ? (
        <h4>Loading...</h4>
      ) : (
        <div>
          Show count:{" "}
          <select value={state.showCount} onChange={actions.changeShowCount}>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <ul>
            {state.filteredPosts.map((post, index) => (
              <li key={post.id}>
                <h4>
                  {index + 1}. {post.title}
                </h4>
                {post.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Posts;
