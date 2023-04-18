import Link from "@mui/material/Link";
import clsx from "clsx";
import Image from "next/image";
import { memo, useMemo } from "react";

import textContent from "./content.json";

import styles from "./About.module.css";

export const About = memo(() => {

  const rulesList = useMemo(() => {
    return textContent.rules.map((rule) => (
      <li key={rule}>
        {rule}
      </li>
    ));
  }, []);

  return(
    <div className={styles.container}>
      <div className={styles.description}>
        <span className={styles.block}>
          {textContent.description}
        </span>
        <span className={styles.block}>{textContent.rulesTitle}</span>
        <ul className={clsx(styles.block, styles.list)}>
          {rulesList}
        </ul>
        <span className={styles.block}>
          {textContent.afterword}
        </span>
        <span className={styles.block}>
          You can learn more about the game at BBT page:
        </span>
        <Link
          href={textContent.link}
          target={"_blank"}
          className={clsx(styles.link, styles.block)}
        >
          bigbangtheory.fandom.com
        </Link>
      </div>
      <Image
        src={"/game-flow.png"}
        alt={"Game flow"}
        width={300}
        height={300}
      />
    </div>
  );
});

About.displayName = "About";

export default About;
