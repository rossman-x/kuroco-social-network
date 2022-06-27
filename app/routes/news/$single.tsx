import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import PostComponent from "~/components/post-component";
import Post from "~/declarations/post";
import { getSinglePost } from "~/services/post.service";

const SingleComponent = () => {
  const params = useParams();
  const [currentPost, setCurrentPost] = useState<Post | undefined>();

  useEffect(() => {
    const reloadPost = async () => {
      try {
        if (!params.single || isNaN(+params.single))
          return alert("Cannot load post.");
        const p = await getSinglePost(+params.single);
        setCurrentPost(p);
      } catch (error) {
        console.error(error);
      }
    };
    reloadPost();
  }, [params.single]);
  return (
    <div>
      {!!currentPost && (
        <PostComponent post={currentPost} updatePost={setCurrentPost} />
      )}
    </div>
  );
};

export default SingleComponent;

/*
{assign_array var=processed_json values=""}
{assign var=processed_json value=$json}
{foreach from=$processed_json.list key=k item=foo}
    {assign var=post_id value=$foo.topics_id}
    {api_internal
        var=k_post
        status_var='status'
        endpoint="/rcms-api/3/posts/`$post_id`"
        method='GET'
        direct=1
    }
    {assign var=processed_json.list.$k value=$k_post.details}
{/foreach}
*/
