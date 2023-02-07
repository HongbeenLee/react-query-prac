import type { NextPage } from "next";
import useModals from "../utils/modal/useModals";
import { TestModal } from "../components/TestModal";

const Toast: NextPage = () => {
  const { openModal: onRed, closeModal: offRed } = useModals(
    "test",
    <TestModal />
  );
  const { openModal: onYellow, closeModal: offYellow } = useModals(
    "test2",
    <TestModal color="yellow" />
  );

  return (
    <div>
      <button
        onClick={() => {
          onRed();
          onYellow();
        }}>
        RED/YELLOW 모달 열기
      </button>
      <button onClick={offRed}>RED 모달 닫기</button>
      <button onClick={offYellow}>YELLOW 모달 닫기</button>
    </div>
  );
};

export default Toast;
