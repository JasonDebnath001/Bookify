import React from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import heroIllustration from "@/assets/hero-illustration.png";
import { sampleBooks } from "@/lib/constants";
import BookCard from "@/components/BookCard";

const page = () => {
  return (
    <main className="wrapper container">
      <div
        className="min-h-screen pt-[var(--navbar-height)]"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {/* Hero Section */}
        <div
          className="max-w-7xl mx-auto rounded-2xl p-12 shadow-lg m-8"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Left Section */}
            <div className="space-y-6">
              <div>
                <h1
                  className="text-4xl font-bold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Your Library
                </h1>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Convert your books into interactive AI conversations. Listen,
                  learn, and discuss your favorite reads.
                </p>
              </div>

              <button
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition shadow-sm"
                style={{
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-primary)",
                }}
              >
                <Plus size={20} />
                Add new book
              </button>
            </div>

            {/* Center Section - Hero Illustration */}
            <div className="flex justify-center items-center">
              <Image
                src={heroIllustration}
                alt="Library illustration"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>

            {/* Right Section - Steps Card */}
            <div
              className="rounded-xl p-6 shadow-md space-y-5"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold"
                  style={{
                    backgroundColor: "var(--accent-light)",
                    color: "var(--color-brand)",
                  }}
                >
                  1
                </div>
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Upload PDF
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Add your book file
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold"
                  style={{
                    backgroundColor: "var(--accent-light)",
                    color: "var(--color-brand)",
                  }}
                >
                  2
                </div>
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    AI Processing
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    We analyze the content
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold"
                  style={{
                    backgroundColor: "var(--accent-light)",
                    color: "var(--color-brand)",
                  }}
                >
                  3
                </div>
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Voice Chat
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Discuss with AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="library-books-grid">
          {sampleBooks.map((book) => (
            <BookCard
              key={book._id}
              title={book.title}
              author={book.author}
              coverURL={book.coverURL}
              slug={book.slug}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
