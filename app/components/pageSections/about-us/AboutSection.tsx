
type Props = {
  data: any;
};

export default function AboutSection({ data }: Props) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-2">

          {/* Content */}
<h1>About section content</h1>
{JSON.stringify(data,null,2)}
        </div>
      </div>
    </section>
  );
}

