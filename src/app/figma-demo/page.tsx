import type { Metadata } from "next";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Figma Demo | Mobile Portfolio",
  description: "Тестовая HTML + CSS верстка мобильного экрана по фрейму из Figma.",
};

const quickIcons = Array.from({ length: 4 }, (_, index) => ({
  id: `quick-${index}`,
  label: "Label",
}));

const squareCards = Array.from({ length: 4 }, (_, index) => ({
  id: `square-${index}`,
  label: "Label",
}));

const posterCards = Array.from({ length: 3 }, (_, index) => ({
  id: `poster-${index}`,
  artist: "Artist",
  song: "Song",
}));

const relatedCards = Array.from({ length: 4 }, (_, index) => ({
  id: `related-${index}`,
  label: "Label",
}));

const listItems = Array.from({ length: 2 }, (_, index) => ({
  id: `list-${index}`,
  title: "Headline",
  description:
    "Description duis aute irure dolor in reprehenderit in voluptate velit.",
}));

function PlaceholderArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <span className={styles.artDrop} />
      <span className={styles.artBurst} />
      <span className={styles.artBlock} />
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      className={styles.arrowIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
    >
      <path d="M3 12H19" />
      <path d="M12 5L19 12L12 19" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      className={styles.bellIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
    >
      <path d="M9.5 18C10 19.2 10.9 20 12 20C13.1 20 14 19.2 14.5 18" />
      <path d="M6.7 16.2H17.3C16.5 15.4 16 14.3 16 13.1V10.7C16 8.5 14.2 6.7 12 6.7C9.8 6.7 8 8.5 8 10.7V13.1C8 14.3 7.5 15.4 6.7 16.2Z" />
      <path d="M12 4V6.3" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      className={styles.gearIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15A7.8 7.8 0 0 0 19.8 12A7.8 7.8 0 0 0 19.4 9L21 7.7L19 4.4L17 5.2A7.9 7.9 0 0 0 14.2 3.6L14 1.5H10L9.8 3.6A7.9 7.9 0 0 0 7 5.2L5 4.4L3 7.7L4.6 9A7.8 7.8 0 0 0 4.2 12C4.2 13 4.3 14 4.6 15L3 16.3L5 19.6L7 18.8A7.9 7.9 0 0 0 9.8 20.4L10 22.5H14L14.2 20.4A7.9 7.9 0 0 0 17 18.8L19 19.6L21 16.3L19.4 15Z" />
    </svg>
  );
}

function AvatarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="42"
      height="42"
      className={styles.avatarIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="8.3" r="3.1" />
      <path d="M6.8 17.5C8 15.4 9.8 14.4 12 14.4C14.2 14.4 16 15.4 17.2 17.5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      className={styles.playIcon}
      fill="currentColor"
    >
      <path d="M8 5.4L18.5 12L8 18.6V5.4Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      className={styles.addIcon}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.2"
    >
      <path d="M12 5V19" />
      <path d="M5 12H19" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={styles.starIcon}
      fill="currentColor"
    >
      <path d="M12 3.8L14.5 8.8L20 9.6L16 13.5L17 19L12 16.3L7 19L8 13.5L4 9.6L9.5 8.8L12 3.8Z" />
    </svg>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <ArrowRightIcon />
    </div>
  );
}

export default function FigmaDemoPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.screen}>
          <div className={styles.statusBar}>
            <span>9:30</span>
            <div className={styles.statusRight} aria-hidden="true">
              <span className={styles.wifi} />
              <span className={styles.signal} />
              <span className={styles.battery} />
            </div>
          </div>

          <header className={styles.header}>
            <div className={styles.topIcons}>
              <AvatarIcon />
              <div className={styles.topRightIcons}>
                <BellIcon />
                <GearIcon />
              </div>
            </div>
            <h1 className={styles.label}>Label</h1>
          </header>

          <div className={styles.content}>
            <section className={`${styles.section} ${styles.sectionCompact}`}>
              <SectionHeader title="Section title" />
              <div className={styles.scrollRow}>
                {quickIcons.map((item) => (
                  <article key={item.id} className={styles.iconChip}>
                    <div className={styles.iconCircle}>
                      <PlaceholderArt />
                    </div>
                    <p className={styles.iconLabel}>{item.label}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={`${styles.section} ${styles.sectionMedium}`}>
              <SectionHeader title="Section title" />
              <div className={styles.hero}>
                <div className={styles.heroRow}>
                  <div className={styles.heroArt}>
                    <PlaceholderArt />
                  </div>
                  <div className={styles.heroSide}>
                    <div className={styles.heroSideArt}>
                      <PlaceholderArt />
                    </div>
                  </div>
                </div>
                <div className={styles.heroMeta}>
                  <div>
                    <div className={styles.heroArtist}>Artist</div>
                    <div className={styles.heroTitle}>Title</div>
                  </div>
                  <button
                    type="button"
                    className={styles.playButton}
                    aria-label="Play"
                  >
                    <PlayIcon />
                  </button>
                </div>
              </div>
            </section>

            <section className={`${styles.section} ${styles.sectionLarge}`}>
              <SectionHeader title="Section title" />
              <div className={styles.cardsRow}>
                {squareCards.map((item) => (
                  <article key={item.id} className={styles.squareCard}>
                    <div className={styles.squareVisual}>
                      <PlaceholderArt />
                    </div>
                    <p className={styles.squareLabel}>{item.label}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={`${styles.section} ${styles.sectionLarge}`}>
              <SectionHeader title="Section title" />
              <div className={styles.posterRow}>
                {posterCards.map((item) => (
                  <article key={item.id} className={styles.posterCard}>
                    <div className={styles.posterVisual}>
                      <PlaceholderArt />
                    </div>
                    <div className={styles.posterArtist}>{item.artist}</div>
                    <div className={styles.posterSong}>{item.song}</div>
                  </article>
                ))}
              </div>
            </section>

            <section className={`${styles.section} ${styles.sectionLarge}`}>
              <SectionHeader title="Section title" />
              <div className={styles.list}>
                {listItems.map((item) => (
                  <article key={item.id} className={styles.listItem}>
                    <div className={styles.listArt}>
                      <PlaceholderArt />
                    </div>
                    <div>
                      <h3 className={styles.listTitle}>{item.title}</h3>
                      <p className={styles.listDescription}>{item.description}</p>
                      <div className={styles.listMeta}>
                        <span className={styles.addBadge}>
                          <PlusIcon />
                        </span>
                        <span>Today • 23 min</span>
                      </div>
                    </div>
                    <PlayIcon />
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.moreLike}>
              <div className={styles.moreLikeHead}>
                <div className={styles.miniCircle}>
                  <div className={styles.miniCircleArt}>
                    <PlaceholderArt />
                  </div>
                </div>
                <div>
                  <div className={styles.eyebrow}>More like</div>
                  <div className={styles.moreTitle}>Title</div>
                </div>
                <ArrowRightIcon />
              </div>

              <div className={styles.cardsRow}>
                {relatedCards.map((item) => (
                  <article key={item.id} className={styles.squareCard}>
                    <div className={styles.squareVisual}>
                      <PlaceholderArt />
                    </div>
                    <p className={styles.squareLabel}>{item.label}</p>
                  </article>
                ))}
              </div>

              <p className={styles.summary}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore...
              </p>
            </section>

            <div className={styles.navBar}>
              <nav className={styles.navItems} aria-label="Bottom navigation">
                <div className={`${styles.navItem} ${styles.navItemActive}`}>
                  <div className={styles.navIndicator}>
                    <StarIcon />
                  </div>
                  <span className={styles.navLabel}>Label</span>
                </div>
                <div className={styles.navItem}>
                  <div className={styles.navIndicator}>
                    <StarIcon />
                  </div>
                  <span className={styles.navLabel}>Label</span>
                </div>
                <div className={styles.navItem}>
                  <div className={styles.navIndicator}>
                    <StarIcon />
                  </div>
                  <span className={styles.navLabel}>Label</span>
                </div>
              </nav>
            </div>

            <div className={styles.gestureBarWrap}>
              <div className={styles.gestureBar} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
