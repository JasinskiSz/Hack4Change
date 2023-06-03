import Link from 'next/link';

const NavigationLink: React.FC = () => {
  return (
    <Link href="/map">
      <a>Przejdź do mapy</a>
    </Link>
  );
};

export default NavigationLink;
