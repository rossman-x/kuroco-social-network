import type User from "~/declarations/user";
import avatarImage from "~/assets/avatar.png";
import { useRef, useState } from "react";
import Button from "./button";
import PostHashtag from "./post-hashtag";
import { uploadFile } from "~/services/fetch";
import { HostUrl } from "~/R";
import Spinner from "./spinner";
import { createPost } from "~/services/post.service";
const tagElement = (
  <path
    d="M500.835,244.677c-2.133-4.267-6.4-8.533-11.733-10.667l-145.067-57.6c11.733-24.533,17.067-51.2,16-75.733
c-1.067-30.933-13.867-56.533-34.133-74.667c-51.2-44.8-138.667-28.8-196.267,37.333c-21.333,24.533-37.333,53.333-43.733,83.2
c0,1.067,0,3.2,0,4.267l-73.6,35.2c-10.667,5.333-14.933,16-10.667,26.667l61.867,153.6c2.133,5.333,6.4,9.6,11.733,11.733
l308.267,122.667c2.133,1.067,5.333,1.067,7.467,1.067c7.467,0,16-5.333,19.2-14.933l90.667-226.133
C502.969,255.344,502.969,250.011,500.835,244.677z M160.569,90.011c41.6-48,104.533-62.933,137.6-34.133
c14.933,13.867,19.2,33.067,20.267,45.867c1.067,19.2-3.2,39.467-12.8,59.733L181.902,112.41
c-5.333-2.133-11.733-1.067-17.067,1.067l-28.8,13.867C142.435,113.477,150.969,101.744,160.569,90.011z M379.235,453.744
L98.702,342.811L48.569,215.877l125.867-60.8l106.667,42.667c-41.6,48-104.533,61.867-137.6,33.067
c-8.533-7.467-22.4-6.4-29.867,2.133c-7.467,8.533-6.4,22.4,2.133,29.867c19.2,16,43.733,24.533,70.4,24.533
c42.667,0,90.667-22.4,125.867-61.867c3.2-4.267,6.4-7.467,9.6-11.733l132.267,52.267L379.235,453.744z"
    fill="#fff"
  />
);

const shareElement = (
  <path
    d="M339.588,314.529c-14.215,0-27.456,4.133-38.621,11.239l-112.682-78.67c1.809-6.315,2.798-12.976,2.798-19.871
c0-6.896-0.989-13.557-2.798-19.871l109.64-76.547c11.764,8.356,26.133,13.286,41.662,13.286c39.79,0,72.047-32.257,72.047-72.047
C411.634,32.258,379.378,0,339.588,0c-39.79,0-72.047,32.257-72.047,72.047c0,5.255,0.578,10.373,1.646,15.308l-112.424,78.491
c-10.974-6.759-23.892-10.666-37.727-10.666c-39.79,0-72.047,32.257-72.047,72.047s32.256,72.047,72.047,72.047
c13.834,0,26.753-3.907,37.727-10.666l113.292,79.097c-1.629,6.017-2.514,12.34-2.514,18.872c0,39.79,32.257,72.047,72.047,72.047
c39.79,0,72.047-32.257,72.047-72.047C411.635,346.787,379.378,314.529,339.588,314.529z"
    fill="#fff"
  />
);

const photoElement = (
  <path
    d="M439.5,64h-416C10.542,64,0,74.542,0,87.5v288C0,388.458,10.542,399,23.5,399h416c12.958,0,23.5-10.542,23.5-23.5v-288
	C463,74.542,452.458,64,439.5,64z M87,167.212c0-11.83,9.164-24.067,24.5-24.067h8c4.098,0,7.423-3.288,7.493-7.37
	c11.599-3.693,29.136-0.041,45.015,3.266c8.377,1.744,16.37,3.409,23.289,3.934c3.26,6.461,7.862,22.676,0.743,44.863
	c-14.777-9.235-48.573-23.91-102.212-11.649c-2.492,0.57-4.405,2.322-5.29,4.528c-0.092,0.167-0.196,0.359-0.308,0.568
	C87.497,176.768,87,171.965,87,167.212z M94.989,211.691c0-8.878,3.58-17.479,5.6-21.625c32.176-6.716,55.645-2.526,69.832,2.291
	c11.014,3.741,18.239,8.404,21.646,10.921v12.416c0,26.765-21.774,48.539-48.539,48.539s-48.54-21.774-48.54-48.539V211.691z
	 M143.528,279.233c9.377,0,18.278-2.058,26.298-5.721c1.621,4.21,4.085,7.506,6.407,9.795c-1.683,1.82-3.399,3.717-5.149,5.658
	c-8.322,9.23-20.898,23.179-27.584,23.179s-19.263-13.948-27.584-23.179c-1.75-1.94-3.465-3.837-5.148-5.657
	c2.327-2.294,4.795-5.597,6.417-9.817C125.216,277.167,134.133,279.233,143.528,279.233z M104.775,299.011
	c12.471,13.831,25.366,28.134,38.725,28.134s26.254-14.303,38.725-28.134c3.842-4.261,7.526-8.348,10.71-11.381l14.661,6.034
	c0.172,0.071,0.347,0.136,0.524,0.193c5.177,1.692,10.28,5.316,14.462,10.185c-4.197,7.146-6.573,15.201-6.573,23.35V384H55v-56.607
	c0-13.947,10.936-29.304,23.88-33.535c0.177-0.058,0.352-0.122,0.524-0.193l14.661-6.034
	C97.25,290.663,100.934,294.75,104.775,299.011z M404.451,277.664c-5.815,2.867-15.61,6.336-28.951,6.336
	c-13.714,0-22.412-14.848-22.412-21.115c0-0.435-0.045-0.859-0.116-1.273c18.023-11.22,30.051-31.203,30.051-53.951
	c0-20.696-11.155-39.141-28.419-46.988c-2.232-1.014-4.819-0.874-6.927,0.376l-2.057,1.222
	c-18.075,10.742-42.829,25.455-82.931,29.773c-3.81,0.41-6.697,3.626-6.697,7.457v8.16c0,22.746,12.026,42.727,30.045,53.948
	c-0.071,0.416-0.117,0.841-0.117,1.277c0,6.268-8.698,21.115-22.412,21.115c-13.471,0-23.205-3.439-28.973-6.301
	c5.495-8.873,12.523-26.301,12.523-57.394v-19.113c0-36.419,32.5-66.048,72.449-66.048c39.945,0,72.443,29.629,72.443,66.048v19.113
	C391.95,251.357,398.96,268.78,404.451,277.664z M408.008,327.393V384h-177v-56.607c0-11.591,7.597-23.414,18.703-29.471
	c2.034,0.324,4.156,0.589,6.378,0.772C257.759,332.229,285.565,359,319.508,359c33.943,0,61.75-26.771,63.419-60.307
	c2.221-0.184,4.343-0.449,6.376-0.773C400.412,303.977,408.008,315.798,408.008,327.393z M319.507,256.176
	c-26.751,0-48.516-21.764-48.516-48.516v-1.532c38.329-5.372,63.528-19.828,80.721-30.031c10.015,6.181,16.31,18.159,16.31,31.563
	C368.022,234.412,346.259,256.176,319.507,256.176z M300.309,268.203c6.06,1.926,12.509,2.973,19.199,2.973
	c6.688,0,13.134-1.046,19.193-2.971c2.603,12.024,13.446,26.349,29.234,29.939C366.556,323.662,345.364,344,319.508,344
	c-25.857,0-47.048-20.339-48.425-45.858C286.867,294.549,297.706,280.226,300.309,268.203z M448,375.5c0,4.687-3.813,8.5-8.5,8.5
	h-16.492v-56.607c0-12.843-5.889-25.447-15.53-34.628c8.12-3.448,12.532-7.097,12.873-7.385c1.739-1.471,2.848-3.547,2.787-5.823
	c-0.061-2.248-0.998-4.246-2.769-5.62c-0.462-0.454-3.535-3.644-6.595-11.06c-3.113-7.545-6.824-21.056-6.824-42.57v-19.113
	c0-44.69-39.227-81.048-87.443-81.048c-48.22,0-87.449,36.357-87.449,81.048v19.113c0,21.515-3.711,35.025-6.824,42.57
	c-3.06,7.416-6.132,10.605-6.595,11.06c-1.771,1.374-2.708,3.372-2.769,5.62c-0.011,0.425,0.03,0.839,0.097,1.248
	c-0.961-0.406-1.929-0.783-2.908-1.111l-18.705-7.699c-2.427-0.999-5.189-0.644-7.294,0.904c-1.143-1.035-3.411-3.558-3.939-7.563
	c14.579-11.653,23.945-29.568,23.945-49.64v-14.512c15.52-36.922,3.667-63.772-1.806-70.34c-1.425-1.71-3.536-2.698-5.762-2.698
	c-6.243,0-15.079-1.84-24.433-3.789c-21.837-4.547-48.735-10.136-64.766,3.818c-9.551,0.297-18.961,4.113-25.982,10.593
	C76.375,146.099,72,156.2,72,167.212c0,18.37,6.134,36.703,7.989,41.827v6.655c0,20.049,9.344,37.947,23.896,49.601
	c-0.517,4.027-2.797,6.564-3.944,7.603c-2.106-1.551-4.868-1.905-7.295-0.905l-18.705,7.699C54.887,286.076,40,306.965,40,327.393
	V384H23.5c-4.687,0-8.5-3.813-8.5-8.5v-288c0-4.687,3.813-8.5,8.5-8.5h416c4.687,0,8.5,3.813,8.5,8.5V375.5z"
    fill="#fff"
    stroke-width="5"
  />
);
const NewPostComponent = ({ poster }: { poster?: User }) => {
  const postRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [image, setImage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addHashtag = () => {
    const hashtag = prompt("Hashtag text");
    if (!hashtag) return;
    const scMatch = hashtag.match(/[!@#$%^&*()\-=+ ]/);
    if (scMatch) {
      alert(
        `Hashtag cannot contain unallowed special character ->${scMatch[0]}<-.`
      );
      return;
    }
    setHashtags([...hashtags, hashtag]);
  };

  const addOrRemoveImage = () => {
    if (image) return setImage(undefined);

    if (!fileRef || !fileRef.current) return;

    fileRef.current.click();
  };

  const setImageSrc = () => {
    if (
      !fileRef ||
      !fileRef.current ||
      !fileRef.current.files ||
      !fileRef.current.files.length
    )
      return;
    const reader = new FileReader();
    reader.onload = function (e) {
      if (
        e &&
        e.target &&
        e.target.result &&
        !(e.target.result instanceof ArrayBuffer)
      )
        setImage(e.target.result);
    };

    reader.readAsDataURL(fileRef.current.files[0]);
  };

  const uploadPost = async () => {
    if (!postRef || !postRef.current || !postRef.current.value) {
      alert("Post title not defined");
      return;
    }
    if (!contentRef || !contentRef.current || !contentRef.current.value) {
      alert("Post content is not defined");
      return;
    }
    setIsLoading(true);

    const title = postRef.current.value;

    const [htgs, updatedValue] = retreiveHashtags(contentRef.current.value);
    const content = `${updatedValue}`;
    const tags = [...hashtags, ...htgs];

    let fileId;
    if (
      fileRef &&
      fileRef.current &&
      fileRef.current.files &&
      fileRef.current.files.length
    ) {
      try {
        const file = fileRef.current.files[0];
        const response: any = await uploadFile(`${HostUrl}/image/new`, file);
        if (response && response["file_id"]) {
          fileId = response["file_id"];
        } else {
          throw new Error("IMAGE UPLOAD FAILED.");
        }
      } catch (error) {
        alert("Cannot upload file:\n" + error);
        setIsLoading(false);
      }
    }

    try {
      await createPost(title, content, tags, fileId);
      setIsLoading(false);
      return window.location.reload();
    } catch (error) {
      alert("Cannot create post:\n" + error);
      setIsLoading(false);
    }
  };

  const checkComment = () => {
    if (!contentRef || !contentRef.current || !contentRef.current.value) return;
    const value = contentRef.current.value;
    if (
      !value.length ||
      !value[value.length - 1] ||
      value[value.length - 1] !== " "
    )
      return;

    const [htgs, updatedValue] = retreiveHashtags(value);
    contentRef.current.value = `${updatedValue}`;
    setHashtags([...hashtags, ...htgs]);
  };

  const retreiveHashtags: (value: string) => [string[], string] = (value) => {
    const regexp = /#[a-zA-Z0-9]+/g;

    const matches = value.matchAll(regexp);

    const hashtags = [];

    // List all matches contained in value
    for (const match of matches) {
      const m = match[0];
      hashtags.push(m.replace("#", "").trim());
      value = value.replace(m, "");
    }
    return [hashtags, value.replace("  ", " ")];
  };

  return isLoading ? (
    <div className="mb-20">
      <Spinner />
    </div>
  ) : (
    <div
      className="w-2/5 md:w-8/12 sm:w-10/12 mx-auto rounded-lg bg-white mb-4"
      data-testid="new-post-component"
    >
      <div className="post-main p-4">
        <div className="flex">
          <img
            className="h-12 w-12 mr-2 rounded-lg"
            alt="New Post Avatar"
            src={poster && poster.avatar ? poster.avatar : avatarImage}
          />
          <input
            className="block w-full p-2 pl-4 bg-gray-100 border-gray-700 rounded-full placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
            id="comment"
            ref={postRef}
            type="text"
            placeholder="Insert the title"
          />
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Share your thoughts..."
            ref={contentRef}
            onChange={checkComment}
            className="w-full max-h-40 h-40 p-2 pl-4 bg-gray-100 border-gray-700 rounded-md placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          {image && (
            <img
              src={image}
              className="rounded-lg"
              alt="Post"
              data-testid="new post image"
            />
          )}
        </div>
        <div className="mt-4 flex flex-wrap">
          {hashtags.map((hashtag, k) => (
            <PostHashtag
              key={`HS_${k}`}
              hashtag={hashtag}
              onDelete={() => setHashtags(hashtags.filter((h, m) => k != m))}
            />
          ))}
        </div>
        <hr className="mb-4" />
        <div className="flex justify-evenly">
          <Button
            path={tagElement}
            text="Add a tag"
            color="#64bfff"
            onClick={addHashtag}
          />
          <Button
            path={photoElement}
            text={image ? `Remove the image` : `Add an image`}
            color="#ff5b4c"
            onClick={addOrRemoveImage}
          />
          <Button
            path={shareElement}
            text="Share on the network"
            color="#0e9f6e"
            onClick={uploadPost}
          />
        </div>
      </div>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={setImageSrc}
        ref={fileRef}
        data-testid="new-post-file-upload"
      />
    </div>
  );
};

export default NewPostComponent;
