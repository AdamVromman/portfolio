import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BouncingIconProps {
  children: React.ReactNode;
}

const BouncingIcon = ({ children }: BouncingIconProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { contextSafe } = useGSAP(() => {}, { scope: linkRef });

  const [x1, setX1] = useState(-1);
  const [y1, setY1] = useState(-1);
  const [x2, setX2] = useState(-1);
  const [y2, setY2] = useState(-1);
  const [rotation, setRotation] = useState<gsap.core.Tween | undefined>(
    undefined
  );
  const [movement, setMovement] = useState<gsap.core.Tween | undefined>(
    undefined
  );

  useGSAP(
    () => {
      if (linkRef.current) {
        generatePath();
      }
    },
    { scope: linkRef, dependencies: [] }
  );

  const checkIfSameWall = (randomValue: number, x1: number, y1: number) => {
    switch (randomValue) {
      case 0:
        return y1 === 0;
      case 1:
        return x1 === 100;
      case 2:
        return y1 === 100;
      case 3:
        return x1 === 0;
    }
  };

  const generateCoordinates = (x1: number, y1: number) => {
    let x2 = 0,
      y2 = 0;
    let randomEdge = Math.floor(Math.random() * 4);
    let stop = 0;
    while (checkIfSameWall(randomEdge, x1, y1) || stop < 10) {
      randomEdge = Math.floor(Math.random() * 4);
      stop++;
    }

    switch (randomEdge) {
      case 0:
        x2 = 20 + Math.random() * 60;
        y2 = 0;
        break;
      case 1:
        x2 = 100;
        y2 = 20 + Math.random() * 60;
        break;
      case 3:
        x2 = 20 + Math.random() * 60;
        y2 = 100;
        break;
      default:
      case 4:
        x2 = 0;
        y2 = 20 + Math.random() * 60;
        break;
    }
    return { localX2: x2, localY2: y2 };
  };

  const getOppositeAngle = (x1: number, y1: number, x2: number, y2: number) => {
    let x = 0,
      y = 0;
    if (x2 === 0) {
      x =
        y2 + (y2 - y1) > 100 || y2 + (y2 - y1) < 0 ? Math.random() * 100 : 100;
      y = Math.min(100, Math.max(y2 + (y2 - y1), 0));
    } else if (x2 === 100) {
      x = y2 + (y2 - y1) > 100 || y2 + (y2 - y1) < 0 ? Math.random() * 100 : 0;
      y = Math.min(100, Math.max(y2 + (y2 - y1), 0));
    } else if (y2 === 0) {
      y =
        x2 + (x2 - x1) > 100 || x2 + (x2 - x1) < 0 ? Math.random() * 100 : 100;
      x = Math.min(100, Math.max(x2 + (x2 - x1), 0));
    } else if (y2 === 100) {
      y = x2 + (x2 - x1) > 100 || x2 + (x2 - x1) < 0 ? Math.random() * 100 : 0;
      x = Math.min(100, Math.max(x2 + (x2 - x1), 0));
    }
    return { localX2: x, localY2: y };
  };

  const generatePath = contextSafe(() => {
    let localX1 = x2 !== -1 ? x2 : Math.random() * 100;
    let localY1 = y2 !== -1 ? y2 : Math.random() * 100;
    let { localX2, localY2 } =
      x2 !== -1
        ? getOppositeAngle(x1, y1, x2, y2)
        : generateCoordinates(x1, y1);

    const rotationDirection = Math.random() > 0.5;
    const localRotation = gsap.to(linkRef.current, {
      rotation: rotationDirection ? 360 : -360,
      duration: 10,
      repeat: -1,
      ease: "none",
    });

    const zIndex = Math.random() > 0.5;

    gsap.to(linkRef.current, { zIndex: zIndex ? 10 : 30 });
    const localMovement = gsap.fromTo(
      linkRef.current,
      { top: `${localY1}%`, left: `${localX1}%` },
      {
        top: `${localY2}%`,
        left: `${localX2}%`,
        ease: "none",
        duration: (Math.abs(x2 - x1) + Math.abs(y2 - y1)) / 15,
        //onComplete: () => generatePath(),
      }
    );

    setX1(localX1);
    setY1(localY1);
    setX2(localX2);
    setY2(localY2);
    setRotation(localRotation);
    setMovement(localMovement);
  });

  const onEnter = () => {
    gsap.to(linkRef.current, { scale: 1.2, duration: 1, ease: "elastic" });
    // setMouseElement(getString(["pages", projects[i].id, "title"]));
    // setMouseElementVisible();
    rotation?.timeScale(0.2);
    movement?.timeScale(0.2);
  };

  const onLeave = () => {
    gsap.to(linkRef.current, { scale: 1, duration: 0.5, overwrite: "auto" });
    // setMouseElementInvisible();
    rotation?.timeScale(1);
    movement?.timeScale(1);
  };

  const imageHovers = () => {
    if (linkRef.current) {
      if (window.innerWidth > 768) {
        linkRef.current.addEventListener("mouseenter", () => {
          onEnter();
        });
        linkRef.current.addEventListener("mouseleave", () => {
          onLeave();
        });

        linkRef.current.addEventListener("focus", () => {
          onEnter();
        });
        linkRef.current.addEventListener("blur", () => {
          onLeave();
        });
      } else {
        linkRef.current.addEventListener("click", () => {
          //   setMouseElementInvisible();
        });
      }
    }
  };

  return (
    <a className="background_bouncing-icon" ref={linkRef}>
      {children}
    </a>
  );
};

export default BouncingIcon;
