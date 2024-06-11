import { Fragment } from 'react';
import { Block } from '@google-form-clone/shared-ui';
import { useRedux } from '@google-form-clone/hooks';
import { store } from '../../store/store';

const TitleBlock = () => {
  const { useSelector } = useRedux<typeof store>();
  const { title, content } = useSelector((store) => store.docs);

  return (
    <Block className="flex flex-col w-full gap-2 p-6" isTitleBlock>
      <span className="text-3xl">{title}</span>
      <div>
        {content.split('\n').map((line) => (
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
