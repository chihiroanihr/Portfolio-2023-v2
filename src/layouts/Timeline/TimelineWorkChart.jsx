import React, { useMemo } from "react";
import clsx from "clsx";
import {
  Block,
  Content,
  Heading,
  Line,
  Marker,
  Title,
  Subtitle,
  ToolTagsList,
  Description,
} from "./components";
import { workTimelineListData } from "@data";

const TimelineWorkChart = ({ className }) => {
  console.log(
    "[Render] [src] @layouts/Timeline/TimelineWorkChart.jsx ----- Memoized"
  );

  // ************************* JSX ************************* //
  const memoizedWorkTimelineListItems = useMemo(() => {
    return workTimelineListData.map((item, index) => (
      <Block id="block" key={item.id} index={index}>
        {/* Marker */}
        <Marker id="marker" offsetHeight="sm:mt-[16px] mt-[10px]" />

        {/* Content */}
        <Content id="content">
          {/* Title */}
          <Title
            id="title"
            index={index}
            title={item.title}
            logo={item.logo}
            whiteSpace="whitespace-pre"
          />

          {/* Position Date / Location */}
          <Subtitle
            id="subtitle"
            index={index}
            date={item.date}
            location={item.location}
          />

          {/* Position Description */}
          <Description id="description" index={index} item={item.description} />

          {/* Tools Used */}
          {item.tools && item.tools.length > 0 && (
            <ToolTagsList id="tools" item={item.tools} index={index} />
          )}
        </Content>
      </Block>
    ));
  }, [workTimelineListData]);

  return (
    <div
      id="work-timeline"
      className={clsx(
        className,
        // padding layout
        "page-layout",
        "xxxl:px-[300px] xxl:px-[15%] xl:px-[10%] px-[30px]"
      )}
    >
      {/* Work Timeline */}
      <Heading id="heading" value="Work Experience" />
      {/* Line */}
      <Line id="line" className="md:my-[30px] my-[20px]">
        {memoizedWorkTimelineListItems}
      </Line>
    </div>
  );
};

export default React.memo(TimelineWorkChart);
