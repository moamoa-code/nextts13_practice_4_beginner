import { MemoType } from "@/interface/memo";
import styled from "styled-components";

interface MemoCardProps {
  memoData: MemoType;
  key: number | string;
  onUpdateMode: Function;
  onDeleteMemo: Function;
}

export default function MemoCard({
  memoData,
  onUpdateMode,
  onDeleteMemo,
}: MemoCardProps) {
  return (
    <MemoCardLayout>
      <div className="memoContainer">
        <h3>{memoData?.title}</h3>
        <p>{memoData?.content}</p>
        <button onClick={onUpdateMode(memoData)}>수정</button>
        <br />
        <button onClick={onDeleteMemo(memoData?.id)}>삭제</button>
      </div>
    </MemoCardLayout>
  );
}

const MemoCardLayout = styled.article`
  .memoContainer {
    border-radius: 5px;
    padding: 20px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
  }
`;
