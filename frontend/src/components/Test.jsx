// import React, { useEffect, useState } from "react";
// import { Input } from "antd";
// import { SearchOutlined } from "@ant-design/icons";

// const Test = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     if (cryptosList) {
//       const filteredData = cryptosList.filter(
//         (coin) =>
//           coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setCryptos(filteredData);
//     }
//   }, [, searchTerm]);
//   return (
//     <div>
//       {" "}
//       <Input
//         addonAfter={<SearchOutlined />}
//         placeholder="Search Cryptocurrency"
//         onChange={(e) => setSearchTerm(e.target.value)}
//         allowClear
//       />
//     </div>
//   );
// };

// export default Test;
