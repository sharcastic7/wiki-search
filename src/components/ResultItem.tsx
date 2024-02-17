import { PageType } from "@/types";
import { CSSProperties } from "react";
import Image from "next/image";
import styles from "../app/page.module.css";
import NoImage from "../../public/no-image.svg";
import Link from "next/link";

type ResultItemProps = {
  item: PageType;
  style: CSSProperties;
};

export const ResultItem = ({ item, style }: ResultItemProps) => (
  <Link
    href={`https://en.wikipedia.org/wiki/${item.title.replace(/ /g, "_")}`}
    target="_blank"
  >
    <div className={styles.resultItem} style={style}>
      <Image
        src={item.thumbnail?.source || NoImage}
        width={120}
        height={120}
        alt={item.title}
        className={styles.thumbnail}
      />
      <div>
        <h4>{item.title}</h4>
        {item.description ? <p>{item.description}</p> : null}
      </div>
    </div>
  </Link>
);
