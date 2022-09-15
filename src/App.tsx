import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { readBuilderProgram } from "typescript";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

const boxVariants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "100px" },
};

const svgVari = {
  initial: {
    pathLength: 0,
    fill: "rgba(255,255,255,0)",
  },
  end: {
    pathLength: 1,
    fill: "rgba(255,255,255,1)",
    transition: {
      default: { duration: 2 },
      fill: { duration: 2, delay: 1 },
    },
  },
};

const Vari = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  end: { scale: 1, opacity: 1, rotateZ: 360 },
  leave: { opacity: 0, y: 20, scale: 0 },
};

const Svg = styled.svg`
  width: 300px;
  height: 300px;
`;

const Path = styled(motion.path)`
  stroke: white;
  strokewidth: 2;
`;

const visVar = {
  entry: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (back: boolean) => ({ x: back ? 500 : -500, opacity: 0, scale: 0 }),
};

const Grid = styled.div`
  display: grid;
  grid: repeat(3, 1fr);
`;

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const ss = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const [showing, setShowing] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const next = () => {
    setBack(false);
    setVisible((prev) => (prev == 10 ? 1 : prev + 1));
  };
  const prev = () => {
    setBack(true);
    setVisible((prev) => (prev == 1 ? 10 : prev - 1));
  };

  const toggleClicked = () => {
    setClicked((prev) => !prev);
  };

  return <Wrapper onClick={toggleClicked}></Wrapper>;
}

export default App;

//로고
// <Wrapper drag dragSnapToOrigin>

/* <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <Path
          variants={svgVari}
          initial="initial"
          animate="end"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></Path>
      </Svg> */

////나타났다 없어졌다
/* <AnimatePresence>
        {showing ? (
          <Box variants={Vari} initial="initial" animate="end" exit="leave" />
        ) : null}
      </AnimatePresence>
      <button
        onClick={() => {
          setShowing((prev) => !prev);
        }}
      >
        click
      </button> */

// 슬라이더 슉 슉
/* <AnimatePresence custom={back} exitBeforeEnter>
        <Box
          custom={back}
          variants={visVar}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={next}>next</button>
      <button onClick={prev}>prev</button> */

// layout으로 연동됨
/* <Box>{clicked ? <Circle layoutId="circle" /> : null}</Box>
      <Box>{!clicked ? <Circle layoutId="circle" /> : null}</Box> */
