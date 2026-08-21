// Comic & Superhero Motion Physics for Scroll Reveal Animations

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 280,
      mass: 0.6,
    },
  },
};

export const comicPop = {
  hidden: {
    opacity: 0,
    scale: 0.93,
    y: 20,
    rotate: -1.2,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 260,
      mass: 0.7,
    },
  },
};

export const comicStamp = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    rotate: 4,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 340,
      mass: 0.5,
    },
  },
};

export const slideUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 240,
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

