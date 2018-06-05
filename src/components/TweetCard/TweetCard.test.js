import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';

import TweetCard from './TweetCard';
import data from './bnk48.json';

configure({ adapter: new Adapter() });

describe('<TweetCard />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('renders a tweet without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TweetCard tweet={data.statuses[0]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders tweet with emojis and hashtags correctly', () => {
    const wrapper = shallow(<TweetCard tweet={data.statuses[0]} />);
    const text = '[IG Story] ความสดใสตอนตี 4 😳\n\n#BNK48 #CherprangBNK48 #MusicBNK48';
    const entities = {
      hashtags: [
        {
          text: 'BNK48',
          indices: [30, 36],
        },
        {
          text: 'CherprangBNK48',
          indices: [37, 52],
        },
        {
          text: 'MusicBNK48',
          indices: [53, 64],
        },
      ],
    };

    const parts = wrapper
      .dive()
      .instance()
      .formatText(text, entities);

    const elements = [1, 3, 5].map(i => shallow(parts[i]));
    const hashtags = entities.hashtags.map(h => '#' + h.text);

    expect(parts.length).toEqual(6);
    expect(parts[0]).toEqual('[IG Story] ความสดใสตอนตี 4 😳\n\n');
    elements.forEach((e, i) => {
      expect(e.render().text()).toEqual(hashtags[i]);
    });
  });
});
