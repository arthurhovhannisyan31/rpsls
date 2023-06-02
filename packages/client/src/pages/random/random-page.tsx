import { ShallowLayout } from "src/components/layout/shallow-layout";

import type { ReactElement } from "react";

export interface RandomPageProps {
  some?: boolean;
}

export const RandomPage: NextPageWithLayout<RandomPageProps> = () => {
  return(
      <div>
        hello
      </div>
  );
};

RandomPage.displayName = "RandomPage";

RandomPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShallowLayout>
      {page}
    </ShallowLayout>
  );
};

export default RandomPage;
