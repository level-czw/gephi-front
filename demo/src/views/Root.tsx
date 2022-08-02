import React, { FC, useEffect, useState } from "react";
import { SigmaContainer, ZoomControl, FullScreenControl } from "react-sigma-v2";
import { omit, mapValues, keyBy, constant } from "lodash";

import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";

import GraphSettingsController from "./GraphSettingsController";
import GraphEventsController from "./GraphEventsController";
import GraphDataController from "./GraphDataController";
import DescriptionPanel from "./DescriptionPanel";
import { Dataset, FiltersState } from "../types";
import ClustersPanel from "./ClustersPanel";
import SearchField from "./SearchField";
import drawLabel from "../canvas-utils";
import GraphTitle from "./GraphTitle";
import TagsPanel from "./TagsPanel";

import "react-sigma-v2/lib/react-sigma-v2.css";
import { GrClose } from "react-icons/gr";
import { BiRadioCircleMarked, BiBookContent } from "react-icons/bi";
import { BsArrowsFullscreen, BsFullscreenExit, BsZoomIn, BsZoomOut } from "react-icons/bs";

import axios from 'axios'

// @ts-ignore
import NODELIST from "./data";
import "../styles.css";


import { Button, Input ,Select} from "antd";

const nodelist: JSX.Element[]=[]
const { Option } = Select;


const Root: FC = () => {
  const [showContents, setShowContents] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [filtersState, setFiltersState] = useState<FiltersState>({
    clusters: {},
    tags: {},
  });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const aurl="http://localhost:8080/b6f428401bd5ca859f75f9c75b1f8178.json"
  // Load data on mount:
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/dataset.json`)
      .then((res) => res.json())
      .then((dataset: Dataset) => {
        setDataset(dataset);
        // setFiltersState({
        //   clusters: mapValues(keyBy(dataset.clusters, "key"), constant(true)),
        //   tags: mapValues(keyBy(dataset.tags, "key"), constant(true)),
        // });
        requestAnimationFrame(() => setDataReady(true));
      });
  }, []);

    const url="http://localhost:8080/"

    let test=document.getElementById("panel")
    if(test!=null) {
        let button=document.getElementById("submit")
        // @ts-ignore
        button.onclick=function () {
            // @ts-ignore
            const name=document.getElementById("name").value
            // @ts-ignore
            const file1=document.getElementById("file1").files[0]
            // @ts-ignore
            const file2=document.getElementById("file2").files[0];

            let formData=new FormData();
            formData.append("graphName",name);formData.append("nodeFile",file1);formData.append("edgeFile",file2)
            axios.post(url+"upload",formData)
        .then(response=>{
                console.log(response);
            })
        }
    }



    if(nodelist.length==0){
        for (let i = 0; i < NODELIST.length; i++) {
            // @ts-ignore
            nodelist.push(<Option key={NODELIST[i]}>{NODELIST[i]}</Option>);
        }
    }

    let list: any[] | undefined=[]


    function test1(value: any) {
        list=value
    }

    function f1() {
        // @ts-ignore
        const name=document.getElementById("graphName").value
        let formData=new FormData();
        console.log(name)
        console.log(list)
        formData.append("graphName",name); // @ts-ignore
        formData.append("nodeNameList",list)
        console.log(formData)
        axios.post(url+"filter",formData)
            .then(response=>{
                console.log(response);
            })
    }


  if (!dataset) return null;

    return (
    <div id="app-root" className={showContents ? "show-contents" : ""}>
      <SigmaContainer
        graphOptions={{ type: "directed" }}
        initialSettings={{
          nodeProgramClasses: { image: getNodeProgramImage() },
          labelRenderer: drawLabel,
          defaultNodeType: "image",
          defaultEdgeType: "arrow",
          labelDensity: 0.07,
          labelGridCellSize: 60,
          labelRenderedSizeThreshold: 15,
          labelFont: "Lato, sans-serif",
          zIndex: true,
        }}
        className="react-sigma"
      >

        <GraphSettingsController hoveredNode={hoveredNode} />
        <GraphEventsController setHoveredNode={setHoveredNode} />
        <GraphDataController dataset={dataset} filters={filtersState} />


          <div id="panel">

              <div>
                  <Input id={"name"} style={{width: 200}}/> <br/>
                  <input type={"file"} id={"file1"}/>
                  <input type={"file"} id={"file2"}/>
                  <Button id={"submit"}>提交</Button>
              </div>

              <div>
                  <Select mode={"multiple"} style={{width: 200,}} id={"nodeNameList"} onChange={test1}>{nodelist}</Select>
                  <Input id={"graphName"} style={{width: 200}}/>
                  <Button onClick={f1}>点我</Button>
              </div>


          </div>


      </SigmaContainer>
    </div>


  );
};

export default Root;
