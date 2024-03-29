import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { use, useCallback, useEffect, useMemo, useState } from "react";

export default function Image() {
  const router = useRouter();
  const [imgList, setImgList] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    axios.get("/api/img-list").then((res) => {
      console.log(res);
      setImgList(res.data);
    });
  }, []);

  useEffect(() => {
    console.log("카운터가 변경되었습니다.", counter);
  }, [counter]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>카운터</h1>
        <p>{counter}</p>
        <button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          카운터
        </button>
        <button
          onClick={() => {
            console.log("라우터 보기", router);
          }}
        >
          라우터 보기
        </button>
        <button
          onClick={() => {
            router.push(`/img?counter=${counter}`);
          }}
        >
          counter로 이동
        </button>
        <h1>이미지 리스트</h1>

        {imgList.map((img, index) => (
          <img
            key={index}
            src={`/imgs/${img}`}
            alt="이미지"
            style={{ width: "100px", height: "100px" }}
          />
        ))}
      </main>
    </>
  );
}
