import React, { useEffect, useState } from "react";
import api from "./api";

function TestAPI() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/users")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h3>Data dari Backend:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default TestAPI;
