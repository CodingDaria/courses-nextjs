import { HTag } from '../components';
import { withLayout } from '../layout';

export function Error500(): JSX.Element {
  return (
    <>
      <HTag tag="h1">Error 500</HTag>
    </>
  );
}

export default withLayout(Error500);
