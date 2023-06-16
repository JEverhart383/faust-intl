import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const searchPosts = gql`
  query POSTS_SEARCH_QUERY($searchTerm: String!) {
    posts(where: { search: $searchTerm }) {
      nodes {
        databaseId
        title
        excerpt
      }
    }
  }
`;

export default function SearchForm(){

    const [searchTerm, setSearchTerm] = useState('');
    const { loading, error, data } = useQuery(searchPosts, {
        variables: { searchTerm }
      });

    const posts = data?.posts.nodes;
    const havePosts = Boolean(posts?.length);

    function handleSubmit(e){
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.target));
        setSearchTerm(values.search)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Search
                <input type='text' name='search' id='search' ></input>
                </label>
                <input type='submit' value='Submit'></input>
            </form>
            <div className="posts-list">
                {loading ? (
                <p>Loading...</p>
                ) : error ? (
                <p>Error :(</p>
                ) : !havePosts ? (
                <p>No posts found.</p>
                ) : (
                posts.map((post) => (
                    <div key={post.databaseId} className="posts-list-item">
                    <h2>{post.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </div>
                ))
                )}
            </div>

        </div>
    )
}