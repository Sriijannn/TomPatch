const REVIEWS = [
  {
    name: "Sarah Chen",
    review:
      "The seamless integration saved us hours of development time. Highly recommended!",
  },
  {
    name: "Marcus Rodriguez",
    review:
      "Security was our top concern, and they delivered beyond expectations.",
  },
  {
    name: "Elena Kowalski",
    review:
      "Best decision we made this year. The team is responsive and professional.",
  },
  {
    name: "James Mitchell",
    review:
      "Smooth implementation, great support. Everything we needed and more.",
  },
  {
    name: "Priya Patel",
    review: "Outstanding platform. The security features are industry-leading.",
  },
  {
    name: "David Kim",
    review: "Couldn't be happier with the results. Worth every penny.",
  },
];

export default function Bridge() {
  return (
    <section className="w-full pt-16 pb-16 overflow-hidden bg-transparent">
      <div className="flex items-center justify-center mb-16">
        <p className="text-2xl md:text-6xl text-center font-bold text-[f6f6f6] bg-clip-text">
          SEAMLESSLY SECURE
        </p>
      </div>

      <div className="relative w-full">
        <div className="flex w-full overflow-hidden select-none">
          <div className="flex flex-shrink-0 items-center gap-6 pr-6 animate-infinite-scroll group">
            {REVIEWS.map((review, idx) => (
              <ReviewCard key={`track1-${idx}`} review={review} />
            ))}
          </div>

          {/* TRACK 2 (Duplicate) */}
          <div
            className="flex flex-shrink-0 items-center gap-6 pr-6 animate-infinite-scroll group"
            aria-hidden="true"
          >
            {REVIEWS.map((review, idx) => (
              <ReviewCard key={`track2-${idx}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }

        /* Pause animation when hovering over EITHER track.
           We target the parent's hover state to pause both tracks simultaneously 
           so they don't get out of sync.
        */
        div:hover > .animate-infinite-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// Sub-component to ensure UI consistency and code cleanliness
function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div className="relative flex-shrink-0 w-[300px] md:w-96 border border-gray-700 rounded-xl p-8 transition-all duration-300 hover:border-amber-50">
      {/* Review text */}
      <p className="text-gray-300 text-base leading-relaxed mb-6 min-h-[80px]">
        "{review.review}"
      </p>

      {/* Author name */}
      <p className="text-[#f6f6f6] font-semibold text-sm tracking-wide">
        {review.name}
      </p>
    </div>
  );
}
