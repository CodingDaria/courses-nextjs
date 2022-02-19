import { HTag, Button } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
      <HTag tag="h1">Body</HTag>
      <Button appearance="primary" className="test">Primary</Button>
      <Button appearance="ghost" arrow="down">Ghost</Button>
    </div>
  );
}
