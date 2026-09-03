type PropsType = {
  data: any
};

export default function HeroSection({ data }: PropsType) {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-content">
          {data.subheading && (
            <p className="hero-subheading">
              {data.subheading}
            </p>
          )}

          {data.heading && (
            <h1 className="hero-heading">
              {data.heading}
            </h1>
          )}

          {data.description && (
            <p className="hero-description">
              {data.description}
            </p>
          )}

          {data.button_text && data.button_url && (
            <a
              href={data.button_url}
              className="hero-button"
            >
              {data.button_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}