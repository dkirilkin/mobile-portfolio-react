"use client";

import { useState } from "react";
import { chargingCase } from "@/data/portfolio";
import { ImageViewer } from "./image-viewer";
import styles from "@/styles/portfolio.module.css";

export function Perspective() {
  const [selected, setSelected] = useState(0);
  const perspective = chargingCase.perspectives[selected];
  return <div className={styles.perspective}>
    <div className={styles.perspectiveCopy}>
      <h2>Два взгляда<br />на одну услугу</h2>
      <div className={styles.roleSwitch} role="group" aria-label="Точка зрения на заказ">
        {chargingCase.perspectives.map((item, index) => <button key={item.id} type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.label}</button>)}
      </div>
      <div aria-live="polite" aria-atomic="true" className={styles.perspectiveText}>
        <h3>{perspective.title}</h3><p>{perspective.description}</p>
      </div>
    </div>
    <div className={styles.perspectiveVisual} key={perspective.id}><ImageViewer image={perspective.image} /></div>
  </div>;
}
