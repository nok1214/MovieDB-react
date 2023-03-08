export const OPTIONS = {
  NOW_PLAYING: { title: "Now Playing", value: "now_playing" },
  POPULAR: { title: "Popular", value: "popular" },
  TOP_RATED: { title: "Top Rated", value: "top_rated" },
  UP_COMING: { title: "Upcoming", value: "upcoming" },
};

export const RATINGS = Array.from({ length: 10 }, (_, i) => i + 1);
