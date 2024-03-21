import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Memo.module.css";
import axios from "axios";
import { MemoType } from "@/interface/memo";
import MemoCard from "@/components/MemoCard";

export default function Memo() {
  const [memoTitleInput, setMemoTitleInput] = useState<string>("");
  const [memoContentInput, setMemoContentInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [memoList, setMemoList] = useState<MemoType[]>([]);
  const [updateTargetId, setUpdateTargetId] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);

  // useEffect(() => {
  //   window.addEventListener("scroll", getScroll);
  //   return () => {
  //     window.removeEventListener("scroll", getScroll);
  //   };
  // }, [pageNum]);

  useEffect(() => {
    getMemoList(pageNum);
  }, [pageNum]);

  // const pagePlus = useCallback(() => {
  //   const newPageNum = pageNum + 1;
  //   console.log("end", newPageNum);
  //   setPageNum(newPageNum);
  // }, [pageNum]);

  // const getScroll = () => {
  //   let scrollHeight = document.documentElement.scrollHeight;
  //   let scrollTop = document.documentElement.scrollTop;
  //   let clientHeight = document.documentElement.clientHeight;

  //   if (scrollTop + clientHeight + 200 >= scrollHeight) {
  //     console.log("스크롤끝", scrollHeight);
  //     pagePlus();
  //   }
  // };

  const onUpdateMode = (memo: MemoType) => () => {
    setUpdateTargetId(memo.id);
    setMemoTitleInput(memo.title);
    setMemoContentInput(memo.content);
  };

  const onUpdateMemo = (id: string) => () => {
    setLoading(true);
    axios
      .patch(`/api/memo`, {
        id: id,
        title: memoTitleInput,
        content: memoContentInput,
      })
      .then((response) => {
        console.log(response);
        alert("메모를 수정했습니다.");
        getMemoList();
      })
      .catch((error) => {
        console.error(error);
        alert("에러가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDeleteMemo = (id: string) => () => {
    setLoading(true);
    axios
      .delete(`/api/memo/${id}`)
      .then((response) => {
        console.log(response);
        alert("메모를 삭제했습니다.");
        getMemoList();
      })
      .catch((error) => {
        console.error(error);
        alert("에러가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getMemoList = (page?: number) => {
    setLoading(true);
    axios
      .get(`/api/memo?page=${page ?? 1}`)
      .then((response) => {
        console.log("memoList", memoList);
        const newData = response.data;
        // const oldData = JSON.parse(JSON.stringify(memoList));
        const resultData = [...newData];
        // console.log("page", page);
        // console.log("new, old", newData, oldData);
        // console.log("resultData", resultData);
        setMemoList(resultData);
      })
      .catch((error) => {
        console.error(error);
        alert("에러가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onMemoAdd = () => {
    // 유효성 검사
    if (memoTitleInput.length === 0 || memoContentInput.length === 0) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    setLoading(true);
    axios
      .post("/api/memo", {
        title: memoTitleInput,
        content: memoContentInput,
      })
      .then((response) => {
        console.log(response);
        // CSR 기법 -> API 호출 횟수를 줄여서 서버 부하를 줄이기 위함
        // 하지만 이 방법은 최신 데이터를 가져오지 못한다.
        // setMemoList([
        //   ...memoList,
        //   {
        //     title: memoTitleInput,
        //     content: memoContentInput,
        //   },
        // ]);

        // API에서 최신 데이터를 가져온다.
        getMemoList();

        alert("저장되었습니다.");
      })
      .catch((error) => {
        console.error(error);
        alert("에러가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <main>
        <h1>아무렇게나 메모앱 {memoList?.length}</h1>
        <div>{JSON.stringify(memoList)}</div>
        <div className={styles.box}>
          <form>
            <input
              disabled={loading}
              placeholder="제목"
              className={styles.inputs}
              value={memoTitleInput}
              onChange={(e) => {
                setMemoTitleInput(e.target.value);
              }}
            />
            <textarea
              disabled={loading}
              placeholder="내용"
              className={styles.inputs}
              value={memoContentInput}
              onChange={(e) => setMemoContentInput(e.target.value)}
            />
          </form>
        </div>

        {updateTargetId.length > 0 ? (
          <>
            <button
              disabled={loading}
              className={styles.inputs}
              onClick={onUpdateMemo(updateTargetId)}
            >
              수정
            </button>{" "}
            <br />
            <button
              disabled={loading}
              className={styles.inputs}
              onClick={() => {
                setUpdateTargetId("");
              }}
            >
              취소
            </button>
          </>
        ) : (
          <button
            disabled={loading}
            className={styles.inputs}
            onClick={onMemoAdd}
          >
            저장
          </button>
        )}

        <div>
          입력한 제목: {memoTitleInput}
          <br />
          입력한 내용: {memoContentInput}
        </div>
        <hr />
        {loading && <div>로딩중...</div>}
        {memoList &&
          memoList?.map((memo: MemoType, index) => {
            return (
              // <div key={index} className={styles.box}>
              //   <h3>{memo.title}</h3>
              //   <p>{memo.content}</p>
              //   <button onClick={onUpdateMode(memo)}>수정</button>
              //   <br />
              //   <button onClick={onDeleteMemo(memo.id)}>삭제</button>
              // </div>
              <MemoCard
                memoData={memo}
                key={index}
                onUpdateMode={onUpdateMode}
                onDeleteMemo={onDeleteMemo}
              />
            );
          })}
      </main>
    </>
  );
}

// 원시형 number, string , 참조형 object, array, function
