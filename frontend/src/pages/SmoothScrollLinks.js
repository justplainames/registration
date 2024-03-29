import { Link as ScrollLink } from "react-scroll";

function SmoothScrollLinks() {
  return (
    <>
      <ScrollLink to="landingPage2" smooth={true} duration={500}>
        Go to Landing Page2
      </ScrollLink>
      <ScrollLink to="landingPage3" smooth={true} duration={500}>
        Go to Landing Page 3
      </ScrollLink>
    </>
  );
}

export default SmoothScrollLinks;
