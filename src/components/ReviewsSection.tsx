import React from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Chhun Channy",
      avatar: "/src/assets/channy-1.jpg",
      rating: 5,
      review:
        "The quality of fresh produce is absolutely amazing! Everything arrives perfectly fresh and the same-day delivery is a game changer for our family.",
      verified: true,
    },
    {
      id: 2,
      name: "Channy Chhun",
      avatar: "/src/assets/channy-1.jpg",
      rating: 5,
      review:
        "I've been ordering from FoodByte for months now. The artisan breads and organic products are top-notch, and the customer service is exceptional.",
      verified: true,
    },
    {
      id: 3,
      name: "Neang Neang",
      avatar: "/src/assets/channy-1.jpg",
      rating: 4,
      review:
        "Love the variety and freshness guarantee! The seasonal vegetable boxes have introduced our family to so many new flavors. Highly recommend!",
      verified: true,
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied families who trust us for their fresh
            food needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground mb-6 line-height-relaxed">
                "{review.review}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage
                    src={review.avatar}
                    alt={review.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">
                      {review.name}
                    </h4>
                    {review.verified && (
                      <div className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Verified Customer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-sm">Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">2,500+</span>
              <span className="text-sm">Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">98%</span>
              <span className="text-sm">Would Recommend</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
