import { useMediaQuery } from "../../hooks/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./banner.module.css";

const Banner = (props) => {
  const { title, subTitle, videoId } = props;
  const router = useRouter();

  const isBreakpoint = useMediaQuery(1024);

  const handleOnPlay = () => {
    router.push(`video/${videoId}`);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.videoOverlay} noselect`}>
        <h3 className={styles.title}>{title}</h3>
        <h3 className={styles.subTitle}>{subTitle}</h3>
          <button className={styles.btnWithIcon} onClick={handleOnPlay}>
            <Image
              src="/static/play_arrow.svg"
              alt="Play icon"
              width="32px"
              height="32px"
            />
            <span className={styles.playText}>Watch Now</span>
          </button>
      </div>
      <div className={styles.imgContainer}>
        <img 
          className={styles.bannerImage} 

          src={!isBreakpoint ? "/static/strokes-band.webp" : "/static/strokes-band-mobile.webp"}
          alt="The Strokes Band Picture"
          />
      </div>
    </div>
  );
};

export default Banner;