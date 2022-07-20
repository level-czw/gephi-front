export interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
}


// export interface NodeData {
//   label: string;
//   x: number;
//   y: number;
//   id: number;
//   color: string;
//   size: number;
// }



export interface Cluster {
  key: string;
  color: string;
  clusterLabel: string;
}

export interface Tag {
  key: string;
  image: string;
}

export interface Dataset {
  nodes: NodeData[];
  edges: edge[];
}

export interface edge{
  source:string;
  target:string;
  color:string;
}

export interface FiltersState {
  clusters: Record<string, boolean>;
  tags: Record<string, boolean>;
}
