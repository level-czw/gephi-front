import { useSigma } from "react-sigma-v2";
import { FC, useEffect } from "react";
import { keyBy, omit } from "lodash";

import { Dataset, FiltersState } from "../types";

const GraphDataController: FC<{ dataset: Dataset; filters: FiltersState }> = ({ dataset, filters, children }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  /**
   * Feed graphology with the new dataset:
   */
  useEffect(() => {
      console.log(dataset)
    if (!graph || !dataset) return;

    // const clusters = keyBy(dataset.clusters, "key");
    // const tags = keyBy(dataset.tags, "key");

    dataset.nodes.forEach((node) =>
        graph.addNode(node.id, {
          ...node,
          color:node.color,
          size:node.size
        }),
    );
    console.log(dataset)
    dataset.edges.forEach((edge) => graph.addEdge(edge.source, edge.target, { size: 1,color:edge.color }));

    graph.forEachNode((node) =>
        graph.setNodeAttribute(
            node,
            "size",
            graph.getNodeAttribute(node,"size")
        ),
    );

    return () => graph.clear();
  }, [graph, dataset]);

  /**
   * Apply filters to graphology:
   */
  // useEffect(() => {
  //   const { clusters, tags } = filters;
  //   graph.forEachNode((node, { cluster, tag }) =>
  //       graph.setNodeAttribute(node, "hidden", !clusters[cluster] || !tags[tag]),
  //   );
  // }, [graph, filters]);

  return <>{children}</>;
};

export default GraphDataController;