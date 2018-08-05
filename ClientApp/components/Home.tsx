import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Translate from './Translate';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>

            <h1>
                <Translate phraseId="greeting" options={{ addMissingTranslation: true }} propsData={{ name: 'Eric' }}>
                    Hi, planet!
                </Translate >
            </h1>

            <p>
                <Translate phraseId="welcome.intro" />
            </p>

            <p>
                <Translate phraseId="helpGetStarted" options={{ renderInnerHtml: true }} />
            </p>

            <p>
                <Translate phraseId="missing" options={{ renderInnerHtml: true }} />
            </p>

            <Translate phraseId="welcome.buildList" options={{ renderInnerHtml: true }} />

            {/* {[
                "Some text.",
                <h2 key="heading-1">A heading</h2>,
                "More text.",
                <h2 key="heading-2">Another heading</h2>,
                "Even more text."
            ]} */}
        </div>;
    }
}
