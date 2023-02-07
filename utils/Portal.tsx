import { useState, useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

export type PortalId = "file-dnd" | "modal" | "dialog";
export const portalIdList = ["file-dnd", "modal", "dialog"] as const;

export type PortalProps = {
  rootId?: PortalId;
  children: ReactNode;
};

const Portal = ({ rootId = "modal", children }: PortalProps) => {
  const ref: any = useRef(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    ref.current = document.getElementById(rootId);
    setMounted(true);
  }, [rootId]);

  return mounted ? createPortal(children, ref.current) : null;
};

export default Portal;
