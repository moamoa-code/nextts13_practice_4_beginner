import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import Button from "@/components/atom/Button";

export default function Home() {
  const [array1, setArray1] = useState(["a", "b", "c", "d"]);
  const [array2, setArray2] = useState(["e", "f", "g", "h"]);

  const onTest = () => {
    const newArray = [...array1];
    newArray.unshift("메롱");
    setArray1(newArray);
  };

  return (
    <>
      <main>
        {array1.map((value, index) => (
          <p key={index}>{value}</p>
        ))}
        <hr />
        {array2.map((value, index) => (
          <p key={index}>{value}</p>
        ))}
        <br />
        <Button onClick={onTest}>테스트</Button>
      </main>
    </>
  );
}
