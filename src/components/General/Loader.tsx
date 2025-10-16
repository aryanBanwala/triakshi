import React from "react";
import "./Loader.css";

type LoaderProps = {
  title?: string;
  subtitle?: string;
  tagline?: string;
};

const Loader: React.FC<LoaderProps> = ({
  title = "Triakshi Gems",
  subtitle = "Jai Maa Baglamukhi",
  tagline = "20+ Years of Experience",
}) => {
  return (
    <div className="tg-loader-page">
      <div className="loader-container">
        <div className="glow-background" />

        {/* Sparkles */}
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />
        <div className="sparkle" />

        {/* Rotating Gem */}
        <div className="symbol-container">
          <div className="shine-overlay">
            <div className="shine-ray" />
            <div className="shine-ray" />
            <div className="shine-ray" />
            <div className="shine-ray" />
            <div className="shine-ray" />
            <div className="shine-ray" />
          </div>

          <div className="rotating-symbol">
            <div className="gem">
              <div className="gem-table" />
              <div className="gem-crown" />
              <div className="gem-facet-left" />
              <div className="gem-facet-right" />
              <div className="gem-girdle" />
              <div className="gem-sparkle" />
              <div className="gem-pavilion" />
              <div className="gem-culet" />
            </div>
          </div>
        </div>

        {/* Animated Text with Stroke */}
        <div className="text-container">
          {/* Main Title */}
          <svg className="svg-main" viewBox="0 0 500 100">
            <text
              className="text-stroke"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {title}
            </text>
            <text
              className="text-fill"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {title}
            </text>
          </svg>

          {/* Subtitle */}
          <svg className="svg-subtitle" viewBox="0 0 500 60">
            <text
              className="text-stroke-small"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {subtitle}
            </text>
            <text
              className="text-fill-small"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {subtitle}
            </text>
          </svg>

          {/* Tagline */}
          <svg className="svg-tagline" viewBox="0 0 500 40">
            <text
              className="text-stroke-tiny"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {tagline}
            </text>
            <text
              className="text-fill-tiny"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {tagline}
            </text>
          </svg>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
