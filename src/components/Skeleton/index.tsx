import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader 
    speed={2}
    width={480}
    height={80}
    viewBox="0 0 480 80"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="90" y="16" rx="3" ry="3" width="220" height="18" /> 
    <rect x="91" y="49" rx="3" ry="3" width="212" height="16" /> 
    <circle cx="57" cy="45" r="19" /> 
    <rect x="-4" y="37" rx="0" ry="0" width="29" height="22" /> 
    <circle cx="366" cy="40" r="21" /> 
    <circle cx="309" cy="105" r="25" /> 
    <circle cx="426" cy="42" r="22" />
  </ContentLoader>
)

export default MyLoader