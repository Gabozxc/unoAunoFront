import Link from 'next/link'


type TravelerLinkDetailsProps = {
  nombre: string;
  id: string
};

const TravelerLinkDetails: React.FC<TravelerLinkDetailsProps> = ({ nombre, id }) => {
  return (
    <Link
    href={`/traveler/${id}`}
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          {nombre}
        </span>
      </h2>
    </Link>
  );
};

export default TravelerLinkDetails;
