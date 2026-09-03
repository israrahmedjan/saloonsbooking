

export default function WhyChooseUs({ data }: any) {
  return (
    <section className="why-choose-us container">
      <div className="why-choose-us__container">
        <div className="why-choose-us__header">
          <h2>{data.heading}</h2>
        </div>

        <div className="why-choose-us__grid">
          {data.items.map((item:any, index:any) => (
            <article
              key={index}
              className="why-choose-us__card"
            >
              <span className="why-choose-us__number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="why-choose-us__content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

