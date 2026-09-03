
export default function ReadyAppointment({
  data,
}: any) {
  return (
    <section className="ready-appointment container">
      <div className="ready-appointment__container">

        <div className="ready-appointment__content">
          <h2>{data.heading}</h2>

          <p>{data.description}</p>

          <a
            href={data.button_url}
            className="ready-appointment__button"
          >
            {data.button_text}
          </a>
        </div>

      </div>
    </section>
  );
}
