import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";

import SectionCards from "../components/card/section-cards";

import {
  getVideos,
  getWatchItAgainVideos,
} from "../lib/videos";
import useRedirectUser from "../utils/redirectUser";

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const officialMusicVideos = await getVideos("the strokes official music video");
  const livePerformances = await getVideos("the strokes band live");
  const coverSongs = await getVideos("the strokes cover song");
  const interviews = await getVideos("the strokes band interview");
  const tutorials = await getVideos("the strokes tutorial");

  return {
    props: {
      officialMusicVideos,
      livePerformances,
      watchItAgainVideos,
      coverSongs,
      interviews,
      tutorials
    },
  };
}

export default function Home({
  officialMusicVideos,
  livePerformances,
  watchItAgainVideos,
  coverSongs,
  interviews,
  tutorials
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>StrokesFlix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar username="" />
        <Banner
          videoId="zHnjtT94deI"
          title="In Transit"
          subTitle="a strokes movie"
          imgUrl="/static/strokes-band.webp"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Strokes Official Music Videos" videos={officialMusicVideos} size="large" />
          <SectionCards title="Live Performances" videos={livePerformances} size="small" />
          <SectionCards title="Cover Songs" videos={coverSongs} size="small" />
          <SectionCards title="Interviews" videos={interviews} size="small" />
          <SectionCards title="Tutorials" videos={tutorials} size="small" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
