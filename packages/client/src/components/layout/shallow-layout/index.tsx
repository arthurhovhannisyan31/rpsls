import type { FC, ReactNode } from "react";

export interface ShallowLayoutProps {
  children: ReactNode;
}

export const ShallowLayout: FC<ShallowLayoutProps> = ({ children }) => {
  return(
      <div className={"shallow-layout"}>
        {children}
      </div>
  );
};

ShallowLayout.displayName = "index";
