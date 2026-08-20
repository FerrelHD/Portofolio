import { soundFX } from "./soundFx";

export const ACHIEVEMENTS = {
  SPIDER_SENSE: {
    id: "spider_sense",
    title: "Spider-Sense Tingling!",
    description: "Picu Spider-Sense dengan tombol 'S' atau via interaksi.",
    icon: "🕷️",
    badge: "Sixth Sense",
  },
  MULTIVERSE_TRAVELER: {
    id: "multiverse_traveler",
    title: "Suit Collector",
    description: "Coba seluruh 4 kostum Spider-Man di Gadget Drawer.",
    icon: "🎨",
    badge: "Multiverse Hopper",
  },
  TERMINAL_HACKER: {
    id: "terminal_hacker",
    title: "Web Terminal Hacker",
    description: "Buka Command Palette dengan Ctrl+K atau Cmd+K.",
    icon: "⌨️",
    badge: "Power User",
  },
  DAILY_BUGLE: {
    id: "daily_bugle",
    title: "Front Page Headline",
    description: "Buka dan baca laporan koran The Daily Bugle.",
    icon: "📰",
    badge: "Press Star",
  },
  BUG_SQUASHER: {
    id: "bug_squasher",
    title: "Senior Bug Squasher",
    description: "Mainkan mini-game Spidey Bug Hunter & raih poin.",
    icon: "🕹️",
    badge: "Code Defender",
  },
  COMIC_HERO: {
    id: "comic_hero",
    title: "Comic Action Master",
    description: "Picu 8 efek pop-up komik dengan mengklik aksi interaktif.",
    icon: "💥",
    badge: "Action Star",
  },
  TRUE_BELIEVER: {
    id: "true_believer",
    title: "True Believer",
    description: "Jelajahi seluruh cerita portofolio sampai ke footer.",
    icon: "📜",
    badge: "Stan Lee Tribute",
  },
};

const STORAGE_KEY = "spidey_achievements_unlocked";
const SUITS_TRIED_KEY = "spidey_suits_tried";
const COMIC_CLICKS_KEY = "spidey_comic_clicks_count";

class AchievementManager {
  constructor() {
    this.listeners = new Set();
    this.unlocked = new Set();
    this.suitsTried = new Set(["classic"]);
    this.comicClicks = 0;

    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const arr = JSON.parse(saved);
          if (Array.isArray(arr)) {
            arr.forEach((id) => this.unlocked.add(id));
          }
        }
        const savedSuits = localStorage.getItem(SUITS_TRIED_KEY);
        if (savedSuits) {
          const arr = JSON.parse(savedSuits);
          if (Array.isArray(arr)) {
            arr.forEach((s) => this.suitsTried.add(s));
          }
        }
        const savedClicks = localStorage.getItem(COMIC_CLICKS_KEY);
        if (savedClicks) {
          this.comicClicks = parseInt(savedClicks, 10) || 0;
        }
      } catch (e) {}
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(event, data) {
    this.listeners.forEach((cb) => {
      try {
        cb(event, data);
      } catch (e) {}
    });
  }

  save() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.unlocked)));
      localStorage.setItem(SUITS_TRIED_KEY, JSON.stringify(Array.from(this.suitsTried)));
      localStorage.setItem(COMIC_CLICKS_KEY, this.comicClicks.toString());
    } catch (e) {}
  }

  unlock(achievementId) {
    const item = Object.values(ACHIEVEMENTS).find((a) => a.id === achievementId);
    if (!item) return false;

    if (!this.unlocked.has(achievementId)) {
      this.unlocked.add(achievementId);
      this.save();
      soundFX.playFanfare();
      this.notify("unlock", item);
      return true;
    }
    return false;
  }

  isUnlocked(achievementId) {
    return this.unlocked.has(achievementId);
  }

  getUnlockedList() {
    return Array.from(this.unlocked);
  }

  getTotalCount() {
    return Object.keys(ACHIEVEMENTS).length;
  }

  getUnlockedCount() {
    return this.unlocked.size;
  }

  // Helper tracking
  trackSuit(suitId) {
    this.suitsTried.add(suitId);
    this.save();
    if (this.suitsTried.size >= 4) {
      this.unlock("multiverse_traveler");
    }
  }

  trackComicClick() {
    this.comicClicks += 1;
    this.save();
    if (this.comicClicks >= 8) {
      this.unlock("comic_hero");
    }
  }
}

export const achievementManager = new AchievementManager();
