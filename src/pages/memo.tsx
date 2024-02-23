import { useEffect, useState } from "react";
import styles from "@/styles/Memo.module.css";
import axios from "axios";

interface Memo {
  title: string;
  content: string;
}

export default function Memo() {
  const [memoTitleInput, setMemoTitleInput] = useState<string>("");
  const [memoContentInput, setMemoContentInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [memoList, setMemoList] = useState<Memo[]>([]);

  useEffect(() => {
    getMemoList();
  }, []);

  const getMemoList = () => {
    setLoading(true);
    axios
      .get("/api/memo")
      .then((response) => {
        console.log(response);
        setMemoList(response.data);
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
        <h1>아무렇게나 메모앱</h1>
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

        <button
          disabled={loading}
          className={styles.inputs}
          onClick={onMemoAdd}
        >
          저장
        </button>
        <div>
          입력한 제목: {memoTitleInput}
          <br />
          입력한 내용: {memoContentInput}
        </div>
        <hr />
        {loading && <div>로딩중...</div>}
        {memoList.map((memo: Memo, index) => {
          return (
            <div key={index} className={styles.box}>
              <h3>{memo.title}</h3>
              <p>{memo.content}</p>
            </div>
          );
        })}
      </main>
    </>
  );
}
