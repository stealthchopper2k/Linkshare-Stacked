import React from "react";
import RabbitTree from "../../components/tree/RabbitTree";
import { treeMock } from "../../api/mock";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: Props) => {
  // const response = await fetch(`http://localhost:3000/api/rabbittree/${id}`);
  // const node_array = await response.json();

  return (
    <div className="bg-slate-900">
      <div
        className="flex justify-center items-center ml-auto border-l-4 border-indigo-500"
        style={{ width: "70vw", height: "100vh" }}
      >
        <RabbitTree
          node_array={treeMock.node_array}
          type={treeMock.type}
          initialEdges={treeMock.initialEdges}
        />
      </div>
    </div>
  );
};

export default Page;
