import { useState } from "react";
import Image from "next/image";

import cls from "classnames";
import { motion } from "framer-motion";

import styles from "./card.module.css";

const Card = (props) => {
  const {
    imgUrl = "/static/default.webp",
    size = "medium",
    id,
    shouldScale = true,
  } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc(
      "/static/default.webp"
    );
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        {...shouldHover}
      >
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
      <span style={{color: 'whitesmoke'}}>{props.title}</span>
    </div>
  );
};

export default Card;
