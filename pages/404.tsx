import { HTag } from '../components';
import { withLayout } from '../layout';

export function Error404(): JSX.Element {
  return (
    <>
      <HTag tag="h1">Error 404</HTag>
    </>
  );
}

export default withLayout(Error404);
