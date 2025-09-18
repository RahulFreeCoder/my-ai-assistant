import React from 'react';

const PostImage = ({ alt, src }) => {
  return (
    <div className="my-8 flex justify-center">
      <img
        src={src}
        alt={alt}
        className="w-full max-w-2xl rounded-lg shadow-lg"
      />
    </div>
  );
};

export default PostImage;