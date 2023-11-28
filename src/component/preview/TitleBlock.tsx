import { useAppSelector } from "../../hook/storeHook";
import Block from "../common/Block";

const TitleBlock = () => {
  const { title, content } = useAppSelector((store) => store.docs);

  return (
    <Block className="flex flex-col w-full gap-2 p-6" isTitleBlock>
      <span className="text-3xl">{title}</span>
      <div>
        {content.split("\n").map((line) => (
          <>
            <span>{line}</span>
            <br />
          </>
        ))}
      </div>
    </Block>
  );
};

export default TitleBlock;
