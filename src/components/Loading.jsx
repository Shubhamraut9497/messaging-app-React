import { MutatingDots } from "react-loader-spinner";
import React from "react";

function Loading() {
  return (
    <div>
      <MutatingDots
        height="30"
        width="80"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="6.25"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loading;
