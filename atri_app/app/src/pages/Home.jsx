import { useLayoutEffect, useEffect } from "react";
import useStore, { updateStoreStateFromController } from "../hooks/useStore";
import useIoStore from "../hooks/useIoStore";
import { useNavigate, useLocation } from "react-router-dom";
import { subscribeInternalNavigation } from "../utils/navigate";
import {fetchPageProps} from "../utils/fetchPageProps"
import { Div } from "@atrilabs/react-component-manifests/src/manifests/Div/Div.tsx";
import { Flex } from "@atrilabs/react-component-manifests/src/manifests/Flex/Flex.tsx";
import { TextBox } from "@atrilabs/react-component-manifests/src/manifests/TextBox/TextBox.tsx";
import { DataTable } from "@atrilabs/react-component-manifests/src/manifests/Table/Table.tsx";
import { LineChart } from "@atrilabs/react-component-manifests/src/manifests/charts/LineChart/LineChart.tsx";
import { Button } from "@atrilabs/react-component-manifests/src/manifests/Button/Button.tsx";
import { Dropdown } from "@atrilabs/react-component-manifests/src/manifests/Dropdown/Dropdown.tsx";
import { useDiv1Cb, useFlex1Cb, useFlex2Cb, useFlex3Cb, useTextBox2Cb, useTable1Cb, useLineChart1Cb, useButton1Cb, useTextBox1Cb, useDropdown1Cb } from "../page-cbs/Home";
import "../page-css/Home.css"

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = subscribeInternalNavigation((url) => {
      navigate(url);
    });
    return unsub;
  }, [navigate]);

  const location = useLocation();
  useLayoutEffect(()=>{
    fetchPageProps(location.pathname, location.search).then((res)=>{
      updateStoreStateFromController(res.pageName, res.pageState)
    })
  }, [location])

  const Div1Props = useStore((state)=>state["Home"]["Div1"]);
const Div1IoProps = useIoStore((state)=>state["Home"]["Div1"]);
const Div1Cb = useDiv1Cb()
const Flex1Props = useStore((state)=>state["Home"]["Flex1"]);
const Flex1IoProps = useIoStore((state)=>state["Home"]["Flex1"]);
const Flex1Cb = useFlex1Cb()
const Flex2Props = useStore((state)=>state["Home"]["Flex2"]);
const Flex2IoProps = useIoStore((state)=>state["Home"]["Flex2"]);
const Flex2Cb = useFlex2Cb()
const Flex3Props = useStore((state)=>state["Home"]["Flex3"]);
const Flex3IoProps = useIoStore((state)=>state["Home"]["Flex3"]);
const Flex3Cb = useFlex3Cb()
const TextBox2Props = useStore((state)=>state["Home"]["TextBox2"]);
const TextBox2IoProps = useIoStore((state)=>state["Home"]["TextBox2"]);
const TextBox2Cb = useTextBox2Cb()
const Table1Props = useStore((state)=>state["Home"]["Table1"]);
const Table1IoProps = useIoStore((state)=>state["Home"]["Table1"]);
const Table1Cb = useTable1Cb()
const LineChart1Props = useStore((state)=>state["Home"]["LineChart1"]);
const LineChart1IoProps = useIoStore((state)=>state["Home"]["LineChart1"]);
const LineChart1Cb = useLineChart1Cb()
const Button1Props = useStore((state)=>state["Home"]["Button1"]);
const Button1IoProps = useIoStore((state)=>state["Home"]["Button1"]);
const Button1Cb = useButton1Cb()
const TextBox1Props = useStore((state)=>state["Home"]["TextBox1"]);
const TextBox1IoProps = useIoStore((state)=>state["Home"]["TextBox1"]);
const TextBox1Cb = useTextBox1Cb()
const Dropdown1Props = useStore((state)=>state["Home"]["Dropdown1"]);
const Dropdown1IoProps = useIoStore((state)=>state["Home"]["Dropdown1"]);
const Dropdown1Cb = useDropdown1Cb()

  return (<>
  <Div className="p-Home Div1" {...Div1Props} {...Div1Cb} {...Div1IoProps}>
<TextBox className="p-Home TextBox2" {...TextBox2Props} {...TextBox2Cb} {...TextBox2IoProps}/>
<Flex className="p-Home Flex1" {...Flex1Props} {...Flex1Cb} {...Flex1IoProps}>
<DataTable className="p-Home Table1" {...Table1Props} {...Table1Cb} {...Table1IoProps}/>
<LineChart className="p-Home LineChart1" {...LineChart1Props} {...LineChart1Cb} {...LineChart1IoProps}/>
</Flex>
</Div>
<Flex className="p-Home Flex2" {...Flex2Props} {...Flex2Cb} {...Flex2IoProps}>
<TextBox className="p-Home TextBox1" {...TextBox1Props} {...TextBox1Cb} {...TextBox1IoProps}/>
<Button className="p-Home Button1" {...Button1Props} {...Button1Cb} {...Button1IoProps}/>
<Flex className="p-Home Flex3" {...Flex3Props} {...Flex3Cb} {...Flex3IoProps}>
<Dropdown className="p-Home Dropdown1" {...Dropdown1Props} {...Dropdown1Cb} {...Dropdown1IoProps}/>
</Flex>
</Flex>
  </>);
}
