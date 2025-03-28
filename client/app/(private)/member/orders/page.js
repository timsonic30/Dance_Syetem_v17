"use client";
import { useState, useEffect } from "react";
import Paid from "./paid";
import PendingPayment from "./pendingPayment";
import ShoppingCart from "./shoppingCart";

export default function Orders() {
  const [data, setData] = useState(null); // 主數據
  const [isLoading, setIsLoading] = useState(true); // 加載狀態
  const [error, setError] = useState(null); // 錯誤狀態

  const getData = async () => {
    const token = localStorage.getItem("token");
    const userId = "67d7cff0159b3e97b515661f"; // 假設的用戶 ID，稍後改為動態取得
    try {
      setIsLoading(true);
      setError(null);

      // const [userTransactionRes, classDataRes] = await Promise.all([
      //   fetch(`http://localhost:3030/danceclass/transaction/${userId}`).then(
      //     (res) => res.json()
      //   ),
      //   fetch(`http://localhost:3030/danceclass`).then((res) => res.json()),
      // ]);

      // 並行請求數據;
      const [userTransactionRes, classDataRes] = await Promise.all([
        fetch(`http://localhost:3030/danceclass/transaction/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
        fetch(`http://localhost:3030/danceclass`).then((res) => res.json()),
      ]);

      // 提取必要數據
      const userTransactionList = userTransactionRes.userTransactions;
      const classDataList = classDataRes.classData;

      // 整合數據
      const dataList = userTransactionList
        .map((item) => {
          const matchedClass = classDataList.find(
            (classItem) => classItem._id === item.detail
          );
          if (matchedClass) {
            return {
              ...item,
              classData: matchedClass,
            };
          }
          return null; // 如果無匹配，返回 null
        })
        .filter((item) => item !== null); // 過濾掉無效項目

      setData(dataList);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("無法加載數據，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []); // 空依賴陣列，僅在組件初次渲染時執行

  // 如果加載中，顯示 Loading 畫面
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-500">數據加載中...</p>
      </div>
    );
  }

  // 如果發生錯誤，顯示錯誤信息
  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-4/5 mb-4 mt-16 shadow-lg rounded-lg">
        <ShoppingCart data={data} />
      </div>

      <div className="w-4/5 mt-4 mb-4 shadow-lg rounded-lg">
        <PendingPayment data={data} />
      </div>

      <div className="w-4/5 mt-4 shadow-lg rounded-lg">
        <Paid data={data} />
      </div>
    </div>
  );
}
