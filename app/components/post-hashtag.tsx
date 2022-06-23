const deleteSvg = (
  <svg
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 26 26"
    className="rounded-md"
    style={{ width: "16px", backgroundColor: "white" }}
  >
    <g>
      <path
        fill="#ff0000"
        d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25
		C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0
		L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467
		L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468
		c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467
		C19.033,16.725,19.033,17.138,18.78,17.394z"
      />
    </g>
  </svg>
);

const PostHashtag = ({
  hashtag,
  onDelete,
}: {
  hashtag: string;
  onDelete?: () => void;
}) => (
  <div
    className="bg-blue-500 text-white py-1 px-2 text-sm rounded-full mr-1 sm:m-2 mb-1 relative"
    data-testid={hashtag}
  >
    <p>{`#${hashtag}`}</p>

    {!!onDelete && (
      <div
        className="cursor-pointer absolute top-[-6px] right-0"
        onClick={onDelete}
        data-testid={`delete ${hashtag}`}
      >
        {deleteSvg}
      </div>
    )}
  </div>
);

export default PostHashtag;
