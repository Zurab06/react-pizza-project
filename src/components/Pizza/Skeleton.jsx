import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="131" r="130" /> 
    <rect x="8" y="270" rx="7" ry="7" width="280" height="29" /> 
    <rect x="102" y="365" rx="0" ry="0" width="3" height="2" /> 
    <rect x="8" y="315" rx="8" ry="8" width="281" height="70" /> 
    <rect x="8" y="401" rx="8" ry="8" width="154" height="52" /> 
    <rect x="169" y="401" rx="8" ry="8" width="121" height="51" />
  </ContentLoader>
)

export default Skeleton

