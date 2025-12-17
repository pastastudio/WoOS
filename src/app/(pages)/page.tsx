'use client';

import Image from 'next/image';
import styles from './page.module.css';

const layer_1 = <Image src='/keyart/index-1.png' alt='Layer 1' fill></Image>;

const layer_2 = <Image src='/keyart/index-2.png' alt='Layer 2' fill></Image>;

const layer_3 = <Image src='/keyart/index-3.png' alt='Layer 3' fill></Image>;

const layer_4 = <Image src='/keyart/index-4.png' alt='Layer 4' fill></Image>;

const layer_5 = <Image src='/keyart/index-5.png' alt='Layer 5' fill></Image>;

const layer_6 = <Image src='/keyart/index-6.png' alt='Layer 6' fill></Image>;

const layer_7 = <Image src='/keyart/index-7.png' alt='Layer 7' fill></Image>;

function moveLayer(layer: HTMLElement, speed: number, scrollPosition: number) {
  const y = (scrollPosition * speed) / 10;
  layer.style.transform = `translate3d(0, -${y}px, 0)`;
}

export default function Page() {
  return (
    <>
      <div className='keyart'>
        <div className={styles.layer + styles.parallax}>{layer_7}</div>
        <div className={styles.layer + styles.parallax}>{layer_6}</div>
        <div className={styles.layer + styles.parallax}>{layer_5}</div>
        <div className={styles.layer + styles.parallax}>{layer_4}</div>
        <div className={styles.layer + styles.parallax}>{layer_3}</div>
        <div className={styles.layer + styles.parallax}>{layer_2}</div>
        <div className={styles.layer + styles.parallax}>{layer_1}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <p>
            Willkommen auf der offiziellen Website von DM-WT – Ihrem digitalen
            Begleiter für das Wizard of OS Projekt! Hier finden Sie alle
            Informationen, Neuigkeiten und Ressourcen rund um das spannende
            Vorhaben, die Zukunft der Betriebssysteme zu gestalten.
          </p>
        </div>
      </div>
    </>
  );
}
