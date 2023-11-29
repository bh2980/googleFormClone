import { Fragment } from "react";
import { useAppSelector } from "../../hook/useRedux";
import Block from "../common/Block";

const TitleBlock = () => {
  const { title, content } = useAppSelector((store) => store.docs);

  return (
    <Block className="flex flex-col w-full gap-2 p-6" isTitleBlock>
      <span className="text-3xl">{title}</span>
      <div>
        {content.split("\n").map((line) => (
          <Fragment key={line}>
            <span>{line}</span>
            <br />
          </Fragment>
        ))}
      </div>
    </Block>
  );
};

export default TitleBlock;
