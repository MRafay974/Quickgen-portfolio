"use client";

const mediaArticles = [
  {
    source: "Core 77 Feature",
    title: "See How the Product Development Specialists at Brash Help Startups…",
    image: "https://placehold.co/480x320/e5e7eb/6b7280?text=Core77+Article",
  },
  {
    source: "Client Story - Veba Baby",
    title: "An innovation is born: new mom pitches baby bottle monitor on Shark Tank",
    image: "https://placehold.co/480x320/dbeafe/3b82f6?text=Veba+Baby+Story",
  },
  {
    source: "Ottawa Business Journal",
    title: "Forty Under 40 Recipients",
    image: "https://placehold.co/480x320/1c1917/f5f5f4?text=Forty+Under+40",
  },
];

const videoItems = [
  {
    source: "Youtube",
    title: "BreatheSuite's Startup Story",
    image: "https://placehold.co/480x320/374151/9ca3af?text=BreatheSuite+Video",
    caption: "Do you have any advice for your younger self starting out?",
  },
  {
    source: "YouTube",
    title: "AVSS Startup Story",
    image: "https://placehold.co/480x320/374151/9ca3af?text=AVSS+Video",
    caption:
      "If you had a piece of advice for somebody that wants to get started on their own business, what would it be?",
  },
  {
    source: "YouTube",
    title: "Veba's Startup Story",
    image: "https://placehold.co/480x320/374151/9ca3af?text=Veba+Video",
    caption:
      'Are there any moments where you are like, "Oh my God, I\'m the adult in the room?"',
  },
];

const blogPosts = [
  {
    source: "Brash Blog",
    title: "Through the Looking Glass: Corporate Rebrands",
    author: "Emily Gray",
    tags: ["Design", "Entrepreneurship"],
    image: "https://placehold.co/680x400/1e3a8a/bfdbfe?text=Corporate+Rebrands",
  },
  {
    source: "Brash Blog",
    title: "Reduce Tariff Risk Through Supply Chain Optimization",
    author: "Emily Gray",
    tags: ["Design", "Engineering", "Entrepreneurship"],
    image: "https://placehold.co/680x400/78350f/fde68a?text=Supply+Chain",
  },
  {
    source: "Brash Blog",
    title: "7 Key Steps in New Product Development: An Overview",
    author: "Rohan Thakar",
    tags: ["Design", "Entrepreneurship"],
    image: "https://placehold.co/680x400/064e3b/6ee7b7?text=Product+Development",
  },
  {
    source: "Brash Blog",
    title: "Managing Product Scope",
    author: "Michelle Riccetto",
    tags: ["Design", "Entrepreneurship"],
    image: "https://placehold.co/680x400/1f2937/d1d5db?text=Product+Scope",
  },
  {
    source: "Brash Blog",
    title: "The Wireless Big 3",
    author: "Ali Morbi",
    tags: ["Software + UI/UX"],
    image: "https://placehold.co/680x400/111827/6b7280?text=Wireless+Big+3",
  },
  {
    source: "Brash Blog",
    title: "User Testing in Product Development",
    author: "Michelle Riccetto",
    tags: ["Design", "Engineering"],
    image: "https://placehold.co/680x400/fef3c7/92400e?text=User+Testing",
  },
];

export default function MediaPageContent() {
  return (
    <main className="w-full font-sans text-zinc-950 bg-white">

      {/* ─────────────────────────────────────────
          SECTION 1 – Hero
      ───────────────────────────────────────── */}
      <section className="px-6 lg:px-16 pt-14 pb-10">
        <h1
          className="text-[clamp(3rem,8vw,5rem)] font-black leading-none tracking-tight"
          style={{ fontWeight: 900 }}
        >
          Media
        </h1>
        <p className="mt-3 text-base text-zinc-500 tracking-wide">
          Join the conversation.
        </p>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 2 – What we've been up to
      ───────────────────────────────────────── */}
      <section className="bg-black text-white px-6 lg:px-16 pt-14 pb-16">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-black mb-2">
          What we&apos;ve been up to.
        </h2>
        <p className="text-zinc-400 text-base mb-10">
          Guest articles and client stories.
        </p>

        {/* ── Row 1: Article / Press cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mediaArticles.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl overflow-hidden bg-zinc-900 flex flex-col cursor-pointer hover:scale-[1.01] transition-transform duration-200"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Meta */}
              <div className="p-5 flex flex-col gap-1">
                <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  {item.source}
                </span>
                <h3 className="text-base font-bold leading-snug text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ── Row 2: YouTube / Video cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {videoItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl overflow-hidden bg-zinc-800 flex flex-col cursor-pointer hover:scale-[1.01] transition-transform duration-200"
            >
              {/* Thumbnail with caption overlay */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-700">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <p className="text-white text-center text-sm font-medium leading-snug drop-shadow">
                    {item.caption}
                  </p>
                </div>
              </div>
              {/* Meta */}
              <div className="p-5 flex flex-col gap-1">
                <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  {item.source}
                </span>
                <h3 className="text-base font-bold leading-snug text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SECTION 3 – Blog / What we are talking about
      ───────────────────────────────────────── */}
      <section className="px-6 lg:px-16 pt-16 pb-20 bg-white">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-black mb-1">
          What we are talking about.
        </h2>
        <p className="text-zinc-500 text-base mb-1">Our teams blog.</p>

        {/* Divider */}
        <hr className="border-zinc-200 mb-10 mt-6" />

        {/* Blog grid – 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {blogPosts.map((post) => (
            <div
              key={post.title}
              className="flex flex-col gap-3 cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="rounded-xl overflow-hidden aspect-[16/9] bg-zinc-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-zinc-400 font-medium">
                  {post.source}
                </span>
                <h3 className="text-xl font-bold leading-snug text-zinc-950 group-hover:underline underline-offset-2">
                  {post.title}
                </h3>
                <p className="text-sm text-zinc-500 mt-0.5">{post.author}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full border border-zinc-300 text-xs font-medium text-zinc-700 bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center mt-14">
          <button className="px-8 py-3 rounded-full bg-zinc-100 text-zinc-500 text-sm font-medium hover:bg-zinc-200 transition-colors cursor-pointer">
            Load more
          </button>
        </div>
      </section>
    </main>
  );
}