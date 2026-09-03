
export default function OurStorySection({
  data,
}: any) {
  const imageRight = data.image_position !== "left";

  return (
    <section className="story-section">
      <div
        className={`story-container ${
          imageRight ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* Content */}
        <div className="story-content">
          {data.heading && (
            <h2 className="story-heading">
              {data.heading}
            </h2>
          )}

          {data.description && (
            <p className="story-description">
              {data.description}
            </p>
          )}
        </div>

        {/* Image */}
        {data.image && (
          <div className="story-image-wrapper">
            <img
              src={data.image}
              alt={data.heading || "Our Story"}
              className="story-image"
            />
          </div>
        )}
      </div>
    </section>
  );
}