import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import PairIcon from '../components/PairIcon/PairIcon';

export default function HomePage() {
  return (
    <>
      <ColorSchemeToggle />
      <PairIcon base="./slp.png" quote="./busd.png" />
    </>
  );
}
